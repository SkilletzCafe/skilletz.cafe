import { MenuData } from '@/types/menu';
import fs from 'fs';
import path from 'path';

// Server-side only: Load menu data from JSON file
export const loadMenuData = (): MenuData => {
  const menuDataPath = path.join(process.cwd(), 'src/data/menu/processed/menu.json');
  return JSON.parse(fs.readFileSync(menuDataPath, 'utf-8'));
};

// Server-side only: Load menu option groups data from JSON file
export const loadMenuOptionGroupsData = () => {
  const optionGroupsPath = path.join(
    process.cwd(),
    'src/data/menu/processed/menu_option_groups.json'
  );
  return JSON.parse(fs.readFileSync(optionGroupsPath, 'utf-8'));
};
