import { initTRPC, TRPCError } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { geolocation, ipAddress } from "@vercel/functions";
import type { NextRequest } from "next/server";
import { TRPC_TOKEN } from "@/common";

export async function createContext(opts: FetchCreateContextFnOptions) {
  const { headers } = opts.req as NextRequest;
  const ip = ipAddress(opts.req);
  const geo = geolocation(opts.req);
  const token = headers.get("Authorization")?.split(" ")[1];
  return { ip, geo, token };
}
export type Context = Awaited<ReturnType<typeof createContext>>;

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
  }
}
