import { useEffect } from 'react';

import { ORDERING_PARTNERS } from '@/config/orderingPartners';

import { BasicPageLayout } from '@/components/BasicPageLayout';

import styles from '@/styles/BasicPage.module.css';

export default function OrderOnlineTeaRekz() {
  const toastPartner = ORDERING_PARTNERS.find((partner) => partner.key === 'toast');
  const orderUrl = toastPartner?.url || 'https://order.toasttab.com/online/skilletz-cafe';

  useEffect(() => {
    // Redirect after component mounts
    window.location.href = orderUrl;
  }, [orderUrl]);

  return (
    <BasicPageLayout
      title="Order Online - Tea Rek'z"
      heading="Order Online - Tea Rek'z"
      intro="Redirecting you to our online ordering system..."
    >
      <div className={styles.card}>
        <a href={orderUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
          Order Tea-Rek&apos;z Online
        </a>
      </div>
    </BasicPageLayout>
  );
}
