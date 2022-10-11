import { publicProcedure } from "@/trpc/trpc";
import prisma from "@db";
import { z } from "zod";

export const infiniteScroll = publicProcedure
  .input(
    z.object({
      limit: z.number().min(1).max(100).nullish(),
      cursor: z.number().nullish(),
      topic: z.string().nullable(),
    })
  )
  .query(async ({ ctx, input }) => {
    const limit = input.limit ?? 50;
    const { cursor, topic } = input;
    const articles = await prisma.article.findMany({
      select: {
        id: true,
        title: true,
        imageUrl: true,
        slug: true,
        publishedAt: true,
        topic: true,
        author: { select: { name: true, image: true, id: true } },
      },
      where: {
        isPublished: ctx.session?.user.role === "user" && { equals: true },
        // @ts-ignore
        topic: topic ?? undefined,
      },
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: {
        publishedAt: "desc",
      },
      take: limit + 1,
    });
    let nextCursor: typeof cursor | undefined = undefined;
    if (articles.length > limit) {
      const nextItem = articles.pop();
      nextCursor = nextItem!.id;
    }
    return {
      articles,
      nextCursor,
    };
  });
