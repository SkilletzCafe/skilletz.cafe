import { ANALYTICS, BUSINESS, PAGES, QUICK_LINKS, SEO, SOCIAL_MEDIA } from '@/config';
import { defineConfig } from '@nextjs-htk/core';

const LOCATION = `${BUSINESS.location.neighborhood}, ${BUSINESS.location.city}, ${BUSINESS.location.state}, ${BUSINESS.location.country_abbrev}`;

export default defineConfig({
  site: {
    name: BUSINESS.name,
    title: SEO.formatTitle(),
    description: SEO.description.default,
    url: 'https://skilletz.cafe',
    author: BUSINESS.name,
  },
  branding: {
    logo: '/images/logos/skilletz_logo_transparent.png',
    slogan: BUSINESS.branding.slogan,
    tagline: BUSINESS.branding.tagline,
  },
  business: {
    location: {
      address: BUSINESS.location.address,
      city: BUSINESS.location.city,
      state: BUSINESS.location.state,
      zip: BUSINESS.location.zip,
      phone: BUSINESS.location.phone,
    },
    hours: {
      weekday: {
        days: BUSINESS.hours.weekday.days,
        display: `${BUSINESS.hours.weekday.open} - ${BUSINESS.hours.weekday.close}`,
      },
      weekend: {
        days: BUSINESS.hours.weekend.days,
        display: `${BUSINESS.hours.weekend.open} - ${BUSINESS.hours.weekend.close}`,
      },
    },
  },
  navigation: Object.values(PAGES).map((page) => ({
    path: page.path,
    name: page.name,
    showInNav: page.showInNav,
    openInNewTab: page.openInNewTab,
  })),
  footer: {
    showLocation: true,
    showHours: true,
    showSocial: true,
    quickLinks: QUICK_LINKS.map((link) => ({
      label: link.label,
      href: link.href,
      isInternal: link.isInternal,
    })),
  },
  social: Object.entries(SOCIAL_MEDIA).reduce(
    (acc, [key, social]) => ({
      ...acc,
      [key]: {
        url: social.url,
        label: social.label,
        icon: social.icon,
        title: social.title,
      },
    }),
    {}
  ),
  theme: {
    defaultTheme: 'dark',
  },
  seo: {
    formatTitle: SEO.formatTitle,
    description: {
      default: SEO.description.default,
    },
  },
  analytics: {
    google: ANALYTICS.google.measurementId,
  },
});
