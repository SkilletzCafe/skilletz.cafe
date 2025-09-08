export type MenuTab = 'Brunch' | 'Happy Hour' | 'Dinner' | 'Drinks' | "Tea-Rek'z";

export interface TabConfig {
  key: MenuTab;
  label: string;
}

export const MENU_TAB_CONFIG: TabConfig[] = [
  { key: 'Brunch', label: 'Brunch' },
  { key: 'Happy Hour', label: 'Happy Hour' },
  { key: 'Dinner', label: 'Dinner' },
  { key: 'Drinks', label: 'Drinks 🥤' },
  { key: "Tea-Rek'z", label: "Tea-Rek'z 🧋🦖" },
];
