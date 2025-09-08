import { GetStaticProps } from 'next';

import { MenuItem } from '@/types/menu';

import { TVBase } from '@/components/TVBase';

import { getFeaturedItems, getMainMenus } from '@/utils/menu';
import { loadMenuData } from '@/utils/menu_static';

interface TVRekzPageProps {
  featuredItems: MenuItem[];
}

export default function TVRekz({ featuredItems }: TVRekzPageProps) {
  return (
    <TVBase
      items={featuredItems}
      logoPath="/images/logos/tearekz_logo.png"
      logoAlt="Tea-Rek'z Logo"
      logoWidth={240}
      logoHeight={70}
      minDelayMillis={5000}
      maxDelayMillis={30000}
      defaultDelayMillis={8000}
    />
  );
}

export const getStaticProps: GetStaticProps<TVRekzPageProps> = async () => {
  const menuData = loadMenuData();

  // Get only Tea-Rek'z menu items for the Tea-Rek'z TV display
  const filteredMenus = getMainMenus(menuData, {
    only: ["Tea-Rek'z 🧋🦖"],
  });

  // Create a temporary menuData object with filtered menus for getFeaturedItems
  const filteredMenuData = { ...menuData, menus: filteredMenus };
  const featuredItems = getFeaturedItems(filteredMenuData, {
    excludeGroups: ['Grab n Go'],
  });

  return {
    props: {
      featuredItems,
    },
  };
};
