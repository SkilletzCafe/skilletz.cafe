import { useEffect, useRef, useState } from 'react';

import { GetStaticProps } from 'next';

import { MenuData, MenuItemState, MenuOptionGroupsData } from '@/types/menu';

import { margarine } from '@/config/fonts';
import { MenuTab } from '@/config/menuTabs';

import { BasicPageLayout } from '@/components/BasicPageLayout';
import { RestaurantSchema } from '@/components/RestaurantSchema';
import { ScrollToTop } from '@/components/ScrollToTop';
import { MenuCategorySwitcher } from '@/components/menu/MenuCategorySwitcher';
import { MenuItem } from '@/components/menu/MenuItem';
import { MenuSections } from '@/components/menu/MenuSections';
import { MenuTabNavigation } from '@/components/menu/MenuTabNavigation';

import { getMainMenus, imageLoader } from '@/utils/menu';
import { loadMenuData, loadMenuOptionGroupsData } from '@/utils/menu_static';
import { getUrlParam } from '@/utils/urls';

import styles from '@/styles/Menu.module.css';

interface MenuPageProps {
  menuData: MenuData;
  menuOptionGroupsData: MenuOptionGroupsData;
}

export default function Menu({ menuData, menuOptionGroupsData }: MenuPageProps) {
  // Check for utm_campaign parameter to determine initial tab
  const getInitialTab = (): MenuTab => {
    let initialTab: MenuTab = 'Brunch';

    if (typeof window !== 'undefined') {
      const utmCampaign = getUrlParam('utm_campaign');
      if (utmCampaign && utmCampaign.toLowerCase().startsWith('dinner')) {
        initialTab = 'Dinner';
      } else if (utmCampaign && utmCampaign.toLowerCase().startsWith('happy')) {
        initialTab = 'Happy Hour';
      } else if (
        utmCampaign &&
        (utmCampaign.toLowerCase().startsWith('tea') ||
          utmCampaign.toLowerCase().startsWith('grabngo'))
      ) {
        initialTab = "Tea-Rek'z";
      }
    }

    return initialTab;
  };

  // Add tab state for Brunch/Happy Hour/Dinner/Tea-Rek'z
  const [selectedTab, setSelectedTab] = useState<MenuTab>(getInitialTab);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [focusedItemIndex, setFocusedItemIndex] = useState<number>(-1);
  const [itemStates, setItemStates] = useState<Record<string, MenuItemState>>({});
  const navRef = useRef<HTMLElement>(null);
  const menuItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const categoryRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  // Find the boba tea toppings option group
  const bobaToppingsGroup = menuOptionGroupsData.optionGroups.find(
    (group) => group.guid === '9145a88a-16f0-4a02-bccd-d227ed2e8f87'
  );

  // Separate menus in semantic order: Brunch, Happy Hour, Dinner, Drinks, Tea-Rek'z
  const brunchMenu = menuData.menus.find((menu) => menu.name === 'Brunch Thu-Sun');
  const happyHourMenu = menuData.menus.find((menu) => menu.name === 'Happy Hour');
  const dinnerMenu = menuData.menus.find((menu) => menu.name === 'Dinner');
  const drinksMenu = menuData.menus.find((menu) => menu.name === 'Drinks 🥤');
  const teaRekzMenu =
    menuData.menus.find((menu) => menu.name.startsWith("Tea-Rek'z") && menu.name.includes('Sun')) ||
    menuData.menus.find((menu) => menu.name.startsWith("Tea-Rek'z"));

  // Create a special "Toppings" group for Tea-Rek'z if we have the data
  const createTeaRekzWithToppings = () => {
    if (!teaRekzMenu || !bobaToppingsGroup) return teaRekzMenu;

    // Create a copy of the Tea Rek'z menu
    const teaRekzWithToppings = {
      ...teaRekzMenu,
      groups: [...teaRekzMenu.groups],
    };

    // Add the Toppings group if it doesn't already exist
    if (!teaRekzWithToppings.groups.find((g) => g.name === 'Toppings')) {
      const toppingsGroup = {
        name: 'Toppings 🌈',
        guid: 'toppings-special-group',
        description: 'Customize your bubble tea with these delicious toppings',
        items: bobaToppingsGroup.items.map((item) => ({
          name: item.name,
          guid: item.guid,
          description: item.description,
          price: item.price,
          imageUrl: null,
        })),
      };

      // Insert Toppings after the first group (House Favorites)
      teaRekzWithToppings.groups.push(toppingsGroup);
    }

    return teaRekzWithToppings;
  };

  const teaRekzMenuWithToppings = createTeaRekzWithToppings();

  // Define excluded menu groups by selected tab
  const excludedGroups: Partial<Record<MenuTab, string[]>> = {
    "Tea-Rek'z": ['Grab n Go', 'Archived Items (Not Displayed)'],
    // Add other exclusions as needed
  };

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
    } else if (utmCampaign && utmCampaign.toLowerCase().startsWith('tea')) {
      setSelectedTab("Tea-Rek'z");
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

  // Get the current menu based on selected tab
  const getCurrentMenu = () => {
    const menuMap = {
      Brunch: brunchMenu,
      'Happy Hour': happyHourMenu,
      Dinner: dinnerMenu,
      Drinks: drinksMenu,
      "Tea-Rek'z": teaRekzMenuWithToppings,
    };

    const currentMenu = menuMap[selectedTab];
    return currentMenu ? [currentMenu] : [];
  };

  const menus = getCurrentMenu();
  const totalMenuItems = menus.reduce((total, menu) => {
    return total + menu.groups.reduce((groupTotal, group) => groupTotal + group.items.length, 0);
  }, 0);

  // Get category options for MenuCategorySwitcher
  const getCategoryOptions = () => {
    const currentMenu = menus[0];
    if (!currentMenu) return [];

    const excludedGroupNames = excludedGroups[selectedTab] || [];

    const groups = currentMenu.groups
      .filter((g) => g.items && g.items.length > 0)
      .filter((g) => !excludedGroupNames.includes(g.name));

    return groups.map((g) => ({ key: g.guid, label: g.name }));
  };

  const categoryOptions = getCategoryOptions();

  // Get sections for MenuSections
  const getSections = () => {
    const currentMenu = menus[0];
    if (!currentMenu) return [];

    const excludedGroupNames = excludedGroups[selectedTab] || [];

    return currentMenu.groups.filter((g) => !excludedGroupNames.includes(g.name));
  };

  const sections = getSections();
  // Get items for a group with special handling for Dinner menu
  const getItems = (g: any) => {
    // Special case for Dinner menu - filter Daily Specials to only show Soup of the Day
    if (selectedTab === 'Dinner' && g.name && g.name.startsWith('Daily Specials')) {
      return g.items.filter((item: any) => item.name.startsWith('Soup of the Day'));
    }

    // Default case - return all items
    return g.items;
  };

  const handleTabChange = (tab: MenuTab) => {
    setSelectedTab(tab);
    setSelectedCategory(null);
  };

  return (
    <BasicPageLayout title="Menu" heading="Our Menu" intro="Explore our delicious offerings">
      <div className={styles.menuContainer}>
        {/* Top-level tab navigation */}
        <MenuTabNavigation selectedTab={selectedTab} onTabChange={handleTabChange} />
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
  const menuOptionGroupsData = loadMenuOptionGroupsData();

  return {
    props: {
      menuData,
      menuOptionGroupsData,
    },
  };
};
