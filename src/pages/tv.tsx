import { GetStaticProps } from 'next';

import { MenuItem } from '@/types/menu';

import { TVBase } from '@/components/TVBase';

import { getFeaturedItems, getMainMenus } from '@/utils/menu';
import { loadMenuData } from '@/utils/menu_static';

interface TVPageProps {
  featuredItems: MenuItem[];
}

export default function TV({ featuredItems }: TVPageProps) {
  return (
    <TVBase
      items={featuredItems}
      logoPath="/images/logos/skilletz_logo_dark_mode_blue_flame_transparent.png"
      logoAlt="Skilletz Logo"
      logoWidth={240}
      logoHeight={70}
    />
  );
}

export const getStaticProps: GetStaticProps<TVPageProps> = async () => {
  const menuData = loadMenuData();

  // Get all menus except Tea-Rek'z for the main TV display
  const filteredMenus = getMainMenus(menuData, {
    exclude: ['Other', "Tea-Rek'z 🧋🦖"],
  });

  // Create a temporary menuData object with filtered menus for getFeaturedItems
  const filteredMenuData = { ...menuData, menus: filteredMenus };
  const featuredItems = getFeaturedItems(filteredMenuData);

  return {
    props: {
      featuredItems,
    },
  };
};
