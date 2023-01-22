import { publicProcedure } from "@/trpc/trpc";
import { z } from "zod";
import prisma from "@db";

export const save = publicProcedure
  .input(z.object({ id: z.number() }))
  .mutation(async ({ ctx, input: { id } }) => {
    await prisma.user.update({
      where: { id: ctx.session?.user.id },
      data: { savedArticles: { connect: { id } } },
    });
  });

export const unsave = publicProcedure
  .input(z.object({ id: z.number() }))
  .mutation(async ({ ctx, input: { id } }) => {
    await prisma.user.update({
      where: { id: ctx.session?.user.id },
      data: { savedArticles: { disconnect: { id } } },
    });
  });

export const getSaved = publicProcedure
  .input(z.object({ skip: z.number().optional(), take: z.number().optional() }))
  .query(async ({ ctx, input: { skip, take } }) => {
    return await prisma.user
      .findUnique({ where: { id: ctx.session?.user.id } })
      .savedArticles({ skip, take });
  });
