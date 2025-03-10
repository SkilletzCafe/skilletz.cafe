import Head from 'next/head';

import { SEO } from '@/config';

import { geist } from '@/config/fonts';

import { ThemeProvider } from '@/context/ThemeContext';

import styles from '@/styles/Layout.module.css';

import Footer from './Footer';
import GoogleAnalytics from './GoogleAnalytics';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({
  children,
  title,
  description = SEO.description.default,
}: LayoutProps) {
  return (
    <ThemeProvider>
      <Head>
        <title>{SEO.formatTitle(title)}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GoogleAnalytics />
      <div className={`${geist.className} ${styles.layout}`}>
        <Header />
        <main className={styles.main}>{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
