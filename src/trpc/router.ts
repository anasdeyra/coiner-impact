import { router } from "./trpc";
import article from "./routers/article/articleRouter";
export const appRouter = router({
  article,
});
// Export only the **type** of a router to avoid importing server code on the client
export type AppRouter = typeof appRouter;
