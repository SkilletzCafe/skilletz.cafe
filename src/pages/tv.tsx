import { useCallback, useEffect, useState } from 'react';

import { GetStaticProps } from 'next';
import Image from 'next/image';

import { MenuItem } from '@/types/menu';

import { margarine } from '@/config/fonts';

import { shuffleArray } from '@/utils/algo';
import { getFeaturedItems, imageLoader } from '@/utils/menu';
import { loadMenuData } from '@/utils/menu_static';

import styles from '@/styles/TV.module.css';

interface TVPageProps {
  featuredItems: MenuItem[];
}

const MIN_DELAY_MILLIS = 3000; // 3 seconds minimum
const MAX_DELAY_MILLIS = 30000; // 30 seconds maximum
const DELAY_STEP_MILLIS = 1000; // 1 second increments
const DEFAULT_DELAY_MILLIS = 5000; // 5 seconds default

export default function TV({ featuredItems }: TVPageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDelay, setTransitionDelay] = useState(DEFAULT_DELAY_MILLIS);
  const [shuffledItems, setShuffledItems] = useState<MenuItem[]>([]);

  // Shuffle items on mount
  useEffect(() => {
    setShuffledItems(shuffleArray(featuredItems));
  }, [featuredItems]);

  const goToNext = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((current) => (current + 1) % shuffledItems.length);
      setIsTransitioning(false);
    }, 1000); // Match this with CSS transition duration
  }, [shuffledItems.length]);

  const goToPrevious = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((current) => (current - 1 + shuffledItems.length) % shuffledItems.length);
      setIsTransitioning(false);
    }, 1000);
  }, [shuffledItems.length]);

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

  const currentItem = shuffledItems[currentIndex];

  if (!currentItem) return null;

  return (
    <div className={`${styles.tvContainer} ${styles.hideCursor}`}>
      <div
        className={`${styles.slide} ${isTransitioning ? styles.transitioning : ''}`}
        key={currentItem.guid}
      >
        {currentItem.imageUrl && (
          <div className={styles.imageContainer}>
            <Image
              src={currentItem.imageUrl}
              alt={currentItem.name}
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
              priority
              loader={imageLoader}
              unoptimized
            />
            <div className={styles.overlay} />
          </div>
        )}
        <div className={styles.content}>
          <h1 className={`${styles.title} ${margarine.className}`}>{currentItem.name}</h1>
          {currentItem.description && (
            <p className={styles.description}>{currentItem.description}</p>
          )}
          <p className={styles.price}>${currentItem.price.toFixed(2)}</p>
          <p className={styles.delay}>Transition delay: {transitionDelay / 1000}s</p>
        </div>
      </div>
      <div className={styles.logo}>
        <Image
          src="/images/logos/skilletz_logo_dark_mode_blue_flame_transparent.png"
          alt="Skilletz Logo"
          width={240}
          height={70}
          style={{ objectFit: 'contain' }}
          loader={imageLoader}
          unoptimized
        />
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<TVPageProps> = async () => {
  const menuData = loadMenuData();
  const featuredItems = getFeaturedItems(menuData);

  return {
    props: {
      featuredItems,
    },
  };
};
