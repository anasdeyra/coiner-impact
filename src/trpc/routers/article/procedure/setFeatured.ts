import { adminProcedure } from "@/trpc/trpc";
import prisma from "@db";
import { z } from "zod";

export const setFeatured = adminProcedure
  .input(z.object({ id: z.number() }))
  .mutation(async ({ ctx, input }) => {
    const articles = await prisma.featured_Article.upsert({
      where: { featured: "featured" },
      update: { articleId: input.id },
      create: { featured: "featured", articleId: input.id },
    });
  });
