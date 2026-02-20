import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET() {
    try {
        const session = await auth();
        if (!session || session.user?.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const posts = await prisma.blogPost.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                title: true,
                slug: true,
                excerpt: true,
                category: true,
                published: true,
                featured: true,
                views: true,
                createdAt: true,
            },
        });

        return NextResponse.json({ posts });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await auth();
        if (!session || session.user?.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const {
            title,
            slug,
            excerpt,
            content,
            coverImage,
            category,
            keywords,
            readTime,
            published,
            featured,
            executiveSummary,
        } = body;

        const post = await prisma.blogPost.create({
            data: {
                title,
                slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
                excerpt,
                content,
                coverImage,
                category,
                keywords: keywords || [],
                readTime: readTime || 5,
                published: published || false,
                featured: featured || false,
                executiveSummary,
            },
        });

        return NextResponse.json({ post }, { status: 201 });
    } catch (error) {
        console.error('Error creating blog post:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
