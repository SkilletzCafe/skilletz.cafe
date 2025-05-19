import { SERVICES } from './services';

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
    target: '_blank',
    rel: 'noopener',
  },
  {
    label: 'TripAdvisor',
    href: SERVICES.tripadvisor,
    isInternal: false,
    target: '_blank',
    rel: 'noopener noreferrer',
  },
];
