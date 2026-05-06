interface OutboundClickGtagParams {
  event_category: 'outbound';
  event_label: string;
  link_url: string;
  link_domain: string | null;
  page_location: string;
  transport_type: 'beacon';
  event_callback?: () => void;
  event_timeout?: number;
}

type Gtag = (command: 'event', eventName: 'click', params: OutboundClickGtagParams) => void;

declare global {
  interface Window {
    gtag?: Gtag;
  }
}

interface TrackOutboundClickParams {
  destination: string;
  eventTimeout?: number;
  label: string;
  onComplete?: () => void;
  pageLocation?: string;
}

export function trackOutboundClick({
  destination,
  eventTimeout,
  label,
  onComplete,
  pageLocation,
}: TrackOutboundClickParams): boolean {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return false;
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
    ...(onComplete
      ? {
          event_callback: onComplete,
          event_timeout: eventTimeout ?? 1000,
        }
      : {}),
  });

  return true;
}
