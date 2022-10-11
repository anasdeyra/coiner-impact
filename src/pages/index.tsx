import { Box, Stack, Title } from "@mantine/core";
import PriceMarquee from "../components/PriceMarquee/PriceMarquee";
import AotD from "@/components/ArticleCard/ArticleOfTheDay";
import { ARGS } from "@/components/ArticleCard/ArticleCard.stories";
import strapi from "@strapi";
import ArticleCard from "@/components/ArticleCard/ArticleCard";

const Home = ({ articles }: IndexProps) => {
  const articlesList = articles.data.map(({ attributes, id }) => (
    <ArticleCard key={id} {...attributes} />
  ));

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
          <Stack mt={32} spacing={24}>
            {articlesList}
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export const getServerSideProps = async () => {
  const articles = await strapi.find("articles", { populate: "deep" });

  return {
    props: { articles },
  };
};

interface IndexProps {
  articles: StrapiResponse<Article[]>;
  mainArticle: StrapiResponse<Article>;
}

export default Home;
