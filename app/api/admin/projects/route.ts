import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET() {
    try {
        const session = await auth();
        if (!session || session.user?.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const projects = await prisma.project.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                title: true,
                slug: true,
                category: true,
                imageUrl: true,
                techStack: true,
                createdAt: true,
            },
        });

        return NextResponse.json({ projects });
    } catch (error) {
        console.error('Error fetching projects:', error);
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
            role,
            vision,
            businessImpact,
            content,
            techStack,
            features,
            imageUrl,
            galleryImages,
            executiveSummary,
            caseStudy,
            category,
        } = body;

        const project = await prisma.project.create({
            data: {
                title,
                slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
                role,
                vision,
                businessImpact,
                content,
                techStack,
                features,
                imageUrl,
                galleryImages: galleryImages || [],
                executiveSummary,
                caseStudy,
                category,
            },
        });

        return NextResponse.json({ project }, { status: 201 });
    } catch (error) {
        console.error('Error creating project:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
