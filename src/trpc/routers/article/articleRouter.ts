import { publicProcedure, router } from "../../trpc";
const article = router({
  greeting: publicProcedure.query(() => "hello tRPC v10!"),
});

export type ArticleRouter = typeof article;
export default article;
