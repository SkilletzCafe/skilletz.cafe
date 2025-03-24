export interface MenuItem {
  name: string;
  guid: string;
  description: string;
  price: number;
  imageUrl: string | null;
  isPopular?: boolean;
}

export interface MenuGroup {
  name: string;
  guid: string;
  description: string;
  items: MenuItem[];
}

export interface Menu {
  name: string;
  guid: string;
  description: string;
  groups: MenuGroup[];
}

export interface MenuData {
  menus: Menu[];
}

export interface MenuItemState {
  isVisible: boolean;
  isLoaded: boolean;
}
