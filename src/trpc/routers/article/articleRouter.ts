import { router } from "@/trpc/trpc";
import * as procedures from "./procedures";

const article = router(procedures);

export type ArticleRouter = typeof article;
export const articleCaller = article.createCaller;
export default article;
