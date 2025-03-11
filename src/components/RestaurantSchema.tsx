import { BUSINESS } from '@/config';

interface RestaurantSchemaProps {
  description: string;
}

export default function RestaurantSchema({ description }: RestaurantSchemaProps) {
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: BUSINESS.name,
    description: description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.location.address,
      addressLocality: BUSINESS.location.city,
      addressRegion: BUSINESS.location.state,
      postalCode: BUSINESS.location.zip,
      addressCountry: BUSINESS.location.country_abbrev,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS.location.lat,
      longitude: BUSINESS.location.lng,
    },
    url: `https://${BUSINESS.domain}`,
    telephone: BUSINESS.location.phone,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: BUSINESS.hours.weekday.open,
        closes: BUSINESS.hours.weekday.close,
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: BUSINESS.hours.weekend.open,
        closes: BUSINESS.hours.weekend.close,
      },
    ],
    servesCuisine: ['American', 'Breakfast', 'Brunch', 'Lunch'],
    priceRange: '$$',
    image: 'https://skilletz.cafe/images/cover.jpg',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
    />
  );
}
