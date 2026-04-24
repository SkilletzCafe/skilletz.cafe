declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

interface TrackOutboundClickParams {
  destination: string;
  label: string;
  location: string;
}

export function trackOutboundClick({ destination, label, location }: TrackOutboundClickParams) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', 'click', {
    event_category: 'outbound',
    event_label: label,
    link_url: destination,
    link_domain: (() => {
      try {
        return new URL(destination).hostname;
      } catch {
        return null;
      }
    })(),
    page_location: location,
    transport_type: 'beacon',
  });
}
