import { useEffect } from 'react';

import { SERVICES } from '@/config/social';

import BasicPageLayout from '@/components/BasicPageLayout';

import styles from '@/styles/BasicPage.module.css';

export default function Reservations() {
  useEffect(() => {
    // Redirect after component mounts
    window.location.href = SERVICES.reservations.url;
  }, []);

  return (
    <BasicPageLayout
      title="Reservations"
      heading="Reservations"
      intro="Redirecting you to our reservations page..."
    >
      <div className={styles.card}>
        <a
          href={SERVICES.reservations.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Go to Reservations
        </a>
      </div>
    </BasicPageLayout>
  );
}
