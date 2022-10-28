import { adminProcedure } from "@/trpc/trpc";
import { z } from "zod";
import prisma from "@db";

export const pusblish = adminProcedure
  .input(z.object({ id: z.number(), isPublished: z.boolean() }))
  .mutation(async ({ ctx, input: { id, isPublished } }) => {
    const article = await prisma.article.findUnique({ where: { id } });
    const publishedAt =
      isPublished && article?.isPublished === false
        ? new Date(Date.now())
        : undefined;
    await prisma.article.update({
      where: { id },
      data: { isPublished, publishedAt },
    });
  });
