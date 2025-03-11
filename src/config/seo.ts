import { BUSINESS } from './business';

const LOCATION = `${BUSINESS.location.neighborhood}, ${BUSINESS.location.city}, ${BUSINESS.location.state}, ${BUSINESS.location.country_abbrev}`;
const BASE_TITLE = `${BUSINESS.name} | Breakfast, Brunch & Lunch in ${LOCATION}`;

export const SEO = {
  formatTitle: (page?: string) => (page ? `${page} | ${BASE_TITLE}` : BASE_TITLE),

  description: {
    default: `Family-owned breakfast and brunch restaurant in ${LOCATION}. Serving traditional American breakfast, brunch, and lunch daily. Open weekdays ${BUSINESS.hours.weekday.open}-${BUSINESS.hours.weekday.close}, weekends ${BUSINESS.hours.weekend.open}-${BUSINESS.hours.weekend.close}. Fresh, homemade meals in a warm, welcoming atmosphere.`,
  },
} as const;
