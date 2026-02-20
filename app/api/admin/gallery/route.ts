import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET() {
    try {
        const session = await auth();
        if (!session || session.user?.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const images = await prisma.galleryImage.findMany({
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json({ images });
    } catch (error) {
        console.error('Error fetching gallery images:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await auth();
        if (!session || session.user?.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { url, category } = await request.json();

        const image = await prisma.galleryImage.create({
            data: {
                url,
                category: category || 'PROJECT',
            },
        });

        return NextResponse.json({ image }, { status: 201 });
    } catch (error) {
        console.error('Error adding gallery image:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
