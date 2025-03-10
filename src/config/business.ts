export const BUSINESS = {
  name: "Skillet'z Cafe",
  branding: {
    welcome: 'Welcome to',
    tagline:
      'Serving delicious American breakfast & lunch in historic Niles, Fremont, California',
    slogan:
      "Ol' Country Cookin' - Home cooked meals in Historic Niles, Fremont, California",
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
    fullAddress: '37378 Niles Blvd, Fremont, CA 94536',
    phone: '(510) 793-8161',
  },
  contact: {
    email: 'hello@skilletz.cafe',
  },
  hours: {
    weekday: {
      days: 'Monday-Friday',
      open: '8am',
      close: '2pm',
    },
    weekend: {
      days: 'Saturday-Sunday',
      open: '8am',
      close: '3pm',
    },
  },
} as const;
