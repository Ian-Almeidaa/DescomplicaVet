import { createRouter } from "@tanstack/react-router";
import { createIsomorphicFn } from "@tanstack/react-start";
import { routeTree } from "./routeTree.gen";

const getNonce = createIsomorphicFn()
  .server(async () => {
    const { getRequest } = await import("@tanstack/react-start/server");
    return getRequest().headers.get("x-internal-csp-nonce") ?? undefined;
  })
  .client(async () => undefined);

export const getRouter = async () => {
  const nonce = await getNonce();
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    ssr: { nonce },
  });

  return router;
};
