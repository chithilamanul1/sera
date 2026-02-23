import { Metadata } from 'next';
import { ServicesClient } from './ServicesClient';
import { PAGE_SEO } from '@/lib/seo';

export const metadata: Metadata = {
    title: PAGE_SEO.services.title,
    description: PAGE_SEO.services.description,
    keywords: PAGE_SEO.services.keywords,
    openGraph: {
        title: PAGE_SEO.services.title,
        description: PAGE_SEO.services.description,
        images: [{ url: PAGE_SEO.services.image, width: 1200, height: 630, alt: "Seranex Services" }],
    },
    twitter: {
        title: PAGE_SEO.services.title,
        description: PAGE_SEO.services.description,
        images: [PAGE_SEO.services.image],
    }
};

export default function AllServicesPage() {
    return <ServicesClient />;
}
