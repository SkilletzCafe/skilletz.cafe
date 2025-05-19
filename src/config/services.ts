export interface ServiceLink {
  url: string;
  label: string;
  localPath?: string;
}

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
