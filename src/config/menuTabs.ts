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

export const HIDDEN_MENU_GROUPS_BY_TAB: Partial<Record<MenuTab, string[]>> = {
  Dinner: ['Daily Specials 🌟'],
  "Tea-Rek'z": ['Grab n Go', 'Archived Items (Not Displayed)'],
};

export function isMenuGroupHidden(tab: MenuTab, groupName: string): boolean {
  return HIDDEN_MENU_GROUPS_BY_TAB[tab]?.includes(groupName) ?? false;
}
