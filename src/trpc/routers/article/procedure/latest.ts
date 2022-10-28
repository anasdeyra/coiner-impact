import { publicProcedure } from "@/trpc/trpc";
import prisma from "@db";
import { z } from "zod";

export const latest = publicProcedure
  .input(
    z.object({
      topic: z.string().optional(),
      limit: z.number().min(1).max(100).nullish(),
      cursor: z.number().nullish(),
    })
  )
  .query(async ({ ctx, input }) => {
    const limit = input.limit ?? 50;
    const { cursor } = input;

    const articles = await prisma.article.findMany({
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      // @ts-ignore: topic vs string
      where: { isPublished: true, topic: input?.topic },
      select: {
        id: true,
        title: true,
        slug: true,
        imageUrl: true,
        publishedAt: true,
        isPublished: true,
        author: { select: { name: true, image: true } },
      },
      orderBy: { publishedAt: "desc" },
    });
    let nextCursor: typeof cursor | undefined = undefined;
    if (articles.length > limit) {
      const nextItem = articles.pop();
      nextCursor = nextItem!.id;
    }
    return { articles, nextCursor };
  });
