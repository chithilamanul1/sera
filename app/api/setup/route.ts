import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const adminEmail = "chithilamanul1@gmail.com";
        const adminPassword = "chithila123@";
        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        const admin = await prisma.user.upsert({
            where: { email: adminEmail },
            update: {
                role: "ADMIN",
                password: hashedPassword,
                name: "Admin Chithila"
            },
            create: {
                email: adminEmail,
                name: "Admin Chithila",
                password: hashedPassword,
                role: "ADMIN"
            }
        });

        // Seed some initial blogs from the static file into the DB just for testing
        // Only if there are no blogs currently in the DB
        const blogCount = await prisma.blogPost.count();
        if (blogCount === 0) {
            const { blogPosts } = await import('@/lib/blog/posts');
            for (const post of blogPosts) {
                await prisma.blogPost.create({
                    data: {
                        title: post.title,
                        slug: post.slug,
                        excerpt: post.excerpt,
                        content: post.content,
                        coverImage: post.coverImage,
                        category: post.category,
                        keywords: post.keywords,
                        readTime: post.readTime,
                        published: true,
                        featured: post.featured || false,
                        executiveSummary: post.executiveSummary || null,
                        faqs: (post as any).faqs || null,
                    }
                });
            }
            return NextResponse.json({ message: "Admin seeded and blog posts migrated. IMPORTANT: Ensure you have run 'npx prisma generate' and pushed schema changes.", email: admin.email });
        }

        return NextResponse.json({ message: "Admin seeded securely.", email: admin.email });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to seed." }, { status: 500 });
    }
}
