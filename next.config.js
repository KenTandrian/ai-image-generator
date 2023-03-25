/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["firebasestorage.googleapis.com", "links.papareact.com"],
  },
};

module.exports = nextConfig;
