import { publicProcedure } from "@/trpc/trpc";

export const getAlltitles = publicProcedure.query(async () => {
  const articleTitles = await prisma.article.findMany({
    select: { title: true },
  });
  return articleTitles;
});
