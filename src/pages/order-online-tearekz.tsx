import { useEffect } from 'react';

import { ORDERING_PARTNERS } from '@/config/orderingPartners';

import { BasicPageLayout } from '@/components/BasicPageLayout';

import { trackOutboundClick } from '@/utils/analytics';

import styles from '@/styles/BasicPage.module.css';

export default function OrderOnlineTeaRekz() {
  const toastPartner = ORDERING_PARTNERS.find((partner) => partner.key === 'toast');
  const orderUrl = toastPartner?.url || 'https://order.toasttab.com/online/skilletz-cafe';

  useEffect(() => {
    let fallbackId: number | undefined;
    let hasRedirected = false;

    const redirectToOrdering = () => {
      if (fallbackId !== undefined) {
        window.clearTimeout(fallbackId);
      }

      if (hasRedirected) {
        return;
      }

      hasRedirected = true;
      window.location.href = orderUrl;
    };

    const isTracked = trackOutboundClick({
      destination: orderUrl,
      eventTimeout: 1000,
      label: 'order_online:tearekz_redirect',
      onComplete: redirectToOrdering,
    });

    if (!isTracked) {
      redirectToOrdering();
      return undefined;
    }

    if (hasRedirected) {
      return undefined;
    }

    fallbackId = window.setTimeout(redirectToOrdering, 1200);

    return () => {
      if (fallbackId !== undefined) {
        window.clearTimeout(fallbackId);
      }
    };
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
