import { publicProcedure, router } from "@/trpc/trpc";
import { z } from "zod";
import prisma from "@db";

const newsletterSignup = publicProcedure
  .input(z.object({ email: z.string().email() }))
  .mutation(async ({ input: { email } }) => {
    await prisma.newsletter.create({ data: { email } });
  });

const publicRouter = router({ newsletterSignup });

export type PublicRouter = typeof publicRouter;
export const publicCaller = publicRouter.createCaller;
export default publicRouter;
