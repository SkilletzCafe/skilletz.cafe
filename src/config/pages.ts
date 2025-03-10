interface Page {
  path: string;
  name: string;
  showInNav: boolean;
  openInNewTab?: boolean;
}

export const PAGES: Record<string, Page> = {
  home: {
    path: '/',
    name: 'Home',
    showInNav: true,
  },
  menu: {
    path: '/menu',
    name: 'Menu',
    showInNav: true,
  },
  catering: {
    path: '/catering',
    name: 'Catering',
    showInNav: true,
    openInNewTab: true,
  },
  contact: {
    path: '/contact',
    name: 'Contact',
    showInNav: true,
  },
} as const;

export const SITE_URL = 'https://skilletz.cafe';
