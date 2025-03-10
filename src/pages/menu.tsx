import { useEffect } from 'react';

import { SERVICES } from '@/config';

import BasicPageLayout from '@/components/BasicPageLayout';

import styles from '@/styles/BasicPage.module.css';

export default function Menu() {
  useEffect(() => {
    // Redirect after component mounts
    window.location.href = SERVICES.doordash.url;
  }, []);

  return (
    <BasicPageLayout
      title="Menu"
      heading="Menu"
      intro="Redirecting you to our menu on DoorDash..."
    >
      <div className={styles.card}>
        <a
          href={SERVICES.doordash.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          View Menu on DoorDash
        </a>
      </div>
    </BasicPageLayout>
  );
}
