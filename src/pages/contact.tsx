import { BUSINESS } from '@/config';
import { faClock, faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import BasicPageLayout from '@/components/BasicPageLayout';

import { emailUtils } from '@/utils/email';
import { createGoogleMapsUrl, createPhoneUrl } from '@/utils/urls';

import styles from '@/styles/BasicPage.module.css';

export default function Contact() {
  const obfuscatedEmail = emailUtils.getObfuscatedEmail(BUSINESS.contact.email);

  return (
    <BasicPageLayout
      title="Contact Us"
      heading="Contact Us"
      intro="We'd love to hear from you! Get in touch with us through any of these methods:"
    >
      <div className={styles.card}>
        <FontAwesomeIcon icon={faPhone} className={styles.icon} />
        <h2>Phone</h2>
        <p>Call us for reservations or questions:</p>
        <a href={createPhoneUrl(BUSINESS.location.phone)} className={styles.link}>
          {BUSINESS.location.phone}
        </a>
      </div>

      <div className={styles.card}>
        <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
        <h2>Email</h2>
        <p>Send us a message:</p>
        <a
          href={`mailto:${BUSINESS.contact.email}`}
          className={styles.link}
          dangerouslySetInnerHTML={{ __html: obfuscatedEmail }}
        />
      </div>

      <div className={styles.card}>
        <FontAwesomeIcon icon={faLocationDot} className={styles.icon} />
        <h2>Location</h2>
        <p>Visit us at:</p>
        <a
          href={createGoogleMapsUrl(BUSINESS.name, BUSINESS.location.fullAddress)}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          {BUSINESS.location.fullAddress}
        </a>
      </div>

      <div className={styles.card}>
        <FontAwesomeIcon icon={faClock} className={styles.icon} />
        <h2>Hours</h2>
        <p>{BUSINESS.hours.weekday.days}:</p>
        <p className={styles.hours}>
          {BUSINESS.hours.weekday.open} - {BUSINESS.hours.weekday.close}
        </p>
        <p>{BUSINESS.hours.weekend.days}:</p>
        <p className={styles.hours}>
          {BUSINESS.hours.weekend.open} - {BUSINESS.hours.weekend.close}
        </p>
      </div>
    </BasicPageLayout>
  );
}
