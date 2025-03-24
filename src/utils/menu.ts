import { MenuData } from '@/types/menu';

// Image loader for external images
export const imageLoader = ({ src }: { src: string }) => {
  return src;
};

// Filter out "Other" menu and get featured items
export const getFeaturedItems = (menuData: MenuData) => {
  return menuData.menus.flatMap((menu) =>
    menu.groups.flatMap((group) =>
      group.items.filter((item) => item.imageUrl && (item.isPopular || Math.random() < 0.3))
    )
  );
};

// Filter out "Other" menu
export const getMainMenus = (menuData: MenuData) => {
  return menuData.menus.filter((menu) => menu.name !== 'Other');
};
