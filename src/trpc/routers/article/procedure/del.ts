import { adminProcedure } from "@/trpc/trpc";
import { z } from "zod";
import prisma from "@db";

export const del = adminProcedure
  .input(z.object({ id: z.number() }))
  .mutation(async ({ ctx, input: { id } }) => {
    await prisma.article.delete({
      where: { id },
    });
  });
