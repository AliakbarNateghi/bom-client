/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    serverActions: true,
  },
  credentials: "include",
};

module.exports = nextConfig;
