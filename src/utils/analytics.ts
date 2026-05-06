interface OutboundClickGtagParams {
  event_category: 'outbound';
  event_label: string;
  link_url: string;
  link_domain: string | null;
  page_location: string;
  transport_type: 'beacon';
}

type Gtag = (command: 'event', eventName: 'click', params: OutboundClickGtagParams) => void;

declare global {
  interface Window {
    gtag?: Gtag;
  }
}

interface TrackOutboundClickParams {
  destination: string;
  label: string;
  pageLocation?: string;
}

export function trackOutboundClick({ destination, label, pageLocation }: TrackOutboundClickParams) {
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
    page_location: pageLocation ?? window.location.href,
    transport_type: 'beacon',
  });
}
