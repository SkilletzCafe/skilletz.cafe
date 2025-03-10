import { useEffect } from 'react';

import { SERVICES } from '@/config';

import BasicPageLayout from '@/components/BasicPageLayout';

import styles from '@/styles/BasicPage.module.css';

export default function Catering() {
  useEffect(() => {
    // Redirect after component mounts
    window.location.href = SERVICES.catering.url;
  }, []);

  return (
    <BasicPageLayout
      title="Catering"
      heading="Catering"
      intro="Redirecting you to our catering menu..."
    >
      <div className={styles.card}>
        <a
          href={SERVICES.catering.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          View Catering Menu
        </a>
      </div>
    </BasicPageLayout>
  );
}
