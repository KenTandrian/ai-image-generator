import pkg from "../package.json";

export const TRPC_TOKEN = process.env.NEXT_PUBLIC_TRPC_TOKEN;
export const VERSION = process.env.npm_package_version || pkg.version;
