import { NextResponse } from 'next/server';

import { generateSiteMap } from '@/utils/sitemap';

export const dynamic = 'force-static';

export async function GET() {
  const sitemap = generateSiteMap();
  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
