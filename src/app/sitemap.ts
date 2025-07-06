import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  return [
    {
      url: `${protocol}://${host}/`,
      lastModified: new Date().toISOString().split("T")[0],
    },
  ];
}
