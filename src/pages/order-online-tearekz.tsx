import { useEffect } from 'react';

import { ORDERING_PARTNERS } from '@/config/orderingPartners';

import { BasicPageLayout } from '@/components/BasicPageLayout';

import { trackOutboundClick } from '@/utils/analytics';

import styles from '@/styles/BasicPage.module.css';

export default function OrderOnlineTeaRekz() {
  const toastPartner = ORDERING_PARTNERS.find((partner) => partner.key === 'toast');
  const orderUrl = toastPartner?.url || 'https://order.toasttab.com/online/skilletz-cafe';

  useEffect(() => {
    trackOutboundClick({
      destination: orderUrl,
      label: 'order_online:tearekz_redirect',
    });
    window.location.href = orderUrl;
  }, [orderUrl]);

  return (
    <BasicPageLayout
      title="Order Online - Tea Rek'z"
      heading="Order Online - Tea Rek'z"
      intro="Redirecting you to our online ordering system..."
    >
      <div className={styles.card}>
        <a
          href={orderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
          onClick={() =>
            trackOutboundClick({
              destination: orderUrl,
              label: 'order_online:tearekz_link',
            })
          }
        >
          Order Tea-Rek&apos;z Online
        </a>
      </div>
    </BasicPageLayout>
  );
}
