import { Metadata } from 'next';
import { QuoteClient } from './QuoteClient';
import { PAGE_SEO } from '@/lib/seo';

export const metadata: Metadata = {
    title: PAGE_SEO.quote.title,
    description: PAGE_SEO.quote.description,
    keywords: PAGE_SEO.quote.keywords,
    openGraph: {
        title: PAGE_SEO.quote.title,
        description: PAGE_SEO.quote.description,
        images: [{ url: PAGE_SEO.quote.image, width: 1200, height: 630, alt: "Seranex Quote Generator" }],
    },
    twitter: {
        title: PAGE_SEO.quote.title,
        description: PAGE_SEO.quote.description,
        images: [PAGE_SEO.quote.image],
    }
};

export default function QuotePage() {
    return <QuoteClient />;
}
