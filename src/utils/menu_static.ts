import photoOverrides from '@/data/menu/photo_overrides.json';
import { MenuData } from '@/types/menu';
import fs from 'fs';
import path from 'path';

interface PhotoOverride {
  itemName: string;
  previousToastImageUrl: string | null;
  imageUrl: string;
}

// Server-side only: Load menu data from JSON file
export const loadMenuData = (): MenuData => {
  const menuDataPath = path.join(process.cwd(), 'src/data/menu/processed/menu.json');
  const menuData: MenuData = JSON.parse(fs.readFileSync(menuDataPath, 'utf-8'));
  const overrides: Record<string, PhotoOverride> = photoOverrides;

  for (const menu of menuData.menus) {
    for (const group of menu.groups) {
      for (const item of group.items) {
        const override = overrides[item.guid];
        // Use the supplied photo until Toast exports a newer image for this item.
        if (override && item.imageUrl === override.previousToastImageUrl) {
          item.imageUrl = override.imageUrl;
        }
      }
    }
  }

  return menuData;
};

// Server-side only: Load menu option groups data from JSON file
export const loadMenuOptionGroupsData = () => {
  const optionGroupsPath = path.join(
    process.cwd(),
    'src/data/menu/processed/menu_option_groups.json'
  );
  return JSON.parse(fs.readFileSync(optionGroupsPath, 'utf-8'));
};
