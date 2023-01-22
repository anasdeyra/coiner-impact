import { adminProcedure } from "@/trpc/trpc";
import { z } from "zod";
import prisma from "@db";

export const edit = adminProcedure
  .input(
    z.object({
      topic: z.string().optional(),
      title: z
        .string()
        .regex(/^[\w\-. ]+$/, {
          message:
            "The title should contain only alphanumeric characters, -, _, . and space",
        })
        .optional(),
      slug: z.string().optional(),
      imageUrl: z.string().url().optional(),
      content: z.string().optional(),
      isPublished: z.boolean().optional(),
      keywords: z.array(z.string()).optional(),
      id: z.number(),
    })
  )
  .mutation(async ({ ctx, input: { id, keywords, ...data } }) => {
    const article = await prisma.article.findUnique({ where: { id } });
    const publishedAt =
      data.isPublished && article?.isPublished === false
        ? new Date(Date.now())
        : undefined;
    await prisma.article.update({
      where: { id },
      //@ts-ignore: Topic enum vs string
      data: {
        ...data,
        publishedAt,
        keywords: {
          deleteMany: { NOT: { name: { in: keywords } } },
          connectOrCreate: keywords?.map((keyword) => ({
            where: { name: keyword },
            create: { name: keyword },
          })),
        },
      },
    });
  });
