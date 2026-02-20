export type Currency = 'USD' | 'LKR' | 'GBP' | 'AUD' | 'AED' | 'EUR';

export interface PricingTier {
    name: string;
    base: number;
    symbol: string;
    rate: number; // Conversion rate relative to USD (1 USD = x Currency)
}

export const EXCHANGE_RATES: Record<Currency, number> = {
    USD: 1,
    LKR: 305.50, // Example rate, usually fetched live
    GBP: 0.79,
    AUD: 1.53,
    AED: 3.67,
    EUR: 0.92,
};

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
    USD: '$',
    LKR: 'LKR ',
    GBP: '£',
    AUD: 'A$',
    AED: 'AED ',
    EUR: '€',
};

// Fixed Regional Pricing Rules (Custom Price Books)
// If a specific price exists for a region, use it. Otherwise, convert from USD.
export const REGIONAL_PRICING_BOOKS: Record<string, Record<Currency, number>> = {
    // Web Application Development (Base)
    web_base: {
        USD: 850,
        LKR: 25000,
        GBP: 650,
        AUD: 1200,
        AED: 3100,
        EUR: 780,
    },
    // AI Neural System (Base)
    ai_base: {
        USD: 1450,
        LKR: 15000,
        GBP: 1100,
        AUD: 2100,
        AED: 5200,
        EUR: 1350,
    },
    // Mobile Ecosystem (Base)
    mobile_base: {
        USD: 1800,
        LKR: 35000,
        GBP: 1400,
        AUD: 2700,
        AED: 6500,
        EUR: 1650,
    },
    // Add-ons
    ecom_additive: {
        USD: 800,
        LKR: 20000,
        GBP: 650,
        AUD: 1200,
        AED: 3000,
        EUR: 750,
    },
    whatsapp_additive: {
        USD: 300,
        LKR: 5000,
        GBP: 250,
        AUD: 450,
        AED: 1100,
        EUR: 280,
    },
    booking_additive: {
        USD: 500,
        LKR: 15000,
        GBP: 400,
        AUD: 750,
        AED: 1800,
        EUR: 460,
    }
};

export const formatCurrency = (amount: number, currency: Currency): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

export const getPrice = (key: string, currency: Currency): number => {
    // Check if we have a fixed book price
    if (REGIONAL_PRICING_BOOKS[key] && REGIONAL_PRICING_BOOKS[key][currency]) {
        return REGIONAL_PRICING_BOOKS[key][currency];
    }

    // Fallback: This shouldn't theoretically happen if all keys are covered, 
    // but just in case, return 0 or a converted base USD value
    return 0;
};
