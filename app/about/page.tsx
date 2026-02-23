import { Metadata } from 'next';
import { AboutClient } from './AboutClient';
import { PAGE_SEO } from '@/lib/seo';

export const metadata: Metadata = {
    title: PAGE_SEO.about.title,
    description: PAGE_SEO.about.description,
    keywords: PAGE_SEO.about.keywords,
    openGraph: {
        title: PAGE_SEO.about.title,
        description: PAGE_SEO.about.description,
        images: [{ url: PAGE_SEO.about.image, width: 1200, height: 630, alt: "Seranex About" }],
    },
    twitter: {
        title: PAGE_SEO.about.title,
        description: PAGE_SEO.about.description,
        images: [PAGE_SEO.about.image],
    }
};

export default function AboutPage() {
    return <AboutClient />;
}
