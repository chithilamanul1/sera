import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { BlogEditor } from '../components/BlogEditor';

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const post = await prisma.blogPost.findUnique({
        where: { id }
    });

    if (!post) {
        notFound();
    }

    // Convert Date objects or other unsupported data types to plain objects/strings for client component
    const safePost = {
        ...post,
        keywords: post.keywords ? (Array.isArray(post.keywords) ? post.keywords : undefined) : undefined,
    };

    return <BlogEditor initialData={safePost as any} />;
}
