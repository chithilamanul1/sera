import { Metadata } from 'next';
import { ContactClient } from './ContactClient';
import { PAGE_SEO } from '@/lib/seo';

export const metadata: Metadata = {
    title: PAGE_SEO.contact.title,
    description: PAGE_SEO.contact.description,
    keywords: PAGE_SEO.contact.keywords,
    openGraph: {
        title: PAGE_SEO.contact.title,
        description: PAGE_SEO.contact.description,
        images: [{ url: PAGE_SEO.contact.image, width: 1200, height: 630, alt: "Contact Seranex" }],
    },
    twitter: {
        title: PAGE_SEO.contact.title,
        description: PAGE_SEO.contact.description,
        images: [PAGE_SEO.contact.image],
    }
};

export default function ContactPage() {
    return <ContactClient />;
}
