import { ReactNode } from 'react';

import { margarine } from '@/config/fonts';

import Layout from '@/components/Layout';

import styles from '@/styles/BasicPage.module.css';

interface BasicPageLayoutProps {
  title: string;
  heading: string;
  intro?: string | ReactNode;
  children?: ReactNode;
}

export const BasicPageLayout = ({ title, heading, intro, children }: BasicPageLayoutProps) => {
  return (
    <Layout title={title}>
      <div className={styles.page}>
        <div className={styles.container}>
          <h1 className={margarine.className}>{heading}</h1>
          {intro && <p className={styles.intro}>{intro}</p>}
          {children && <div className={styles.contentGrid}>{children}</div>}
        </div>
      </div>
    </Layout>
  );
};
