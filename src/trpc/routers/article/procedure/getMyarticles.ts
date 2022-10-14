import { publicProcedure } from "@/trpc/trpc";
import prisma from "@db";
import { z } from "zod";

export const getMyArticles = publicProcedure
  .input(
    z
      .object({
        topic: z.string().optional(),
      })
      .optional()
  )
  .query(async ({ ctx, input }) => {
    const articles = await prisma.article.findMany({
      where: {
        authorId: ctx.session?.user.id ?? "",
        // @ts-ignore
      },
      include: { author: true },
      orderBy: { createdAt: "desc" },
    });
    return articles;
  });
