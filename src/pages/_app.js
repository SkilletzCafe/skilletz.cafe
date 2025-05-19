import StructuredData from '@/components/StructuredData';

import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <StructuredData />
      <Component {...pageProps} />
    </>
  );
}
