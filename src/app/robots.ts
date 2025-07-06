import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  return {
    rules: {
      userAgent: "*",
      allow: "/$",
      disallow: "/",
    },
    sitemap: `${protocol}://${host}/sitemap.xml`,
    host: `${protocol}://${host}`,
  };
}
