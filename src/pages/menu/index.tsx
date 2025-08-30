import { useEffect, useRef, useState } from 'react';

import { GetStaticProps } from 'next';

import { MenuData, MenuItemState } from '@/types/menu';

import { margarine } from '@/config/fonts';

import { BasicPageLayout } from '@/components/BasicPageLayout';
import { RestaurantSchema } from '@/components/RestaurantSchema';
import { ScrollToTop } from '@/components/ScrollToTop';
import { MenuCategorySwitcher } from '@/components/menu/MenuCategorySwitcher';
import { MenuItem } from '@/components/menu/MenuItem';
import { MenuSections } from '@/components/menu/MenuSections';

import { getMainMenus, imageLoader } from '@/utils/menu';
import { loadMenuData } from '@/utils/menu_static';
import { getUrlParam } from '@/utils/urls';

import styles from '@/styles/Menu.module.css';

interface MenuPageProps {
  menuData: MenuData;
}

export default function Menu({ menuData }: MenuPageProps) {
  // Check for utm_campaign parameter to determine initial tab
  const getInitialTab = (): 'Brunch' | 'Happy Hour' | 'Dinner' => {
    let initialTab: 'Brunch' | 'Happy Hour' | 'Dinner' = 'Brunch';

    if (typeof window !== 'undefined') {
      const utmCampaign = getUrlParam('utm_campaign');
      if (utmCampaign && utmCampaign.toLowerCase().startsWith('dinner')) {
        initialTab = 'Dinner';
      } else if (utmCampaign && utmCampaign.toLowerCase().startsWith('happy')) {
        initialTab = 'Happy Hour';
      }
    }

    return initialTab;
  };

  // Add tab state for Brunch/Happy Hour/Dinner
  const [selectedTab, setSelectedTab] = useState<'Brunch' | 'Happy Hour' | 'Dinner'>(getInitialTab);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [focusedItemIndex, setFocusedItemIndex] = useState<number>(-1);
  const [itemStates, setItemStates] = useState<Record<string, MenuItemState>>({});
  const navRef = useRef<HTMLElement>(null);
  const menuItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const categoryRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  // Separate Dinner, Happy Hour, and Brunch menus
  const dinnerMenu = menuData.menus.find((menu) => menu.name === 'Dinner');
  const happyHourMenu = menuData.menus.find((menu) => menu.name === 'Happy Hour');
  const brunchMenus = menuData.menus.filter(
    (menu) => menu.name !== 'Dinner' && menu.name !== 'Happy Hour' && menu.groups.length === 1
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

  // Check for utm_campaign parameter changes and update tab accordingly
  useEffect(() => {
    const utmCampaign = getUrlParam('utm_campaign');
    if (utmCampaign && utmCampaign.toLowerCase().startsWith('dinner')) {
      setSelectedTab('Dinner');
    } else if (utmCampaign && utmCampaign.toLowerCase().startsWith('happy')) {
      setSelectedTab('Happy Hour');
    }
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
  const menus =
    selectedTab === 'Dinner' && dinnerMenu
      ? [dinnerMenu]
      : selectedTab === 'Happy Hour' && happyHourMenu
        ? [happyHourMenu]
        : brunchMenus;
  const totalMenuItems = menus.reduce((total, menu) => {
    return total + menu.groups.reduce((groupTotal, group) => groupTotal + group.items.length, 0);
  }, 0);

  const isDinner = selectedTab === 'Dinner' && dinnerMenu;
  const isHappyHour = selectedTab === 'Happy Hour' && happyHourMenu;
  // Compute category options for MenuCategorySwitcher
  const categoryOptions = isDinner
    ? dinnerMenu.groups
        .filter((g) => g.items && g.items.length > 0)
        .map((g) => ({ key: g.guid, label: g.name }))
    : isHappyHour
      ? happyHourMenu.groups
          .filter((g) => g.items && g.items.length > 0)
          .map((g) => ({ key: g.guid, label: g.name }))
      : brunchMenus
          .filter((m) => m.groups[0].items && m.groups[0].items.length > 0)
          .map((m) => ({ key: m.guid, label: m.name }));

  // Compute sections and getItems for MenuSections
  const sections = isDinner
    ? dinnerMenu.groups
    : isHappyHour
      ? happyHourMenu.groups
      : brunchMenus.map((m) => ({ ...m, items: m.groups[0].items }));
  const getItems = isDinner
    ? (g: any) =>
        g.name && g.name.startsWith('Daily Specials')
          ? g.items.filter((item: any) => item.name.startsWith('Soup of the Day'))
          : g.items
    : isHappyHour
      ? (g: any) => g.items
      : (m: any) =>
          m.name && m.name.startsWith('Daily Specials')
            ? m.items.filter((item: any) => item.name === 'Soup of the Day')
            : m.items;

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
            className={`${styles.tabButton} ${selectedTab === 'Happy Hour' ? styles.activeTab : ''}`}
            onClick={() => {
              setSelectedTab('Happy Hour');
              setSelectedCategory(null);
            }}
            role="tab"
            aria-selected={selectedTab === 'Happy Hour'}
            tabIndex={selectedTab === 'Happy Hour' ? 0 : -1}
          >
            Happy Hour
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
