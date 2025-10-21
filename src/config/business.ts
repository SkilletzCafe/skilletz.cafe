import { buildFullAddress } from '@nextjs-htk/core/utils';

export const BUSINESS = {
  domain: 'skilletz.cafe',
  name: "Skillet'z Cafe",
  branding: {
    welcome: 'Welcome to',
    tagline:
      'Family-owned Breakfast & Brunch Restaurant in Historic Niles - Fresh, Homemade American Diner Food',
    slogan:
      "Ol' Country Cookin' - Fresh, Homemade Breakfast & Brunch in Historic Niles, Fremont, California",
  },
  founding: {
    year: 2025,
  },
  location: {
    address: '37378 Niles Blvd',
    city: 'Fremont',
    state: 'CA',
    zip: '94536',
    neighborhood: 'Niles',
    country_abbrev: 'US',
    lat: 37.5773115,
    lng: -121.9802536,
    phone: '(510) 793-8161',
  },
  contact: {
    email: 'hello@skilletz.cafe',
  },
  hours: {
    weekday: {
      days: 'Monday-Wednesday',
      open: '8am',
      close: '2pm',
    },
    weekend: {
      days: 'Thursday-Sunday',
      open: '8am',
      close: '8pm',
      breakfast_ends: '3pm',
      dinner_starts: '3pm',
    },
  },
} as const;

export const FULL_ADDRESS = buildFullAddress(BUSINESS.location);
