/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: 'docs',
  trailingSlash: true, // Ensures clean URLs in static export
  images: {
    unoptimized: true,
    loader: 'custom',
    domains: [],
  },
};

export default nextConfig;
