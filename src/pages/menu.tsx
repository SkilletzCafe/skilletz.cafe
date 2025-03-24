import { useEffect, useRef, useState } from 'react';

import { GetStaticProps } from 'next';
import Image from 'next/image';

import { MenuData, MenuItemState } from '@/types/menu';

import { margarine } from '@/config/fonts';

import BasicPageLayout from '@/components/BasicPageLayout';
import MenuItem from '@/components/MenuItem';
import ScrollToTop from '@/components/ScrollToTop';

import { getMainMenus, imageLoader } from '@/utils/menu';
import { loadMenuData } from '@/utils/menu_static';

import styles from '@/styles/Menu.module.css';

interface MenuPageProps {
  menuData: MenuData;
}

export default function Menu({ menuData }: MenuPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [focusedItemIndex, setFocusedItemIndex] = useState<number>(-1);
  const [itemStates, setItemStates] = useState<Record<string, MenuItemState>>({});
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
      navRef.current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      scrollNav('left');
    } else if (e.key === 'ArrowRight') {
      scrollNav('right');
    }
  };

  const handleMenuItemKeyDown = (e: React.KeyboardEvent, index: number, totalItems: number) => {
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

  // Get main menus (excluding "Other")
  const menus = getMainMenus(menuData);

  // Calculate total number of menu items for keyboard navigation
  const totalMenuItems = menus.reduce((total, menu) => {
    return total + menu.groups.reduce((groupTotal, group) => groupTotal + group.items.length, 0);
  }, 0);

  return (
    <BasicPageLayout title="Menu" heading="Our Menu" intro="Explore our delicious offerings">
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
            className={`${styles.categoryButton} ${!selectedCategory ? styles.active : ''}`}
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

        <div id="menu-items" className={styles.menuContent} role="tabpanel" aria-label="Menu items">
          {menus
            .filter((menu) => !selectedCategory || menu.name === selectedCategory)
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
                <div className={styles.menuGrid} role="list" aria-label={`${menu.name} menu items`}>
                  {menu.groups.map((group) =>
                    group.items.map((item, itemIndex) => {
                      const itemState = itemStates[item.guid] || {
                        isVisible: false,
                        isLoaded: true,
                      };

                      // Set up observer for this item
                      const setItemRef = (el: HTMLDivElement | null) => {
                        menuItemsRef.current[itemIndex] = el;
                        if (el && observerRef.current) {
                          observerRef.current.observe(el);
                          // Set the item index for staggered animation
                          el.style.setProperty('--item-index', itemIndex.toString());
                        }
                      };

                      return (
                        <MenuItem
                          key={item.guid}
                          item={item}
                          index={itemIndex}
                          totalItems={totalMenuItems}
                          itemState={itemState}
                          onImageLoad={handleImageLoad}
                          onKeyDown={handleMenuItemKeyDown}
                          setRef={setItemRef}
                        />
                      );
                    })
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
  const menuData = loadMenuData();

  return {
    props: {
      menuData,
    },
  };
};
