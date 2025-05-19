import Link from 'next/link';

import { BUSINESS } from '@/config';

import { geist, margarine } from '@/config/fonts';

import Layout from '@/components/Layout';

import styles from '@/styles/Home.module.css';

export default function Home() {
  return (
    <Layout>
      <div className={styles.page}>
        <div className={styles.hero}>
          <h1 className={margarine.className}>
            {BUSINESS.branding.welcome} {BUSINESS.name}
          </h1>
          <p className={`${styles.tagline} ${geist.className}`}>{BUSINESS.branding.tagline}</p>
          <div className={`${styles.cta} ${geist.className}`}>
            <Link href="/order-online" className={styles.button}>
              Order Online
            </Link>
            <Link href="/reservations" className={styles.button} target="_blank" rel="noopener">
              Reservations
            </Link>
            <Link href="/menu" className={styles.button}>
              View Menu
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
