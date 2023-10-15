import { TRPC_TOKEN } from "@/common";
import { TRPCError, type inferAsyncReturnType, initTRPC } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import type { NextRequest } from "next/server";

export async function createContext(opts: FetchCreateContextFnOptions) {
  const { ip, geo, headers } = opts.req as NextRequest;
  const token = headers.get("Authorization")?.split(" ")[1];
  return { ip, geo, token };
}
export type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();
export const middleware = t.middleware;
export const router = t.router;

const appCheck = middleware((opts) => {
  const { ctx } = opts;
  const token = ctx.token;
  if (!token || token !== TRPC_TOKEN) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return opts.next({ ctx });
});
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(appCheck);

export class APIResp {
  message: string;
  success: boolean;
  constructor(message: string, success: boolean) {
    this.message = message;
    this.success = success;
    return this;
  }
}
