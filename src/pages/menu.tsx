import { GetStaticProps } from 'next';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import fs from 'fs';
import path from 'path';

import BasicPageLayout from '@/components/BasicPageLayout';
import ScrollToTop from '@/components/ScrollToTop';
import { margarine } from '@/config/fonts';

import styles from '@/styles/Menu.module.css';

interface MenuItem {
  name: string;
  guid: string;
  description: string;
  price: number;
  imageFilename: string | null;
  isPopular?: boolean;
}

interface MenuGroup {
  name: string;
  guid: string;
  description: string;
  items: MenuItem[];
}

interface Menu {
  name: string;
  guid: string;
  description: string;
  groups: MenuGroup[];
}

interface MenuData {
  menus: Menu[];
  menuItemImages: Record<string, string>;
}

interface ImageMapping {
  images: string[];
  category: string;
  item_name: string;
}

interface ImageMappings {
  item_images: Record<string, ImageMapping>;
  metadata: {
    last_updated: string;
    version: string;
    image_root: string;
  };
}

interface MenuPageProps {
  menuData: MenuData;
  imageMappings: ImageMappings;
}

interface MenuItemState {
  isVisible: boolean;
  isLoaded: boolean;
}

export default function Menu({ menuData, imageMappings }: MenuPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [focusedItemIndex, setFocusedItemIndex] = useState<number>(-1);
  const [itemStates, setItemStates] = useState<Record<string, MenuItemState>>(
    {}
  );
  const navRef = useRef<HTMLElement>(null);
  const menuItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const categoryRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  // Set up intersection observer
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const itemId = entry.target.getAttribute('data-item-id');
          if (itemId) {
            setItemStates((prev) => ({
              ...prev,
              [itemId]: {
                ...prev[itemId],
                isVisible: entry.isIntersecting,
              },
            }));
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1,
      }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Add parallax effect to category headings
  useEffect(() => {
    const handleScroll = () => {
      categoryRefs.current.forEach((ref) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        const viewHeight = window.innerHeight;

        // Only apply effect when heading is in view
        if (rect.top < viewHeight && rect.bottom > 0) {
          const distance = rect.top - viewHeight / 2;
          const parallax = distance * 0.1; // Adjust this value to control parallax intensity
          ref.style.transform = `translateY(${parallax}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle image load completion
  const handleImageLoad = (itemId: string) => {
    setItemStates((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        isLoaded: true,
      },
    }));
  };

  const scrollNav = (direction: 'left' | 'right') => {
    if (navRef.current) {
      const scrollAmount = 200;
      navRef.current.scrollLeft +=
        direction === 'left' ? -scrollAmount : scrollAmount;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      scrollNav('left');
    } else if (e.key === 'ArrowRight') {
      scrollNav('right');
    }
  };

  const handleMenuItemKeyDown = (
    e: React.KeyboardEvent,
    index: number,
    totalItems: number
  ) => {
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = (index + 1) % totalItems;
        setFocusedItemIndex(nextIndex);
        menuItemsRef.current[nextIndex]?.focus();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = (index - 1 + totalItems) % totalItems;
        setFocusedItemIndex(prevIndex);
        menuItemsRef.current[prevIndex]?.focus();
        break;
    }
  };

  // Filter out the "Other" menu
  const menus = menuData.menus.filter((menu) => menu.name !== 'Other');

  const renderMenuItem = (
    item: MenuItem,
    index: number,
    totalItems: number
  ) => {
    const imageMapping = imageMappings.item_images[item.guid];
    const imagePath = imageMapping?.images[0];
    const itemState = itemStates[item.guid] || {
      isVisible: false,
      isLoaded: true,
    };

    // Set up observer for this item
    const setItemRef = (el: HTMLDivElement | null) => {
      menuItemsRef.current[index] = el;
      if (el && observerRef.current) {
        observerRef.current.observe(el);
        // Set the item index for staggered animation
        el.style.setProperty('--item-index', index.toString());
      }
    };

    return (
      <div
        key={item.guid}
        className={`${styles.menuItem} ${itemState.isLoaded ? styles.loaded : ''}`}
        role="article"
        aria-labelledby={`item-name-${item.guid}`}
        tabIndex={0}
        ref={setItemRef}
        data-item-id={item.guid}
        onKeyDown={(e) => handleMenuItemKeyDown(e, index, totalItems)}
      >
        {item.isPopular && (
          <div className={styles.itemBadge} aria-label="Popular item">
            Popular
          </div>
        )}
        <div className={styles.imageContainer}>
          {imagePath ? (
            <>
              {!itemState.isLoaded && (
                <div className={styles.imagePlaceholder} aria-hidden="true" />
              )}
              <Image
                src={`/${imagePath}`}
                alt={`Photo of ${item.name}`}
                width={1980}
                height={1080}
                className={`${styles.image} ${itemState.isLoaded ? styles.loaded : ''}`}
                onLoad={() => handleImageLoad(item.guid)}
                priority={index < 4}
              />
            </>
          ) : (
            <div
              className={styles.imagePlaceholder}
              aria-label="No image available"
            >
              <div className={styles.noImageIcon}>
                <span>No image available</span>
              </div>
            </div>
          )}
        </div>
        <div className={styles.itemDetails}>
          <div className={styles.itemHeader}>
            <h3 id={`item-name-${item.guid}`} className={styles.itemName}>
              {item.name}
            </h3>
            <span
              className={styles.price}
              aria-label={`Price: $${item.price.toFixed(2)}`}
            >
              ${item.price.toFixed(2)}
            </span>
          </div>
          {item.description && (
            <p
              className={styles.description}
              aria-label={`Description: ${item.description}`}
            >
              {item.description}
            </p>
          )}
        </div>
      </div>
    );
  };

  // Calculate total number of menu items for keyboard navigation
  const totalMenuItems = menus.reduce((total, menu) => {
    return (
      total +
      menu.groups.reduce(
        (groupTotal, group) => groupTotal + group.items.length,
        0
      )
    );
  }, 0);

  return (
    <BasicPageLayout
      title="Menu"
      heading="Our Menu"
      intro="Explore our delicious offerings"
    >
      <div className={styles.menuContainer}>
        <nav
          className={styles.categoryNav}
          ref={navRef}
          aria-label="Menu categories"
          role="tablist"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <button
            className={`${styles.categoryButton} ${
              !selectedCategory ? styles.active : ''
            }`}
            onClick={() => setSelectedCategory(null)}
            role="tab"
            aria-selected={!selectedCategory}
            aria-controls="menu-items"
          >
            All Categories
          </button>
          {menus.map((menu) => (
            <button
              key={menu.guid}
              className={`${styles.categoryButton} ${
                selectedCategory === menu.name ? styles.active : ''
              }`}
              onClick={() => setSelectedCategory(menu.name)}
              role="tab"
              aria-selected={selectedCategory === menu.name}
              aria-controls="menu-items"
            >
              {menu.name}
            </button>
          ))}
        </nav>

        <div
          id="menu-items"
          className={styles.menuContent}
          role="tabpanel"
          aria-label="Menu items"
        >
          {menus
            .filter(
              (menu) => !selectedCategory || menu.name === selectedCategory
            )
            .map((menu, index) => (
              <section
                key={menu.guid}
                className={styles.menuSection}
                aria-labelledby={`category-${menu.guid}`}
                style={{ '--section-index': index } as React.CSSProperties}
              >
                <h2
                  id={`category-${menu.guid}`}
                  className={`${styles.categoryTitle} ${margarine.className}`}
                  ref={(el) => {
                    categoryRefs.current[index] = el;
                  }}
                >
                  <span className={styles.categoryDecoration}>✦</span>
                  {menu.name}
                  <span className={styles.categoryDecoration}>✦</span>
                </h2>
                {menu.description && (
                  <p
                    className={styles.categoryDescription}
                    aria-label={`${menu.name} category description`}
                  >
                    {menu.description}
                  </p>
                )}
                <div
                  className={styles.menuGrid}
                  role="list"
                  aria-label={`${menu.name} menu items`}
                >
                  {menu.groups.map((group) =>
                    group.items.map((item, index) =>
                      renderMenuItem(item, index, totalMenuItems)
                    )
                  )}
                </div>
              </section>
            ))}
        </div>
      </div>
      <ScrollToTop />
    </BasicPageLayout>
  );
}

export const getStaticProps: GetStaticProps<MenuPageProps> = async () => {
  // Read menu data and image mappings
  const menuDataPath = path.join(
    process.cwd(),
    'src/data/menu/processed/menu.json'
  );
  const imageMappingsPath = path.join(
    process.cwd(),
    'src/data/menu/image_mappings.json'
  );

  const menuData: MenuData = JSON.parse(fs.readFileSync(menuDataPath, 'utf-8'));
  const imageMappings: ImageMappings = JSON.parse(
    fs.readFileSync(imageMappingsPath, 'utf-8')
  );

  return {
    props: {
      menuData,
      imageMappings,
    },
  };
};
