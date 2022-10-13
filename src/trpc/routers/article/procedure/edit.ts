import { adminProcedure } from "@/trpc/trpc";
import { z } from "zod";
import prisma from "@db";

export const edit = adminProcedure
  .input(
    z.object({
      topic: z.string().optional(),
      title: z.string().optional(),
      slug: z.string().optional(),
      imageUrl: z.string().url().optional(),
      content: z.string().optional(),
      isPublished: z.boolean().optional(),
      id: z.number(),
    })
  )
  .mutation(async ({ ctx, input: { id, ...data } }) => {
    const article = await prisma.article.findUnique({ where: { id } });
    const publishedAt =
      data.isPublished && article?.isPublished === false
        ? new Date(Date.now())
        : undefined;
    await prisma.article.update({
      where: { id },
      //@ts-ignore: Topic enum vs string
      data: { ...data, publishedAt },
    });
  });
