import { publicProcedure } from "@/trpc/trpc";
import prisma from "@db";
import { z } from "zod";

export const infiniteScroll = publicProcedure
  .input(
    z.object({
      topic: z.string().nullish(),
    })
  )
  .query(async ({ ctx, input }) => {
    const articles = await prisma.article.findMany({
      where: {
        isPublished:
          ctx.session?.user.role === "user" ? { equals: true } : undefined,
        // @ts-ignore
      },
      include: { author: true },
      orderBy: { createdAt: "desc" },
    });
    return articles;
  });
