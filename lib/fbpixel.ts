// Facebook Pixel helper functions
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || '';

export const pageview = () => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'PageView');
    }
};

// Track custom events
export const event = (name: string, options = {}) => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', name, options);
    }
};

// Standard events
export const trackLead = () => event('Lead');
export const trackContact = () => event('Contact');
export const trackViewContent = (contentName: string) => event('ViewContent', { content_name: contentName });
export const trackInitiateCheckout = () => event('InitiateCheckout');
