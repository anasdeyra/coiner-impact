import { trpc } from "@/trpc/hook";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Loader, SimpleGrid, Center } from "@mantine/core";
import ArticleCard from "@/components/ArticleCard/ArticleCard";

export default function search() {
  const { query } = useRouter();
  const searchQuery = trpc.article.search.useInfiniteQuery(
    {
      searchString: String(query?.query),
      limit: 16,
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

  if (query.query === undefined) return <>search for sum bro</>;

  if (searchQuery.isInitialLoading)
    return (
      <Center mt={48}>
        <Loader color={"dark"} />
      </Center>
    );

  if (searchQuery.data === undefined)
    return <>There was a problem with the search fam</>;

  if (searchQuery.data?.pages[0].articles.length === 0)
    return <>nothing found</>;

  return (
    <>
      <SimpleGrid
        breakpoints={[
          { minWidth: "xs", cols: 2 },
          { minWidth: "lg", cols: 3 },
          { minWidth: "xl", cols: 4 },
        ]}
        mt={48}
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
    </>
  );
}
