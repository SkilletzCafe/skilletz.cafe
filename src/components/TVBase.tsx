import { useCallback, useEffect, useState } from 'react';

import Image from 'next/image';

import { MenuItem } from '@/types/menu';

import { margarine } from '@/config/fonts';

import { shuffleArray } from '@/utils/algo';
import { imageLoader } from '@/utils/menu';

import baseStyles from '@/styles/TVBase.module.css';

interface TVBaseProps {
  items: MenuItem[];
  logoPath: string;
  logoAlt: string;
  logoWidth?: number;
  logoHeight?: number;
  minDelayMillis?: number;
  maxDelayMillis?: number;
  defaultDelayMillis?: number;
}

const MIN_DELAY_MILLIS = 3000; // 3 seconds minimum
const MAX_DELAY_MILLIS = 30000; // 30 seconds maximum
const DELAY_STEP_MILLIS = 1000; // 1 second increments
const DEFAULT_DELAY_MILLIS = 5000; // 5 seconds default

export const TVBase = ({
  items,
  logoPath,
  logoAlt,
  logoWidth = 240,
  logoHeight = 70,
  minDelayMillis = MIN_DELAY_MILLIS,
  maxDelayMillis = MAX_DELAY_MILLIS,
  defaultDelayMillis = DEFAULT_DELAY_MILLIS,
}: TVBaseProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDelay, setTransitionDelay] = useState(defaultDelayMillis);
  const [shuffledItems, setShuffledItems] = useState<MenuItem[]>([]);

  // Shuffle items on mount
  useEffect(() => {
    setShuffledItems(shuffleArray(items));
  }, [items]);

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

  const adjustDelay = useCallback(
    (amount: number) => {
      setTransitionDelay((current) => {
        const newDelay = current + amount;
        return Math.min(Math.max(newDelay, minDelayMillis), maxDelayMillis);
      });
    },
    [minDelayMillis, maxDelayMillis]
  );

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
    <div className={`${baseStyles.tvContainer} ${baseStyles.hideCursor}`}>
      {/* Static logo in top right - outside slide container to prevent flickering */}
      <div className={baseStyles.logo}>
        <Image
          src={logoPath}
          alt={logoAlt}
          width={logoWidth}
          height={logoHeight}
          style={{ objectFit: 'contain' }}
          loader={imageLoader}
          unoptimized
        />
      </div>

      {/* Slide container with content */}
      <div
        className={`${baseStyles.slide} ${isTransitioning ? baseStyles.transitioning : ''}`}
        key={currentItem.guid}
      >
        {currentItem.imageUrl && (
          <div className={baseStyles.imageContainer}>
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
            <div className={baseStyles.overlay} />
          </div>
        )}
        <div className={baseStyles.content}>
          <h1 className={`${baseStyles.title} ${margarine.className}`}>{currentItem.name}</h1>
          {currentItem.description && (
            <p className={baseStyles.description}>{currentItem.description}</p>
          )}
          <p className={baseStyles.price}>${currentItem.price.toFixed(2)}</p>
          <p className={baseStyles.delay}>Transition delay: {transitionDelay / 1000}s</p>
        </div>
      </div>
    </div>
  );
};
