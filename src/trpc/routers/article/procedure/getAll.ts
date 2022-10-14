import { adminProcedure } from "@/trpc/trpc";
import prisma from "@db";
import { z } from "zod";

export const getAll = adminProcedure
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
      orderBy: { createdAt: "desc" },
    });
    return articles;
  });
