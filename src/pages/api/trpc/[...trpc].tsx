import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "@/trpc/router";
import { createContext } from "@/trpc/context";

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
