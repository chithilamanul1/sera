import { Metadata } from 'next';
import { PortfolioClient } from './PortfolioClient';
import { PAGE_SEO } from '@/lib/seo';

export const metadata: Metadata = {
    title: PAGE_SEO.portfolio.title,
    description: PAGE_SEO.portfolio.description,
    keywords: PAGE_SEO.portfolio.keywords,
    openGraph: {
        title: PAGE_SEO.portfolio.title,
        description: PAGE_SEO.portfolio.description,
        images: [{ url: PAGE_SEO.portfolio.image, width: 1200, height: 630, alt: "Seranex Portfolio" }],
    },
    twitter: {
        title: PAGE_SEO.portfolio.title,
        description: PAGE_SEO.portfolio.description,
        images: [PAGE_SEO.portfolio.image],
    }
};

export default function PortfolioPage() {
    return <PortfolioClient />;
}
