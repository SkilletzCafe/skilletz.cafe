import { BUSINESS } from '@/config';

export const buildFullAddress = (location: typeof BUSINESS.location) => {
  const { address, city, state, zip } = location;
  return `${address}, ${city}, ${state} ${zip}`;
};
