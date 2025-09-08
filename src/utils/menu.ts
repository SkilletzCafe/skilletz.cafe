import { MenuData } from '@/types/menu';

// Image loader for external images
export const imageLoader = ({ src }: { src: string }) => {
  return src;
};

// Get all menu items that have images for TV display
// This function extracts all menu items from all menus that have associated images
export const getFeaturedItems = (
  menuData: MenuData,
  options?: {
    excludeGroups?: string[]; // Exclude menu groups with these names
  }
) => {
  const { excludeGroups = [] } = options || {};

  return menuData.menus.flatMap((menu) =>
    menu.groups
      .filter((group) => !excludeGroups.includes(group.name))
      .flatMap(
        (group) => group.items.filter((item) => item.imageUrl)
        // TODO: Add filtering logic for featured items based on business requirements
        // Previous logic: (item.isPopular || Math.random() < 0.3)
        // Consider: item.isFeatured, item.isPopular, or manual curation
      )
  );
};

// Filter menus with optional inclusion/exclusion parameters
export const getMainMenus = (
  menuData: MenuData,
  options?: {
    only?: string[]; // Only include menus with these names
    exclude?: string[]; // Exclude menus with these names
  }
) => {
  const { only, exclude = ['Other'] } = options || {};

  return menuData.menus.filter((menu) => {
    // If 'only' is specified, only include those menus
    if (only) {
      return only.includes(menu.name);
    }

    // Otherwise, exclude the specified menu names
    return !exclude.includes(menu.name);
  });
};
