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
} from "@mantine/core";
import ArticleModal from "@/components/Modals/ArticleModal/ArticleModal";
import { useDisclosure } from "@mantine/hooks";
import showNotification from "src/utils/showNotification";
import dynamic from "next/dynamic";
import { useState } from "react";
const AdminOptions = dynamic(
  () => import("@/components/ArticleCard/AdminOptions"),
  { ssr: false }
);

const useStyles = createStyles((t) => ({
  wrapper: { position: "relative" },
}));

export default function admin() {
  const [articleModalIsOpened, articleModalHandlers] = useDisclosure(false);
  const [selectedArticle, setSelectedArticle] = useState(-1);

  const { classes } = useStyles();

  const trpcContext = trpc.useContext();

  const articlesQuery = trpc.article.infiniteScroll.useQuery({});

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

  return (
    <>
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
      <SimpleGrid
        breakpoints={[
          { minWidth: "sm", cols: 2 },
          { minWidth: "md", cols: 3 },
          { minWidth: "lg", cols: 4 },
          { minWidth: "xl", cols: 5 },
        ]}
        mt={48}
        spacing={"xl"}
      >
        {articlesQuery.data &&
          articlesQuery.data.map((props) => (
            <Box key={props.id} className={classes.wrapper}>
              <ArticleCard {...props} />
              <AdminOptions
                article={props}
                isDeleting={
                  deleteMutation.isLoading && selectedArticle === props.id
                }
                isPublishing={
                  publishMutation.isLoading && selectedArticle === props.id
                }
                publishHandler={publishHandler({
                  id: props.id,
                  isPublished: !props.isPublished,
                })}
                deleteHandler={deleteHandler(props.id)}
              />
            </Box>
          ))}
      </SimpleGrid>
      <ArticleModal
        mode="Create"
        close={articleModalHandlers.close}
        opened={articleModalIsOpened}
      />
    </>
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
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
