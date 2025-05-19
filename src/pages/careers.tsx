import { useEffect } from 'react';

import { SERVICES } from '@/config/social';

import BasicPageLayout from '@/components/BasicPageLayout';

import styles from '@/styles/BasicPage.module.css';

export default function Careers() {
  useEffect(() => {
    // Redirect after component mounts
    window.location.href = SERVICES.careers.url;
  }, []);

  return (
    <BasicPageLayout
      title="Careers"
      heading="Careers"
      intro="Redirecting you to our careers page..."
    >
      <div className={styles.card}>
        <a
          href={SERVICES.careers.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Go to Careers
        </a>
      </div>
    </BasicPageLayout>
  );
}
