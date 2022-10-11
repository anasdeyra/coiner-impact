import { Box, Stack, Title } from "@mantine/core";
import PriceMarquee from "../components/PriceMarquee/PriceMarquee";
import AotD from "@/components/ArticleCard/ArticleOfTheDay";
import { ARGS } from "@/components/ArticleCard/ArticleCard.stories";

import { InferGetServerSidePropsType } from "next";

const Home = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <PriceMarquee />
      <Stack mt={48} spacing={72}>
        <Box>
          <Title mb={32} order={1}>
            Article of The Day
          </Title>
          <AotD small {...ARGS} />
        </Box>
        <Box>
          <Title order={1}>Latest Articles</Title>
          <Stack mt={32} spacing={24}></Stack>
        </Box>
      </Stack>
    </>
  );
};

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};

export default Home;
