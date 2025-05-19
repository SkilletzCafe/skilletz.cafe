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
