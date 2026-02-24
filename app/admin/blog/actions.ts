'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

export async function saveBlogPost(formData: FormData) {
    const session = await auth();
    if (session?.user?.role !== 'ADMIN') {
        throw new Error("Unauthorized");
    }

    const id = formData.get('id') as string | null;
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const excerpt = formData.get('excerpt') as string;
    const content = formData.get('content') as string;
    const coverImage = formData.get('coverImage') as string;
    const category = formData.get('category') as string;
    const keywordsRaw = formData.get('keywords') as string;
    const readTime = parseInt(formData.get('readTime') as string || '5', 10);
    const published = formData.get('published') === 'on';
    const featured = formData.get('featured') === 'on';
    const executiveSummary = formData.get('executiveSummary') as string | null;

    const keywords = keywordsRaw.split(',').map(k => k.trim()).filter(Boolean);

    if (id) {
        // Update existing
        await prisma.blogPost.update({
            where: { id },
            data: {
                title, slug, excerpt, content, coverImage, category,
                keywords, readTime, published, featured, executiveSummary
            }
        });
    } else {
        // Create new
        await prisma.blogPost.create({
            data: {
                title, slug, excerpt, content, coverImage, category,
                keywords, readTime, published, featured, executiveSummary
            }
        });
    }

    revalidatePath('/blog');
    revalidatePath('/admin/blog');
    revalidatePath(`/blog/${slug}`);

    redirect('/admin/blog');
}

export async function deleteBlogPost(id: string) {
    const session = await auth();
    if (session?.user?.role !== 'ADMIN') {
        throw new Error("Unauthorized");
    }

    await prisma.blogPost.delete({
        where: { id }
    });

    revalidatePath('/blog');
    revalidatePath('/admin/blog');
}
