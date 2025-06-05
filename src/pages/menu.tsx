import { useEffect, useRef, useState } from 'react';

import { GetStaticProps } from 'next';
import Image from 'next/image';

import { MenuData, MenuItemState } from '@/types/menu';

import { margarine } from '@/config/fonts';

import BasicPageLayout from '@/components/BasicPageLayout';
import MenuCategorySwitcher from '@/components/MenuCategorySwitcher';
import MenuItem from '@/components/MenuItem';
import MenuSections from '@/components/MenuSections';
import ScrollToTop from '@/components/ScrollToTop';

import { getMainMenus, imageLoader } from '@/utils/menu';
import { loadMenuData } from '@/utils/menu_static';

import styles from '@/styles/Menu.module.css';

interface MenuPageProps {
  menuData: MenuData;
}

export default function Menu({ menuData }: MenuPageProps) {
  // Add tab state for Brunch/Dinner
  const [selectedTab, setSelectedTab] = useState<'Brunch' | 'Dinner'>('Brunch');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [focusedItemIndex, setFocusedItemIndex] = useState<number>(-1);
  const [itemStates, setItemStates] = useState<Record<string, MenuItemState>>({});
  const navRef = useRef<HTMLElement>(null);
  const menuItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const categoryRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  // Separate Dinner and Brunch menus
  const dinnerMenu = menuData.menus.find((menu) => menu.name === 'Dinner');
  const brunchMenus = menuData.menus.filter(
    (menu) => menu.name !== 'Dinner' && menu.groups.length === 1
  );

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
  // const menus = getMainMenus(menuData);
  // Calculate total number of menu items for keyboard navigation
  const menus = selectedTab === 'Dinner' && dinnerMenu ? [dinnerMenu] : brunchMenus;
  const totalMenuItems = menus.reduce((total, menu) => {
    return total + menu.groups.reduce((groupTotal, group) => groupTotal + group.items.length, 0);
  }, 0);

  const isDinner = selectedTab === 'Dinner' && dinnerMenu;
  // Compute category options for MenuCategorySwitcher
  const categoryOptions = isDinner
    ? dinnerMenu.groups.map((g) => ({ key: g.guid, label: g.name }))
    : brunchMenus.map((m) => ({ key: m.guid, label: m.name }));

  // Compute sections and getItems for MenuSections
  const sections = isDinner
    ? dinnerMenu.groups
    : brunchMenus.map((m) => ({ ...m, items: m.groups[0].items }));
  const getItems = isDinner ? (g: any) => g.items : (m: any) => m.items;

  return (
    <BasicPageLayout title="Menu" heading="Our Menu" intro="Explore our delicious offerings">
      <div className={styles.menuContainer}>
        {/* Top-level tab navigation */}
        <div className={styles.tabNav} role="tablist" aria-label="Menu type">
          <button
            className={`${styles.tabButton} ${selectedTab === 'Brunch' ? styles.activeTab : ''}`}
            onClick={() => {
              setSelectedTab('Brunch');
              setSelectedCategory(null);
            }}
            role="tab"
            aria-selected={selectedTab === 'Brunch'}
            tabIndex={selectedTab === 'Brunch' ? 0 : -1}
          >
            Brunch
          </button>
          <button
            className={`${styles.tabButton} ${selectedTab === 'Dinner' ? styles.activeTab : ''}`}
            onClick={() => {
              setSelectedTab('Dinner');
              setSelectedCategory(null);
            }}
            role="tab"
            aria-selected={selectedTab === 'Dinner'}
            tabIndex={selectedTab === 'Dinner' ? 0 : -1}
          >
            Dinner
          </button>
        </div>
        {/* Category navigation */}
        <MenuCategorySwitcher
          options={categoryOptions}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
          navRef={navRef}
          onKeyDown={handleKeyDown}
        />
        <div id="menu-items" className={styles.menuContent} role="tabpanel" aria-label="Menu items">
          <MenuSections
            sections={sections}
            selected={selectedCategory}
            getItems={getItems}
            itemStates={itemStates}
            menuItemsRef={menuItemsRef}
            observerRef={observerRef}
            handleImageLoad={handleImageLoad}
            handleMenuItemKeyDown={handleMenuItemKeyDown}
            totalMenuItems={totalMenuItems}
            categoryRefs={categoryRefs}
          />
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
