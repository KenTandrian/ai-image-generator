import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";

import type { AppRouter } from "@/server";
import { TRPC_TOKEN } from "@/common";

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "/api",
      headers: { Authorization: "Bearer " + TRPC_TOKEN },
    }),
    loggerLink(),
  ],
});

export default trpc;
