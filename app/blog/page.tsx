import { Metadata } from 'next';
import { BlogClient } from './BlogClient';
import { PAGE_SEO } from '@/lib/seo';

export const metadata: Metadata = {
    title: PAGE_SEO.blog.title,
    description: PAGE_SEO.blog.description,
    keywords: PAGE_SEO.blog.keywords,
    openGraph: {
        title: PAGE_SEO.blog.title,
        description: PAGE_SEO.blog.description,
        images: [{ url: PAGE_SEO.blog.image, width: 1200, height: 630, alt: "Seranex Blog" }],
    },
    twitter: {
        title: PAGE_SEO.blog.title,
        description: PAGE_SEO.blog.description,
        images: [PAGE_SEO.blog.image],
    }
};

export default function BlogPage() {
    return <BlogClient />;
}
