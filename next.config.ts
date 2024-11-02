import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "firebasestorage.googleapis.com", protocol: "https" },
    ],
  },
  async headers() {
    return [
      {
        source: "/api/getImages",
        headers: [{ key: "Cache-Control", value: "no-store, max-age=0" }],
      },
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
