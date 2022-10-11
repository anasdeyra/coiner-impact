import { publicProcedure } from "@/trpc/trpc";
import prisma from "@db";

export const getAlltitles = publicProcedure.query(async () => {
  const articleTitles = await prisma.article.findMany({
    select: { title: true },
    where: { published: true },
  });
  return articleTitles.map(({ title }) => title.replaceAll(" ", "-"));
});
