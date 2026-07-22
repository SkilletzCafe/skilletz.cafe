import Link from 'next/link';

import { BUSINESS, DOORDASH_STOREFRONT, FULL_ADDRESS, QUICK_LINKS, SOCIAL_MEDIA } from '@/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTheme } from '@hacktoolkit/nextjs-htk/context';
import { createGoogleMapsUrl } from '@hacktoolkit/nextjs-htk/utils';

import { margarine } from '@/config/fonts';

import { trackOutboundClick } from '@/utils/analytics';

import styles from '@/styles/Layout.module.css';

export default function Footer() {
  const { theme, toggleTheme } = useTheme();
  const currentYear = new Date().getFullYear();
  const copyrightYears =
    currentYear > BUSINESS.founding.year ? `${BUSINESS.founding.year}–${currentYear}` : currentYear;

  // Get social media entries in the desired order
  const socialMediaEntries = Object.entries(SOCIAL_MEDIA);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h2 className={margarine.className}>Location & Hours</h2>
          <p>
            <a
              href={createGoogleMapsUrl(BUSINESS.name, FULL_ADDRESS)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {FULL_ADDRESS}
            </a>
            <br />
            {BUSINESS.hours.weekday.days}: {BUSINESS.hours.weekday.open} -{' '}
            {BUSINESS.hours.weekday.close}
            <br />
            {BUSINESS.hours.weekend.days}: {BUSINESS.hours.weekend.open} -{' '}
            {BUSINESS.hours.weekend.close}
            <br />
            Breakfast until {BUSINESS.hours.weekend.breakfast_ends}, Dinner from{' '}
            {BUSINESS.hours.weekend.dinner_starts}
          </p>
        </div>

        <div className={styles.footerSection}>
          <h2 className={margarine.className}>Connect With Us</h2>
          <div className={styles.socialLinks}>
            {socialMediaEntries.map(([key, { url, label, icon, title }]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={title}
              >
                <FontAwesomeIcon icon={icon} />
              </a>
            ))}
          </div>
          <a
            href={DOORDASH_STOREFRONT.mobileAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mobileAppCard}
            onClick={() =>
              trackOutboundClick({
                destination: DOORDASH_STOREFRONT.mobileAppUrl,
                label: 'footer:mobile_app',
              })
            }
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={DOORDASH_STOREFRONT.mobileAppQrImagePath}
              alt="QR code to order Skillet'z Cafe in the DoorDash app"
              className={styles.mobileAppQr}
              loading="lazy"
            />
            <span className={styles.mobileAppCopy}>
              <strong>Order in the DoorDash app</strong>
              <span>Get Skillet&apos;z faster on iOS or Android</span>
            </span>
          </a>
        </div>

        <div className={styles.footerSection}>
          <h2 className={margarine.className}>Quick Links</h2>
          {QUICK_LINKS.map((link) => {
            const LinkComponent = link.isInternal ? Link : 'a';
            return (
              <LinkComponent
                key={link.label}
                href={link.href}
                className={styles.link}
                {...(link.target ? { target: link.target } : {})}
                {...(link.rel ? { rel: link.rel } : {})}
              >
                {link.label}
              </LinkComponent>
            );
          })}
        </div>
      </div>
      <div className={styles.copyright}>
        © {copyrightYears} {BUSINESS.name}. All rights reserved.
        <button
          onClick={toggleTheme}
          className={styles.themeToggle}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </footer>
  );
}
