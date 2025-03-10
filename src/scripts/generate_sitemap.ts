import fs from 'fs';
import path from 'path';

import { BUILD, PAGES, SITE_URL } from '@/config/sitemap';

import { generateSiteMap } from '@/utils/sitemap';

// Generate the sitemap during build
const sitemap = generateSiteMap();
const buildDir = path.join(process.cwd(), BUILD.outputDir);

// Ensure the build directory exists
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}

// Write the sitemap file
fs.writeFileSync(path.join(buildDir, 'sitemap.xml'), sitemap);
