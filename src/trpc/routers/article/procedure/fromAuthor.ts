import { publicProcedure } from "@/trpc/trpc";
import prisma from "@db";
import { z } from "zod";

export const fromAuthor = publicProcedure
  .input(
    z.object({
      topic: z.string().optional(),
      authorId: z.string().cuid(),
      count: z.number().optional(),
      excludedId: z.number().optional(),
    })
  )
  .query(async ({ ctx, input }) => {
    const articles = await prisma.article.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        imageUrl: true,
        publishedAt: true,
      },
      where: {
        isPublished: true,
        authorId: input?.authorId,
        id: { not: input.excludedId },
      },
      orderBy: { publishedAt: "desc" },
      take: input.count,
    });
    return articles;
  });
