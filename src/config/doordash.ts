export const DOORDASH_STOREFRONT = {
  businessId: 13659103,
  businessSlug: "Skillet'zCafe",
  sdkUrl: 'https://web-assets.cdn4dd.com/prod/storefront-sdk/latest/app.js',
  orderOnlineUrl: "https://order.online/business/Skillet'zCafe-13659103",
  pickupUrl: "https://order.online/business/Skillet'zCafe-13659103?pickup=true",
  deliveryUrl: "https://order.online/business/Skillet'zCafe-13659103?delivery=true",
  marketplaceUrl: "https://www.doordash.com/store/skillet'z-cafe-fremont-31854517/",
  brandColor: '#eb1700',
} as const;

export const DOORDASH_SMART_BUTTON_CONFIG = {
  businessId: DOORDASH_STOREFRONT.businessId,
  businessSlug: DOORDASH_STOREFRONT.businessSlug,
  floatingBar: true,
  position: 'bottom',
  buttonAlignment: 'right',
  backgroundColor: 'transparent',
  buttonBackgroundColor: DOORDASH_STOREFRONT.brandColor,
  buttonRadius: '8px',
  borderColor: 'transparent',
  buttonText: 'ORDER ONLINE',
  fontFamily: 'KOROLEV',
  showModal: {
    titleText: 'Order Now',
    bodyText: 'Track and manage your order online.',
    hasApp: false,
  },
} as const;
