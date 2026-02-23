import { Metadata } from 'next';
import { PricingClient } from './PricingClient';
import { PAGE_SEO } from '@/lib/seo';

export const metadata: Metadata = {
    title: PAGE_SEO.pricing.title,
    description: PAGE_SEO.pricing.description,
    keywords: PAGE_SEO.pricing.keywords,
    openGraph: {
        title: PAGE_SEO.pricing.title,
        description: PAGE_SEO.pricing.description,
        images: [{ url: PAGE_SEO.pricing.image, width: 1200, height: 630, alt: "Seranex Pricing" }],
    },
    twitter: {
        title: PAGE_SEO.pricing.title,
        description: PAGE_SEO.pricing.description,
        images: [PAGE_SEO.pricing.image],
    }
};

export default function PricingPage() {
    return <PricingClient />;
}
