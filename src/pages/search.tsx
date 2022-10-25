import { trpc } from "@/trpc/hook";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  Loader,
  SimpleGrid,
  Center,
  Stack,
  MediaQuery,
  Box,
  Image,
  createStyles,
  Title,
} from "@mantine/core";
import ArticleCard from "@/components/ArticleCard/ArticleCard";
import SearchBar from "@/components/SearchBar/SearchBar";

const useStyles = createStyles((theme) => ({
  title: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },
}));

export default function search() {
  const { classes } = useStyles();
  const { query } = useRouter();
  const searchQuery = trpc.article.search.useInfiniteQuery(
    {
      searchString: String(query?.query),
      limit: 24,
    },
    {
      enabled: typeof query?.query === "string",
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
        if (searchQuery.hasNextPage) await searchQuery.fetchNextPage();
        fetching = false;
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [searchQuery.fetchNextPage, searchQuery.hasNextPage]);

  if (query.query === undefined)
    return (
      <Stack align={"center"} mt={48} spacing={0}>
        <MediaQuery largerThan={"md"} styles={{ display: "none" }}>
          <Box mb={16} mx={"auto"} sx={{ minWidth: "80%" }}>
            <SearchBar />
          </Box>
        </MediaQuery>

        <Title className={classes.title}>
          Try searching for &quot;Doge coin&quot; ...
        </Title>
        <Box mt={48} sx={{ maxWidth: 700 }}>
          <Image src={"/search.svg"} />
        </Box>
      </Stack>
    );

  if (searchQuery.isInitialLoading)
    return (
      <Center mt={48}>
        <Loader color={"dark"} />
      </Center>
    );

  if (searchQuery.data === undefined)
    return (
      <Stack align={"center"} mt={48} spacing={0}>
        <MediaQuery largerThan={"md"} styles={{ display: "none" }}>
          <Box mb={16} mx={"auto"} sx={{ minWidth: "80%" }}>
            <SearchBar />
          </Box>
        </MediaQuery>
        <Title className={classes.title}>
          Hmm seems like a problem occured
        </Title>
        <Box sx={{ maxWidth: 700 }}>
          <Image src={"/404.svg"} />
        </Box>
      </Stack>
    );

  if (searchQuery.data?.pages[0].articles.length === 0)
    return (
      <Stack align={"center"} mt={48} spacing={0}>
        <MediaQuery largerThan={"md"} styles={{ display: "none" }}>
          <Box mb={16} mx={"auto"} sx={{ minWidth: "80%" }}>
            <SearchBar />
          </Box>
        </MediaQuery>
        <Title className={classes.title}>Nothing was found!</Title>
        <Box sx={{ maxWidth: 700 }}>
          <Image src={"/no-result.svg"} />
        </Box>
      </Stack>
    );

  return (
    <Box mt={48}>
      <MediaQuery largerThan={"md"} styles={{ display: "none" }}>
        <Box mx={"auto"} sx={{ maxWidth: "80%" }}>
          <SearchBar />
        </Box>
      </MediaQuery>
      <Title mt={32} order={2} size={32}>
        Search results
      </Title>
      <SimpleGrid
        breakpoints={[
          { minWidth: "xs", cols: 2 },
          { minWidth: "lg", cols: 3 },
          { minWidth: "xl", cols: 4 },
        ]}
        mt={32}
        spacing={"xl"}
      >
        {searchQuery.data?.pages.map(({ articles }) =>
          articles.map((props, i) => (
            <ArticleCard withAuthor {...props} key={i} />
          ))
        )}
      </SimpleGrid>
      {searchQuery.isFetching && (
        <Center mt={48}>
          <Loader color="dark" />
        </Center>
      )}
    </Box>
  );
}
