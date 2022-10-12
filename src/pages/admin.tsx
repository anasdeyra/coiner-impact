import { unstable_getServerSession } from "next-auth/next";
import { GetServerSideProps } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import { trpc } from "@/trpc/hook";
import ArticleCard from "@/components/ArticleCard/ArticleCard";
import { Group, Title, SimpleGrid, Button } from "@mantine/core";

export default function admin() {
  const session = useSession();
  const articlesQuery = trpc.article.infiniteScroll.useQuery({});
  return (
    <>
      <Group mt={48} position="apart">
        <Title>
          Articles {articlesQuery.data && `(${articlesQuery.data.length})`}
        </Title>
        <Button radius={"xl"} size="md" color={"dark"}>
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
          articlesQuery.data.map((props) => <ArticleCard {...props} />)}
        {articlesQuery.data &&
          articlesQuery.data.map((props) => <ArticleCard {...props} />)}
        {articlesQuery.data &&
          articlesQuery.data.map((props) => <ArticleCard {...props} />)}
      </SimpleGrid>
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
