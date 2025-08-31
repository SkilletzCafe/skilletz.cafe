import { useCallback, useEffect, useState } from 'react';

import { GetStaticProps } from 'next';

import { TeaRekzMenu, TeaRekzSection } from '@/types/tearekz';

import { geist, margarine } from '@/config/fonts';

import { shuffleArray } from '@/utils/algo';

import baseStyles from '@/styles/TVBase.module.css';
import styles from '@/styles/TVRekz.module.css';

interface TVRekzPageProps {
  menu: TeaRekzMenu;
}

const MIN_DELAY_MILLIS = 5000; // 5 seconds minimum
const MAX_DELAY_MILLIS = 30000; // 30 seconds maximum
const DELAY_STEP_MILLIS = 1000; // 1 second increments
const DEFAULT_DELAY_MILLIS = 8000; // 8 seconds default

export default function TVRekz({ menu }: TVRekzPageProps) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDelay, setTransitionDelay] = useState(DEFAULT_DELAY_MILLIS);
  const [shuffledSections, setShuffledSections] = useState<TeaRekzSection[]>([]);

  // Shuffle sections on mount
  useEffect(() => {
    setShuffledSections(shuffleArray(menu.sections));
  }, [menu.sections]);

  const goToNext = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSectionIndex((current) => (current + 1) % shuffledSections.length);
      setIsTransitioning(false);
    }, 1000); // Match this with CSS transition duration
  }, [shuffledSections.length]);

  const goToPrevious = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSectionIndex(
        (current) => (current - 1 + shuffledSections.length) % shuffledSections.length
      );
      setIsTransitioning(false);
    }, 1000);
  }, [shuffledSections.length]);

  const adjustDelay = useCallback((amount: number) => {
    setTransitionDelay((current) => {
      const newDelay = current + amount;
      return Math.min(Math.max(newDelay, MIN_DELAY_MILLIS), MAX_DELAY_MILLIS);
    });
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
          goToNext();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case '+':
        case '=': // Also support = key since it's the same key as + without shift
          adjustDelay(DELAY_STEP_MILLIS);
          break;
        case '-':
        case '_': // Also support _ key since it's the same key as - without shift
          adjustDelay(-DELAY_STEP_MILLIS);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious, adjustDelay]);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(goToNext, transitionDelay);
    return () => clearInterval(timer);
  }, [transitionDelay, goToNext]);

  // Prevent screen saver and display sleep
  useEffect(() => {
    const preventSleep = async () => {
      try {
        // @ts-ignore - TypeScript doesn't know about wake lock API yet
        const wakeLock = await navigator.wakeLock.request('screen');
        return () => wakeLock.release();
      } catch (err) {
        console.log('Wake Lock not supported or failed:', err);
      }
    };

    preventSleep();
  }, []);

  // Reload page every 30 minutes to get fresh content
  useEffect(() => {
    const RELOAD_INTERVAL_MILLIS = 30 * 60 * 1000; // 30 minutes
    const reloadTimer = setInterval(() => {
      window.location.reload();
    }, RELOAD_INTERVAL_MILLIS);

    return () => clearInterval(reloadTimer);
  }, []);

  const currentSection = shuffledSections[currentSectionIndex];

  if (!currentSection) return null;

  return (
    <div className={`${baseStyles.tvContainer} ${baseStyles.hideCursor}`}>
      <div
        className={`${baseStyles.slide} ${isTransitioning ? baseStyles.transitioning : ''}`}
        key={currentSection.name}
      >
        <div className={baseStyles.content}>
          {/* Header with logo */}
          <div className={styles.header}>
            <div className={styles.logoSection}>
              <div className={styles.logoIcon}>{menu.logo.icon}</div>
              <div className={styles.logoText}>
                <h1 className={`${styles.logoTitle} ${margarine.className}`}>{menu.logo.name}</h1>
                <p className={`${styles.logoSubtitle} ${geist.className}`}>{menu.logo.subtitle}</p>
              </div>
            </div>
          </div>

          {/* Section content */}
          <div className={styles.sectionContent}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIcon} style={{ color: currentSection.color }}>
                {currentSection.icon}
              </span>
              <h2
                className={`${styles.sectionTitle} ${margarine.className}`}
                style={{ color: currentSection.color }}
              >
                {currentSection.name}
              </h2>
            </div>

            {currentSection.description && (
              <p className={`${styles.sectionDescription} ${geist.className}`}>
                {currentSection.description}
              </p>
            )}

            <div className={styles.menuItems}>
              {currentSection.items.map((item, index) => (
                <div key={index} className={styles.menuItem}>
                  <div className={styles.itemHeader}>
                    {item.icon && (
                      <span className={styles.itemIcon} style={{ color: currentSection.color }}>
                        {item.icon}
                      </span>
                    )}
                    <h3 className={`${styles.itemName} ${geist.className}`}>{item.name}</h3>
                    {item.price && (
                      <span className={styles.itemPrice}>${item.price.toFixed(2)}</span>
                    )}
                    {currentSection.basePrice && !item.price && (
                      <span className={styles.itemPrice}>
                        ${currentSection.basePrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <p className={`${styles.itemDescription} ${geist.className}`}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Customization options for certain sections */}
            {(currentSection.name === 'Milk Teas' ||
              currentSection.name === 'Fresh Teas' ||
              currentSection.name === 'Fruit Teas') && (
              <div className={styles.customization}>
                <div className={styles.customizationOption}>
                  <span className={styles.customizationIcon}>{menu.customization.ice.icon}</span>
                  <span className={styles.customizationLabel}>Ice:</span>
                  <span className={styles.customizationValues}>
                    {menu.customization.ice.options.join(' • ')}
                  </span>
                </div>
                <div className={styles.customizationOption}>
                  <span className={styles.customizationIcon}>
                    {menu.customization.sweetness.icon}
                  </span>
                  <span className={styles.customizationLabel}>Sweetness:</span>
                  <span className={styles.customizationValues}>
                    {menu.customization.sweetness.options.join(' • ')}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controls and info */}
      <div className={baseStyles.delay}>Transition delay: {transitionDelay / 1000}s</div>

      {/* Section indicator */}
      <div className={styles.sectionIndicator}>
        {shuffledSections.map((section, index) => (
          <div
            key={section.name}
            className={`${styles.indicatorDot} ${index === currentSectionIndex ? styles.active : ''}`}
            style={{ backgroundColor: section.color }}
          />
        ))}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<TVRekzPageProps> = async () => {
  // Import the menu data
  const menuData = await import('@/data/menu/processed/tearekz.json');

  return {
    props: {
      menu: menuData.default,
    },
  };
};
