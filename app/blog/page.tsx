import { Metadata } from 'next';
import { BlogClient } from './BlogClient';
import { PAGE_SEO } from '@/lib/seo';
import prisma from '@/lib/prisma';

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

// Force dynamic fetch to ensure latest posts
export const dynamic = 'force-dynamic';

export default async function BlogPage() {
    const rawPosts = await prisma.blogPost.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' }
    });

    const safePosts = rawPosts.map(post => ({
        ...post,
        keywords: Array.isArray(post.keywords) ? post.keywords : (post.keywords ? [post.keywords as string] : [])
    }));

    return <BlogClient posts={safePosts as any} />;
}
