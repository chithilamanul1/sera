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

        const order = await prisma.order.update({
            where: { id },
            data: body,
        });

        return NextResponse.json({ order });
    } catch (error) {
        console.error('Error updating order:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
