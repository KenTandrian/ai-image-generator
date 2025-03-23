import { createTRPCClient, httpBatchLink, loggerLink } from "@trpc/client";

import { TRPC_TOKEN } from "@/common";
import type { AppRouter } from "@/server";

const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "/api",
      headers: { Authorization: "Bearer " + TRPC_TOKEN },
    }),
    loggerLink(),
  ],
});

export default trpc;
