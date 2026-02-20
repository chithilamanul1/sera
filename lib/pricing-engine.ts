
export type Currency = 'USD' | 'LKR' | 'GBP' | 'EUR' | 'AUD' | 'AED';

export const EXCHANGE_RATES: Record<Currency, number> = {
    USD: 1,
    LKR: 305, // Example rate
    GBP: 0.79,
    EUR: 0.92,
    AUD: 1.52,
    AED: 3.67
};

export interface PricingRule {
    id: string;
    name: string;
    basePriceUSD: number;
    type: 'base' | 'additive' | 'multiplier';
    category: 'web' | 'mobile' | 'ai' | 'feature' | 'maintenance' | 'marketing';
}

export const PRICING_RULES: PricingRule[] = [
    // Base Projects
    { id: 'web_landing', name: 'Landing Page', basePriceUSD: 500, type: 'base', category: 'web' },
    { id: 'web_app', name: 'Web Application', basePriceUSD: 1500, type: 'base', category: 'web' },
    { id: 'mobile_app', name: 'Mobile App (Hybrid)', basePriceUSD: 2500, type: 'base', category: 'mobile' },
    { id: 'ai_bot', name: 'AI Chatbot', basePriceUSD: 800, type: 'base', category: 'ai' },
    { id: 'ai_system', name: 'Custom AI System', basePriceUSD: 3000, type: 'base', category: 'ai' },

    // Features
    { id: 'feat_ecom', name: 'E-commerce', basePriceUSD: 800, type: 'additive', category: 'feature' },
    { id: 'feat_auth', name: 'User Auth & Profiles', basePriceUSD: 400, type: 'additive', category: 'feature' },
    { id: 'feat_dashboard', name: 'Admin Dashboard', basePriceUSD: 600, type: 'additive', category: 'feature' },
    { id: 'feat_payment', name: 'Payment Gateway', basePriceUSD: 300, type: 'additive', category: 'feature' },
    { id: 'feat_seo', name: 'Advanced SEO', basePriceUSD: 300, type: 'additive', category: 'feature' },
    { id: 'feat_lang', name: 'Multi-language (i18n)', basePriceUSD: 400, type: 'additive', category: 'feature' },

    // Multipliers (Complexity)
    { id: 'scale_startup', name: 'Startup Scale', basePriceUSD: 1, type: 'multiplier', category: 'feature' },
    { id: 'scale_enterprise', name: 'Enterprise Scale', basePriceUSD: 2.5, type: 'multiplier', category: 'feature' },
];

export function convertPrice(amountUSD: number, targetCurrency: Currency): number {
    return Math.round(amountUSD * EXCHANGE_RATES[targetCurrency]);
}

export function formatPrice(amount: number, currency: Currency): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

export function calculateQuote(
    selectedIds: string[],
    currency: Currency = 'USD',
    multiplierId: string | null = null
): { total: number, breakdown: { name: string, price: string }[] } {

    let totalUSD = 0;
    const breakdown: { name: string, price: string }[] = [];

    // 1. Calculate Base & Additive
    selectedIds.forEach(id => {
        const rule = PRICING_RULES.find(r => r.id === id);
        if (rule && rule.type !== 'multiplier') {
            totalUSD += rule.basePriceUSD;
            breakdown.push({
                name: rule.name,
                price: formatPrice(convertPrice(rule.basePriceUSD, currency), currency)
            });
        }
    });

    // 2. Apply Multiplier
    if (multiplierId) {
        const rule = PRICING_RULES.find(r => r.id === multiplierId);
        if (rule && rule.type === 'multiplier') {
            totalUSD *= rule.basePriceUSD; // reusing field for multiplier value
            breakdown.push({
                name: `Scale Factor: ${rule.name}`,
                price: `x${rule.basePriceUSD}`
            });
        }
    }

    return {
        total: convertPrice(totalUSD, currency),
        breakdown
    };
}
