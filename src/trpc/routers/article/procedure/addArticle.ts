import { AdminProcedure } from "@/trpc/trpc";
import prisma from "@db";
import { z } from "zod";

export const infiniteScroll = AdminProcedure.input(
  z.object({
    topic: z.string(),
    title: z.string(),
    slug: z.string(),
    imageUrl: z.string(),
    content: z.string(),
    isPublished: z.boolean().optional(),
  })
).mutation(async ({ ctx, input }) => {
  const publishedAt = new Date(Date.now());
  await prisma.article.create({
    //@ts-ignore
    data: {
      ...input,
      publishedAt,
      authorId: ctx.session.user.id,
    },
  });
});
