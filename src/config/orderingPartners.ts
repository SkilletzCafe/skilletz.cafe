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
    key: 'toast',
    label: 'Order Pickup (Toast)',
    url: 'https://order.toasttab.com/online/skilletz-cafe',
    type: 'pickup',
    bgColor: '#f5a623',
  },
  {
    key: 'doordash',
    label: 'Order Delivery (DoorDash)',
    url: DOORDASH_STOREFRONT.orderOnlineUrl,
    type: 'delivery',
    bgColor: '#e60023',
  },
];
