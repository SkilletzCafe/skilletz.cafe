'use client';

import Head from 'next/head';

import { SEO } from '@/config';
import { ThemeProvider } from '@nextjs-htk/core/context';

import { geist } from '@/config/fonts';

import styles from '@/styles/Layout.module.css';

import Footer from './Footer';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({ children, title, description }: LayoutProps) {
  const pageDescription = description || SEO.description.default;
  const pageTitle = SEO.formatTitle(title);

  return (
    <ThemeProvider>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${geist.className} ${styles.layout}`}>
        <Header />
        <main className={styles.main}>{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
