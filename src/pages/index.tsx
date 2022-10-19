import {
  Box,
  Stack,
  Text,
  MediaQuery,
  SimpleGrid,
  Loader,
  Center,
  Group,
  ScrollArea,
} from "@mantine/core";
import AotD from "@/components/ArticleCard/ArticleOfTheDay";
import dynamic from "next/dynamic";
import { SEO } from "@const";
import Head from "next/head";
import { trpc } from "@/trpc/hook";
import ArticleCard from "@/components/ArticleCard/ArticleCard";
import { useEffect } from "react";
import TopicsFilter from "@/components/TopicsFilter/TopicsFilter";

const PriceMarquee = dynamic(
  () => import("../components/PriceMarquee/PriceMarquee")
);

const Home = () => {
  const featuredArticleQuery = trpc.article.getFeatured.useQuery();
  const latestArticles = trpc.article.latest.useInfiniteQuery(
    {
      limit: 8,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  useEffect(() => {
    let fetching = false;
    const handleScroll = async (e: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        e.target.scrollingElement;
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
        fetching = true;
        if (latestArticles.hasNextPage) await latestArticles.fetchNextPage();
        fetching = false;
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [latestArticles.fetchNextPage, latestArticles.hasNextPage]);

  return (
    <>
      <SEOTags />
      <PriceMarquee />
      <Stack mt={48} spacing={72}>
        <Box>
          <Text component="h2" size={32} weight={"bold"} mb={32}>
            Article of The Day
          </Text>
          {featuredArticleQuery.data && (
            <>
              <MediaQuery largerThan={"lg"} styles={{ display: "none" }}>
                <div>
                  <AotD small {...featuredArticleQuery.data.article} />
                </div>
              </MediaQuery>
              <MediaQuery smallerThan={"lg"} styles={{ display: "none" }}>
                <div>
                  <AotD {...featuredArticleQuery.data.article} />
                </div>
              </MediaQuery>
            </>
          )}
        </Box>
        <Box>
          <Text component="h2" size={32} weight={"bold"}>
            Latest Articles
          </Text>
          <ScrollArea type="never">
            <Group py={2} noWrap mt={0}>
              <TopicsFilter />
            </Group>
          </ScrollArea>
          <SimpleGrid
            breakpoints={[
              { minWidth: "xs", cols: 2 },
              { minWidth: "lg", cols: 3 },
              { minWidth: "xl", cols: 4 },
            ]}
            mt={48}
            spacing={"xl"}
          >
            {latestArticles.data?.pages.map(({ articles }) =>
              articles.map((props, i) => (
                <ArticleCard withAuthor {...props} key={i} />
              ))
            )}
          </SimpleGrid>
          {latestArticles.isFetching && (
            <Center mt={48}>
              <Loader color="dark" />
            </Center>
          )}
        </Box>
      </Stack>
    </>
  );
};

// export const getServerSideProps = async ({ req, res }) => {

//   const context = await createContext({ req, res });
//   const response = await articleCaller(context).getFeatured();
//   const featured: typeof response = JSON.parse(JSON.stringify(response));
//   return {
//     props: { featured },
//   };
// };

function SEOTags() {
  return (
    <Head>
      <meta property="og:type" content="website" />
      <meta property="og:url" content={SEO.website} />
      <meta property="og:title" content={SEO.title} />
      <meta property="og:description" content={SEO.description} />
      <meta property="og:image" content={SEO.image} />
      <meta property="og:site_name" content={SEO.title} />
      {/* twitter tags */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={SEO.twitterhandler} />
      <meta name="twitter:title" content={SEO.title} />
      <meta name="twitter:description" content={SEO.description} />
      <meta name="twitter:creator" content={SEO.twitterhandler} />
      <meta name="twitter:image" content={SEO.image} />
    </Head>
  );
}

export default Home;
