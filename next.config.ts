import path from 'node:path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: path.resolve(__dirname),
  },

  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  images: {
    formats: ['image/avif', 'image/webp'],
  },

  serverExternalPackages: [],

  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
  allowedDevOrigins: ['192.168.0.20'],
};

export default nextConfig;
