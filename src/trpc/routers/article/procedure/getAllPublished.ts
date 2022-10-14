import { publicProcedure } from "@/trpc/trpc";
import prisma from "@db";
import { z } from "zod";

export const getAllPublished = publicProcedure
  .input(
    z
      .object({
        topic: z.string().optional(),
      })
      .optional()
  )
  .query(async ({ ctx, input }) => {
    const articles = await prisma.article.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        imageUrl: true,
        publishedAt: true,
        author: { select: { name: true, image: true } },
      },
      where: {
        isPublished: true,
        // @ts-ignore
      },
      orderBy: { createdAt: "desc" },
    });
    return articles;
  });
