import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await auth();
        if (!session || session.user?.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        const lead = await prisma.lead.update({
            where: { id },
            data: body,
        });

        return NextResponse.json({ lead });
    } catch (error) {
        console.error('Error updating lead:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
