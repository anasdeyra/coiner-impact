import { Box, Stack, Title, MediaQuery } from "@mantine/core";
import AotD from "@/components/ArticleCard/ArticleOfTheDay";
import { InferGetServerSidePropsType } from "next";
import { createContext } from "@/trpc/context";
import { articleCaller } from "@/trpc/routers/article/articleRouter";
import dynamic from "next/dynamic";
import { SEO } from "@const";
import Head from "next/head";

const PriceMarquee = dynamic(
  () => import("../components/PriceMarquee/PriceMarquee")
);

const Home = ({
  featured,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
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
      <PriceMarquee />
      <Stack mt={48} spacing={72}>
        <Box>
          <Title mb={32} order={1}>
            Article of The Day
          </Title>
          {featured && (
            <>
              <MediaQuery largerThan={"lg"} styles={{ display: "none" }}>
                <div>
                  <AotD small {...featured.article} />
                </div>
              </MediaQuery>
              <MediaQuery smallerThan={"lg"} styles={{ display: "none" }}>
                <div>
                  <AotD {...featured.article} />
                </div>
              </MediaQuery>
            </>
          )}
        </Box>
        <Box>
          <Title order={1}>Latest Articles</Title>
          <Stack mt={32} spacing={24}></Stack>
        </Box>
      </Stack>
    </>
  );
};

//@ts-ignore: see u later
export const getServerSideProps = async ({ req, res }) => {
  //@ts-ignore: see u later
  const context = await createContext({ req, res });
  const response = await articleCaller(context).getFeatured();
  const featured: typeof response = JSON.parse(JSON.stringify(response));
  return {
    props: { featured },
  };
};

export default Home;
