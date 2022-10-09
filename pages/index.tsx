import { Box, Stack, Title } from "@mantine/core";
import PriceMarquee from "../components/PriceMarquee/PriceMarquee";
import AotD from "@/components/ArticleCard/ArticleOfTheDay";
import { ARGS } from "@/components/ArticleCard/ArticleCard.stories";

const Home = () => {
  return (
    <Stack spacing={48}>
      <PriceMarquee />
      <Box>
        <Title mb={32} order={1}>
          Article of The Day
        </Title>
        <AotD small {...ARGS} />
      </Box>
    </Stack>
  );
};

export default Home;
