import Head from 'next/head';

import { SITE_URL } from '@/config/pages';

const StructuredData = () => (
  <Head>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: "Skillet'z Cafe",
          url: SITE_URL,
        }),
      }}
    />
  </Head>
);

export default StructuredData;
