import { unstable_getServerSession } from "next-auth/next";
import { GetServerSideProps } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import { trpc } from "@/trpc/hook";
import ArticleCard from "@/components/ArticleCard/ArticleCard";
import {
  Group,
  Text,
  SimpleGrid,
  Button,
  Box,
  createStyles,
  Stack,
  MediaQuery,
  Skeleton,
  TextInput,
  Loader,
  Center,
} from "@mantine/core";
import ArticleModal from "@/components/Modals/ArticleModal/ArticleModal";
import { useDisclosure } from "@mantine/hooks";
import showNotification from "src/utils/showNotification";
import dynamic from "next/dynamic";
import { useState, useCallback } from "react";
import AotD from "@/components/ArticleCard/ArticleOfTheDay";

const AdminOptions = dynamic(
  () => import("@/components/ArticleCard/AdminOptions"),
  { ssr: false }
);

function throttle<F extends (...args: any[]) => any>(func: F, wait: number): F {
  let timeout: number | undefined;

  return function (this: any, ...args: any[]) {
    const context = this;

    clearTimeout(timeout);
    // @ts-ignore
    timeout = setTimeout(() => func.apply(context, args), wait);
  } as any as F;
}

const useStyles = createStyles((t) => ({
  wrapper: { position: "relative" },
}));

export default function admin() {
  const [articleModalIsOpened, articleModalHandlers] = useDisclosure(false);
  const [selectedArticle, setSelectedArticle] = useState(-1);

  const { classes } = useStyles();

  const trpcContext = trpc.useContext();

  const articlesQuery = trpc.article.getMyArticles.useQuery(
    {},
    { trpc: { ssr: false } }
  );

  const publishMutation = trpc.article.pusblish.useMutation({
    onMutate({ id }) {
      setSelectedArticle(id);
    },
    onSuccess(_, { isPublished }) {
      showNotification({
        title: `Article was ${
          isPublished ? "published" : "unpublished"
        } successfully!`,
      });
      trpcContext.article.invalidate();
    },
    onError(_, { id, isPublished }) {
      showNotification({
        title: `There was a problem ${
          isPublished ? "publishing" : "unpublishing"
        } an article`,
        message: `Article id: ${id}`,
        isError: true,
      });
    },
  });

  //feature logic
  const featureQuery = trpc.article.getFeatured.useQuery(undefined, {
    trpc: { ssr: false },
  });

  const featureMutation = trpc.article.setFeatured.useMutation({
    onMutate({ id }) {
      setSelectedArticle(id);
    },
    onSuccess() {
      showNotification({
        title: `Article was featured successfully!`,
      });
      trpcContext.article.invalidate();
    },
    onError(_, { id }) {
      showNotification({
        title: `There was a problem featured an article`,
        message: `Article id: ${id}`,
        isError: true,
      });
    },
  });

  const deleteMutation = trpc.article.del.useMutation({
    onMutate({ id }) {
      setSelectedArticle(id);
    },
    onSuccess() {
      showNotification({
        title: `Article was deleted successfully!`,
      });
      trpcContext.article.invalidate();
    },
    onError() {
      showNotification({
        title: `There was a problem deleting an article`,
        isError: true,
      });
    },
  });

  const publishHandler = (data: { id: number; isPublished: boolean }) => () => {
    publishMutation.mutate(data);
  };

  const deleteHandler = (id: number) => () => {
    deleteMutation.mutate({ id });
  };

  const featureHandler = (id: number) => () => {
    featureMutation.mutate({ id });
  };

  const [searchString, setSearchString] = useState("");

  const throttledSetSearchString = useCallback(
    throttle(setSearchString, 500),
    []
  );

  const searchArticlesQuery = trpc.article.search.useQuery({
    searchString,
  });

  return (
    <Stack spacing={72}>
      <Box>
        <Text mb={32} size={28} weight="bold">
          Featured Article
        </Text>
        {featureQuery.isLoading && (
          <Skeleton width={"100%"} height={400} radius={"lg"} animate />
        )}
        {featureQuery.data && (
          <Box className={classes.wrapper}>
            <MediaQuery largerThan={"lg"} styles={{ display: "none" }}>
              <div>
                <AotD small {...featureQuery.data.article} />
              </div>
            </MediaQuery>
            <MediaQuery smallerThan={"lg"} styles={{ display: "none" }}>
              <div>
                <AotD {...featureQuery.data.article} />
              </div>
            </MediaQuery>
            <AdminOptions
              article={featureQuery.data.article}
              isDeleting={
                deleteMutation.isLoading &&
                selectedArticle === featureQuery.data.articleId
              }
              deleteHandler={deleteHandler(featureQuery.data.articleId)}
              isPublishing={
                publishMutation.isLoading &&
                selectedArticle === featureQuery.data.articleId
              }
              publishHandler={publishHandler({
                id: featureQuery.data.articleId,
                isPublished: !featureQuery.data.article.isPublished,
              })}
              isFeatured={
                featureQuery.data.articleId === featureQuery.data?.articleId
              }
              isFeaturing={
                featureMutation.isLoading &&
                selectedArticle === featureQuery.data.articleId
              }
              featureHandler={featureHandler(featureQuery.data.articleId)}
            />
          </Box>
        )}
      </Box>
      <Box>
        <Group mt={48} position="apart">
          <Text weight={"bold"} size={28}>
            My Articles {articlesQuery.data && `(${articlesQuery.data.length})`}
          </Text>
          <Button
            onClick={() => {
              articleModalHandlers.open();
            }}
            radius={"xl"}
            color={"dark"}
          >
            Create
          </Button>
        </Group>
        {articlesQuery.data && articlesQuery.data.length === 0 && (
          <Text mt={32} size={18}>
            You have no articles yet. Create one!
          </Text>
        )}
        <SimpleGrid
          breakpoints={[
            { minWidth: "xs", cols: 2 },
            { minWidth: "lg", cols: 3 },
            { minWidth: "xl", cols: 4 },
          ]}
          mt={48}
          spacing={"xl"}
        >
          {articlesQuery.isLoading && (
            <>
              <Skeleton width={"100%"} height={180} radius={"lg"} animate />
              <Skeleton width={"100%"} height={180} radius={"lg"} animate />
              <Skeleton width={"100%"} height={180} radius={"lg"} animate />
              <Skeleton width={"100%"} height={180} radius={"lg"} animate />
            </>
          )}
          {articlesQuery.data &&
            articlesQuery.data.map((props) => (
              <Box key={props.id} className={classes.wrapper}>
                <ArticleCard {...props} slug="" />
                <AdminOptions
                  article={props}
                  isDeleting={
                    deleteMutation.isLoading && selectedArticle === props.id
                  }
                  deleteHandler={deleteHandler(props.id)}
                  isPublishing={
                    publishMutation.isLoading && selectedArticle === props.id
                  }
                  publishHandler={publishHandler({
                    id: props.id,
                    isPublished: !props.isPublished,
                  })}
                  isFeatured={props.id === featureQuery.data?.articleId}
                  isFeaturing={
                    featureMutation.isLoading && selectedArticle === props.id
                  }
                  featureHandler={featureHandler(props.id)}
                />
              </Box>
            ))}
        </SimpleGrid>
        {articleModalIsOpened && (
          <ArticleModal
            mode="Create"
            close={articleModalHandlers.close}
            opened={articleModalIsOpened}
          />
        )}
      </Box>
      <Box>
        <Text weight={"bold"} size={28} mt={48}>
          All Articles
        </Text>

        <TextInput
          mt={"xl"}
          radius="xl"
          onChange={(e) => throttledSetSearchString(e.target.value)}
          placeholder="Search an article to edit "
        />

        {searchArticlesQuery.isLoading && (
          <Center mt={"xl"}>
            <Loader />
          </Center>
        )}

        {searchString === "" ? (
          <Text mt={32} size={18}>
            Search an article to edit
          </Text>
        ) : (
          searchArticlesQuery.data &&
          searchArticlesQuery.data.articles.length === 0 && (
            <Text mt={32} size={18}>
              No articles found
            </Text>
          )
        )}

        <SimpleGrid
          breakpoints={[
            { minWidth: "xs", cols: 2 },
            { minWidth: "lg", cols: 3 },
            { minWidth: "xl", cols: 4 },
          ]}
          mt={48}
          spacing={"xl"}
        >
          {searchArticlesQuery.data &&
            searchArticlesQuery.data.articles.map((props) => (
              <Box key={props.id} className={classes.wrapper}>
                <ArticleCard {...props} slug="" />
                <AdminOptions
                  // @ts-ignore
                  article={props}
                  isDeleting={
                    deleteMutation.isLoading && selectedArticle === props.id
                  }
                  deleteHandler={deleteHandler(props.id)}
                  isPublishing={
                    publishMutation.isLoading && selectedArticle === props.id
                  }
                  publishHandler={publishHandler({
                    id: props.id,
                    isPublished: !props.isPublished,
                  })}
                  isFeatured={props.id === featureQuery.data?.articleId}
                  isFeaturing={
                    featureMutation.isLoading && selectedArticle === props.id
                  }
                  featureHandler={featureHandler(props.id)}
                />
              </Box>
            ))}
        </SimpleGrid>
        {articleModalIsOpened && (
          <ArticleModal
            mode="Create"
            close={articleModalHandlers.close}
            opened={articleModalIsOpened}
          />
        )}
      </Box>
    </Stack>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );
  if (!session || session.user.role !== "admin") {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      session,
    },
  };
};
