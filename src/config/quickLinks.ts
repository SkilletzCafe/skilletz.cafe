interface QuickLink {
  label: string;
  href: string;
  isInternal: boolean;
  target?: string;
  rel?: string;
}

export const QUICK_LINKS: QuickLink[] = [
  {
    label: 'Order Online',
    href: '/order-online',
    isInternal: true,
  },
  {
    label: 'Reservations',
    href: '/reservations',
    isInternal: true,
    target: '_blank',
    rel: 'noopener',
  },
  {
    label: 'Catering',
    href: '/catering',
    isInternal: true,
    target: '_blank',
    rel: 'noopener',
  },
  {
    label: 'Careers',
    href: '/careers',
    isInternal: true,
  },
  {
    label: "Tea-Rek'z",
    href: 'https://tearekz.cafe',
    isInternal: false,
    target: '_blank',
    rel: 'noopener noreferrer',
  },
];
