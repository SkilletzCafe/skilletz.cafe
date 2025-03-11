import { BUSINESS, FULL_ADDRESS, SERVICES, SOCIAL_MEDIA } from '@/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { margarine } from '@/config/fonts';

import { useTheme } from '@/context/ThemeContext';

import { createGoogleMapsUrl } from '@/utils/urls';

import styles from '@/styles/Layout.module.css';

export default function Footer() {
  const { theme, toggleTheme } = useTheme();
  const currentYear = new Date().getFullYear();
  const copyrightYears =
    currentYear > BUSINESS.founding.year ? `${BUSINESS.founding.year}–${currentYear}` : currentYear;

  // Get social media entries in the desired order
  const socialMediaEntries = Object.entries(SOCIAL_MEDIA);

  // Get service entries in the desired order
  const serviceEntries = Object.entries(SERVICES);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3 className={margarine.className}>Location & Hours</h3>
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
          </p>
        </div>

        <div className={styles.footerSection}>
          <h3 className={margarine.className}>Connect With Us</h3>
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
        </div>

        <div className={styles.footerSection}>
          <h3 className={margarine.className}>Quick Links</h3>
          {serviceEntries.map(([key, { url, label }]) => (
            <a key={key} href={url} target="_blank" rel="noopener noreferrer">
              {label}
            </a>
          ))}
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
