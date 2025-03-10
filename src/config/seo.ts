import { BUSINESS } from './business';

export const SEO = {
  formatTitle: (page?: string) =>
    page
      ? `${page} | ${BUSINESS.name} in ${BUSINESS.location.neighborhood} | ${BUSINESS.location.city}, ${BUSINESS.location.state}`
      : `${BUSINESS.name} | ${BUSINESS.location.neighborhood}, ${BUSINESS.location.city} ${BUSINESS.location.state}`,

  description: {
    default: `Traditional American Breakfast & Everyday Specials! Open weekdays ${BUSINESS.hours.weekday.open}-${BUSINESS.hours.weekday.close}, weekends ${BUSINESS.hours.weekend.open}-${BUSINESS.hours.weekend.close} in historic ${BUSINESS.location.neighborhood}, ${BUSINESS.location.city} ${BUSINESS.location.state}`,
  },
} as const;
