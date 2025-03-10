import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { BUSINESS, PAGES, SERVICES } from '@/config';

import { geist, margarine } from '@/config/fonts';

import { useTheme } from '@/context/ThemeContext';

import { createPhoneUrl } from '@/utils/urls';

import styles from '@/styles/Layout.module.css';

import MobileMenu from './MobileMenu';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logoSrc =
    theme === 'dark'
      ? '/images/logos/skilletz_logo_dark_mode_blue_flame_transparent.png'
      : '/images/logos/skilletz_logo_colored_flames.png';

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link
          href={PAGES.home.path}
          className={styles.logo}
          aria-label={`${BUSINESS.name} - Return to Home`}
        >
          <Image
            src={logoSrc}
            alt={`${BUSINESS.name} Logo`}
            title={`${BUSINESS.name} - ${BUSINESS.branding.slogan}`}
            width={200}
            height={60}
            priority
            loading="eager"
            quality={100}
            loader={({ src }) => src}
          />
        </Link>
        <nav className={`${styles.nav} ${margarine.className} ${styles.desktopNav}`}>
          {Object.values(PAGES)
            .filter((page) => page.showInNav)
            .map((page) => (
              <Link
                key={page.path}
                href={page.path}
                {...(page.openInNewTab && {
                  target: '_blank',
                  rel: 'noopener noreferrer',
                })}
              >
                {page.name}
              </Link>
            ))}
        </nav>
        <div className={`${styles.headerActions} ${geist.className}`}>
          <div className={styles.phone}>
            <a href={createPhoneUrl(BUSINESS.location.phone)}>{BUSINESS.location.phone}</a>
          </div>
          <a
            href={SERVICES.doordash.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.orderButton}
          >
            Order Online
          </a>
          <button
            className={styles.hamburgerButton}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
}
