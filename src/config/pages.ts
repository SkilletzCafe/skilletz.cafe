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
  blog: {
    path: '/blog',
    name: 'Blog',
    showInNav: true,
  },
  press: {
    path: '/press',
    name: 'Press',
    showInNav: true,
  },
  contact: {
    path: '/contact',
    name: 'Contact',
    showInNav: true,
  },
  careers: {
    path: '/careers',
    name: 'Careers',
    showInNav: false,
  },
  orderOnline: {
    path: '/order-online',
    name: 'Order Online',
    showInNav: false,
  },
  reservations: {
    path: '/reservations',
    name: 'Reservations',
    showInNav: false,
  },
} as const;

export const SITE_URL = 'https://skilletz.cafe';
