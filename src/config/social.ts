import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faFacebook,
  faGoogle,
  faInstagram,
  faXTwitter,
  faYelp,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

interface SocialMediaLink {
  url: string;
  label: string;
  icon: IconDefinition;
  title: string;
}

interface ServiceLink {
  url: string;
  label: string;
  localPath?: string;
}

export const SOCIAL_MEDIA: Record<string, SocialMediaLink> = {
  facebook: {
    url: 'https://www.facebook.com/SkilletzCafe',
    label: 'Facebook',
    icon: faFacebook,
    title: 'Follow us on Facebook for updates and events',
  },
  instagram: {
    url: 'https://www.instagram.com/skilletz.cafe',
    label: 'Instagram',
    icon: faInstagram,
    title: 'See our latest food photos on Instagram',
  },
  yelp: {
    url: 'https://www.yelp.com/biz/skilletz-cafe-fremont',
    label: 'Yelp',
    icon: faYelp,
    title: 'Read our reviews on Yelp',
  },
  googleBusiness: {
    url: 'https://g.co/kgs/W2fYt7s',
    label: 'Google Business',
    icon: faGoogle,
    title: 'Find us on Google Business',
  },
  youtube: {
    url: 'https://www.youtube.com/@SkilletzCafe',
    label: 'YouTube',
    icon: faYoutube,
    title: 'Watch our videos on YouTube',
  },
  twitter: {
    url: 'https://x.com/SkilletzCafe',
    label: 'X (Twitter)',
    icon: faXTwitter,
    title: 'Follow us on X (Twitter)',
  },
} as const;

export const SERVICES: Record<string, ServiceLink> = {
  reservations: {
    url: 'https://yelp.to/2WkMWZOf0j',
    label: 'Reservations',
    localPath: '/reservations',
  },
  doordash: {
    url: "https://www.doordash.com/store/skillet'z-cafe-fremont-31854517/",
    label: 'Order on DoorDash',
  },
  careers: {
    url: 'https://zippyapp.com/biz/skilletz',
    label: 'Careers',
    localPath: '/careers',
  },
  tripadvisor: {
    url: 'https://www.tripadvisor.com/Restaurant_Review-g32411-d14979469-Reviews-Skillet_z_Cafe-Fremont_California.html',
    label: 'TripAdvisor',
  },
  catering: {
    url: 'https://docs.google.com/document/d/16e_c_6yw3ibc7KPSYJYKBUj1eIw74LM1YBLEFLdrb2A/preview',
    label: 'Catering',
    localPath: '/catering',
  },
} as const;
