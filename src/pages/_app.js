import { GoogleAnalytics } from '@hacktoolkit/nextjs-htk/components';

import { ANALYTICS } from '@/config/analytics';

import StructuredData from '@/components/StructuredData';

import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <GoogleAnalytics measurementId={ANALYTICS.google.measurementId} />
      <StructuredData />
      <Component {...pageProps} />
    </>
  );
}
