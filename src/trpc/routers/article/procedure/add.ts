import { adminProcedure } from "@/trpc/trpc";
import prisma from "@db";
import { z } from "zod";

export const add = adminProcedure
  .input(
    z.object({
      topic: z.string(),
      title: z.string().regex(/^[\w\-. ]+$/, {
        message:
          "The title should contain only alphanumeric characters, -, _, . and space",
      }),
      slug: z.string(),
      imageUrl: z.string().url(),
      content: z.string(),
      isPublished: z.boolean().optional(),
      keywords: z.array(z.string()).optional(),
    })
  )
  .mutation(async ({ ctx, input: { keywords, ...input } }) => {
    const publishedAt = new Date(input.isPublished ? Date.now() : 0);
    await prisma.article.create({
      //@ts-ignore: Topic enum vs string
      data: {
        ...input,
        publishedAt,
        authorId: ctx.session.user.id,
        keywords: {
          connectOrCreate: keywords?.map((keyword) => ({
            where: { name: keyword },
            create: { name: keyword },
          })),
        },
      },
    });
  });
