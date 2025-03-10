import { useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone,
  faLocationDot,
  faClock,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { PAGES, BUSINESS, SOCIAL_MEDIA } from '@/config';
import { margarine, geist } from '@/config/fonts';
import { createPhoneUrl, createGoogleMapsUrl } from '@/utils/urls';
import styles from '@/styles/MobileMenu.module.css';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.getElementById('mobile-menu');
      if (menu && !menu.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent scrolling when menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div id="mobile-menu" className={styles.menu}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <nav className={`${styles.nav} ${margarine.className}`}>
          {Object.values(PAGES)
            .filter((page) => page.showInNav)
            .map((page) => (
              <Link
                key={page.path}
                href={page.path}
                onClick={onClose}
                {...(page.openInNewTab && {
                  target: '_blank',
                  rel: 'noopener noreferrer',
                })}
              >
                {page.name}
              </Link>
            ))}
        </nav>

        <div className={`${styles.info} ${geist.className}`}>
          <div className={styles.infoSection}>
            <div className={styles.infoItem}>
              <FontAwesomeIcon icon={faLocationDot} />
              <a
                href={createGoogleMapsUrl(
                  BUSINESS.name,
                  BUSINESS.location.fullAddress
                )}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.infoItem}
              >
                <address>
                  {BUSINESS.location.address}
                  <br />
                  {BUSINESS.location.city}, {BUSINESS.location.state}{' '}
                  {BUSINESS.location.zip}
                </address>
              </a>
            </div>

            <div className={styles.infoItem}>
              <FontAwesomeIcon icon={faClock} />
              <div>
                <p>{BUSINESS.hours.weekday.days}</p>
                <p>
                  {BUSINESS.hours.weekday.open} - {BUSINESS.hours.weekday.close}
                </p>
                <p>{BUSINESS.hours.weekend.days}</p>
                <p>
                  {BUSINESS.hours.weekend.open} - {BUSINESS.hours.weekend.close}
                </p>
              </div>
            </div>

            <a
              href={createPhoneUrl(BUSINESS.location.phone)}
              className={styles.infoItem}
            >
              <FontAwesomeIcon icon={faPhone} />
              <span>{BUSINESS.location.phone}</span>
            </a>

            <a
              href={`mailto:${BUSINESS.contact.email}`}
              className={styles.infoItem}
            >
              <FontAwesomeIcon icon={faEnvelope} />
              <span>{BUSINESS.contact.email}</span>
            </a>
          </div>

          <div className={styles.socialLinks}>
            {Object.values(SOCIAL_MEDIA).map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                title={social.title}
              >
                <FontAwesomeIcon icon={social.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
