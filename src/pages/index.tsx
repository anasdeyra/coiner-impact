import { Box, Stack, Title, MediaQuery } from "@mantine/core";
import PriceMarquee from "../components/PriceMarquee/PriceMarquee";
import AotD from "@/components/ArticleCard/ArticleOfTheDay";
import { InferGetServerSidePropsType } from "next";
import { createContext } from "@/trpc/context";
import { articleCaller } from "@/trpc/routers/article/articleRouter";

const Home = ({
  featured,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <PriceMarquee />
      <Stack mt={48} spacing={72}>
        <Box>
          <Title mb={32} order={1}>
            Article of The Day
          </Title>
          {featured && (
            <>
              <MediaQuery largerThan={"sm"} styles={{ display: "none" }}>
                <div>
                  <AotD small {...featured.article} />
                </div>
              </MediaQuery>
              <MediaQuery smallerThan={"sm"} styles={{ display: "none" }}>
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
  const featured = await articleCaller(context).getFeatured();
  return {
    props: { featured },
  };
};

export default Home;
