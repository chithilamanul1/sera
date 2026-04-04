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
    const published = formData.get('published') === 'true' || formData.get('published') === 'on';
    const featured = formData.get('featured') === 'true' || formData.get('featured') === 'on';
    
    // New Advanced SEO Fields
    const metaTitle = formData.get('metaTitle') as string | null;
    const metaDescription = formData.get('metaDescription') as string | null;
    const executiveSummary = formData.get('executiveSummary') as string | null;
    const faqsRaw = formData.get('faqs') as string | null;

    let faqs = [];
    try {
        faqs = faqsRaw ? JSON.parse(faqsRaw) : [];
    } catch (e) {
        console.error("Failed to parse FAQs", e);
    }

    const keywords = keywordsRaw.split(',').map(k => k.trim()).filter(Boolean);

    const data = {
        title, slug, excerpt, content, coverImage, category,
        keywords, readTime, published, featured, 
        metaTitle, metaDescription, executiveSummary, faqs
    };

    if (id) {
        // Update existing
        await prisma.blogPost.update({
            where: { id },
            data
        });
    } else {
        // Create new
        await prisma.blogPost.create({
            data
        });
    }

    revalidatePath('/blog');
    revalidatePath('/admin/blog');
    revalidatePath(`/blog/${slug}`);

    redirect('/admin/blog');
}

import { generateBlogSEO } from '@/lib/ai-seo';

export async function getAISuggestions(title: string, content: string) {
    const session = await auth();
    if (session?.user?.role !== 'ADMIN') {
        throw new Error("Unauthorized");
    }
    
    const results = await generateBlogSEO(title, content);
    return results;
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
