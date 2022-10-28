import { router } from "./trpc";
import article from "./routers/article/articleRouter";
import publicRouter from "./routers/public";
export const appRouter = router({
  article,
  public: publicRouter,
});
// Export only the **type** of a router to avoid importing server code on the client
export type AppRouter = typeof appRouter;
