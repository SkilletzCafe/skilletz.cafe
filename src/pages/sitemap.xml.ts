import { BUILD, PAGES, SITE_URL } from '@/config';
import fs from 'fs';
import path from 'path';

function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${Object.values(PAGES)
        .map((page) => {
          return `
            <url>
              <loc>${SITE_URL}${page.path}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>daily</changefreq>
              <priority>${page.path === '/' ? '1.0' : '0.8'}</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;
}

// Generate the sitemap during build
export async function getStaticProps() {
  const sitemap = generateSiteMap();
  const buildDir = path.join(process.cwd(), BUILD.outputDir);

  // Ensure the build directory exists
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
  }

  // Write the sitemap file
  fs.writeFileSync(path.join(buildDir, 'sitemap.xml'), sitemap);

  return {
    props: {},
  };
}

// This component won't be rendered
export default function Sitemap() {
  return null;
}
