// Import build directory from TypeScript config causes issues with Next.js
// Using the same value as defined in src/config/build.ts
const BUILD_DIR = 'docs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: BUILD_DIR,
  trailingSlash: true, // Ensures clean URLs in static export
  images: {
    unoptimized: true,
    loader: 'custom',
    domains: [],
  },
};

export default nextConfig;
