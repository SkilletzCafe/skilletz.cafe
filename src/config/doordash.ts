export const DOORDASH_STOREFRONT = {
  businessId: 13659103,
  businessSlug: "Skillet'zCafe",
  sdkUrl: 'https://web-assets.cdn4dd.com/prod/storefront-sdk/latest/app.js',
  orderOnlineUrl: 'https://order.online/store/~31854517/?hideModal=true',
} as const;

export const DOORDASH_SMART_BUTTON_CONFIG = {
  businessId: DOORDASH_STOREFRONT.businessId,
  businessSlug: DOORDASH_STOREFRONT.businessSlug,
  floatingBar: true,
  position: 'bottom',
  buttonAlignment: 'center',
  backgroundColor: 'transparent',
  buttonBackgroundColor: '#ff7f50',
  buttonRadius: '0px',
  borderColor: 'transparent',
  buttonText: 'ORDER ONLINE',
  fontFamily: 'KOROLEV',
  showModal: {
    titleText: 'Order Now',
    bodyText: 'Track and manage your order online.',
    hasApp: false,
  },
} as const;
