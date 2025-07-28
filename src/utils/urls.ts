/**
 * Utility functions for generating URLs
 */

/**
 * Creates a Google Maps search URL from an address and business name
 * @param businessName The name of the business
 * @param address The full address to search for
 * @returns URL with business name and address
 */
export const createGoogleMapsUrl = (businessName: string, address: string) => {
  // Combine business name and address, replace spaces with +
  const query = `${businessName}, ${address}`.replace(/ /g, '+');
  return `https://google.com/maps?q=${query}`;
};

/**
 * Creates a tel: URL from a phone number
 * @param phone The phone number
 * @returns Formatted tel: URL
 */
export const createPhoneUrl = (phone: string) => {
  // Remove any non-numeric characters
  const cleanPhone = phone.replace(/\D/g, '');
  return `tel:+1${cleanPhone}`;
};

/**
 * Gets URL parameters from the current URL
 * @returns Object containing URL parameters
 */
export const getUrlParams = () => {
  if (typeof window === 'undefined') {
    return {};
  }

  const urlParams = new URLSearchParams(window.location.search);
  const params: Record<string, string> = {};

  urlParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
};

/**
 * Gets a specific URL parameter value
 * @param paramName The name of the parameter to get
 * @returns The parameter value or null if not found
 */
export const getUrlParam = (paramName: string): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(paramName);
};
