import { DOORDASH_STOREFRONT } from './doordash';

export interface OrderingPartner {
  key: string;
  label: string;
  url: string;
  type: 'pickup' | 'delivery';
  bgColor: string;
}

export const TOAST_ONLINE_ORDERING_URL = 'https://order.toasttab.com/online/skilletz-cafe';

export const ORDERING_PARTNERS: OrderingPartner[] = [
  {
    key: 'pickup',
    label: 'Order Pickup',
    url: DOORDASH_STOREFRONT.pickupUrl,
    type: 'pickup',
    bgColor: DOORDASH_STOREFRONT.brandColor,
  },
  {
    key: 'delivery',
    label: 'Order Delivery',
    url: DOORDASH_STOREFRONT.deliveryUrl,
    type: 'delivery',
    bgColor: DOORDASH_STOREFRONT.brandColor,
  },
];
