import { Head, Html, Main, NextScript } from 'next/document';

import { ANALYTICS } from '@/config/analytics';

const googleAnalyticsSrc = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS.google.measurementId}`;
const googleAnalyticsConfig = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', '${ANALYTICS.google.measurementId}');
`;

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <script async src={googleAnalyticsSrc}></script>
        <script dangerouslySetInnerHTML={{ __html: googleAnalyticsConfig }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
