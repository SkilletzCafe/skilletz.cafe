import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import build directory from TypeScript config causes issues with Next.js
// Using the same value as defined in src/config/build.ts
const BUILD_DIR = 'docs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: BUILD_DIR,
  trailingSlash: true, // Ensures clean URLs in static export
  productionBrowserSourceMaps: true, // Enable source maps for debugging
  images: {
    unoptimized: true,
    loader: 'custom',
    domains: [],
  },
  webpack: (config) => {
    // Force all React imports to resolve to the same instance
    const reactPath = path.resolve(__dirname, 'node_modules/react');
    const reactDomPath = path.resolve(__dirname, 'node_modules/react-dom');

    config.resolve.alias = {
      ...config.resolve.alias,
      react: reactPath,
      'react-dom': reactDomPath,
    };

    return config;
  },
};

export default nextConfig;
