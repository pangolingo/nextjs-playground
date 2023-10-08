/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // pokemon sprite graphics
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        // pathname: '/account123/**',
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
