/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["i.dummyjson.com"],
  },
};

module.exports = nextConfig;
