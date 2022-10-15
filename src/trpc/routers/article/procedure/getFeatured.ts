import { publicProcedure } from "@/trpc/trpc";
import prisma from "@db";

export const getFeatured = publicProcedure.query(async ({ ctx }) => {
  const article = await prisma.featured_Article.findFirst({
    where: { featured: "featured" },
    select: {
      article: { include: { author: true } },
      articleId: true,
    },
  });
  return article;
});
