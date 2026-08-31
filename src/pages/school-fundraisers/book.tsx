import { useEffect } from 'react';

import { SERVICES } from '@/config';

import { BasicPageLayout } from '@/components/BasicPageLayout';

import { trackOutboundClick } from '@/utils/analytics';

import styles from '@/styles/BasicPage.module.css';

const bookingUrl = SERVICES.schoolFundraiserBooking;

export default function SchoolFundraiserBookingRedirect() {
  useEffect(() => {
    let fallbackId: number | undefined;
    let hasRedirected = false;

    const redirectToBookingCalendar = () => {
      if (fallbackId !== undefined) {
        window.clearTimeout(fallbackId);
      }

      if (hasRedirected) {
        return;
      }

      hasRedirected = true;
      window.location.href = bookingUrl;
    };

    const isTracked = trackOutboundClick({
      destination: bookingUrl,
      eventTimeout: 1000,
      label: 'school_fundraiser:booking_redirect',
      onComplete: redirectToBookingCalendar,
    });

    if (!isTracked) {
      redirectToBookingCalendar();
      return undefined;
    }

    if (hasRedirected) {
      return undefined;
    }

    fallbackId = window.setTimeout(redirectToBookingCalendar, 1200);

    return () => {
      if (fallbackId !== undefined) {
        window.clearTimeout(fallbackId);
      }
    };
  }, []);

  return (
    <BasicPageLayout
      title="Book a School Fundraiser Night"
      heading="Book a School Fundraiser Night"
      intro="Redirecting you to our school fundraiser booking calendar..."
    >
      <div className={styles.card}>
        <p>If you are not redirected automatically, use the button below.</p>
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
          onClick={() =>
            trackOutboundClick({
              destination: bookingUrl,
              label: 'school_fundraiser:booking_link',
            })
          }
        >
          Open School Fundraiser Booking Calendar
        </a>
      </div>
    </BasicPageLayout>
  );
}
