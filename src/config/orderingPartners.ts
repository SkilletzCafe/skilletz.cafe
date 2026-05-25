import { DOORDASH_STOREFRONT } from './doordash';

export interface OrderingPartner {
  key: string;
  label: string;
  url: string;
  type: 'pickup' | 'delivery';
  bgColor: string;
}

export const ORDERING_PARTNERS: OrderingPartner[] = [
  {
    key: 'pickup',
    label: 'Order Pickup',
    url: DOORDASH_STOREFRONT.orderOnlineUrl,
    type: 'pickup',
    bgColor: DOORDASH_STOREFRONT.brandColor,
  },
  {
    key: 'delivery',
    label: 'Order Delivery',
    url: DOORDASH_STOREFRONT.orderOnlineUrl,
    type: 'delivery',
    bgColor: DOORDASH_STOREFRONT.brandColor,
  },
];
