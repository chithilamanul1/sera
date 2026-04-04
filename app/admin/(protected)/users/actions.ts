'use server';

import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcryptjs';

export async function updateUserRole(userId: string, role: string) {
    const session = await auth();
    if (!session || session.user?.role !== 'ADMIN' && session.user?.role !== 'OWNER') {
        throw new Error('Unauthorized');
    }

    try {
        await prisma.user.update({
            where: { id: userId },
            data: { role }
        });

        revalidatePath('/admin/users');
        return { success: true };
    } catch (error) {
        console.error('Update Role Error:', error);
        return { success: false, error: 'Failed to update role' };
    }
}

export async function deleteUser(userId: string) {
    const session = await auth();
    if (!session || session.user?.role !== 'ADMIN' && session.user?.role !== 'OWNER') {
        throw new Error('Unauthorized');
    }

    try {
        await prisma.user.delete({
            where: { id: userId }
        });

        revalidatePath('/admin/users');
        return { success: true };
    } catch (error) {
        console.error('Delete User Error:', error);
        return { success: false, error: 'Failed to delete user' };
    }
}

export async function createAdmin(data: { name: string, email: string, password: string, role: string }) {
    const session = await auth();
    if (!session || session.user?.role !== 'OWNER') {
        throw new Error('Unauthorized');
    }

    try {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        
        await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                role: data.role as any
            }
        });

        revalidatePath('/admin/users');
        return { success: true };
    } catch (error: any) {
        console.error('Create Admin Error:', error);
        return { success: false, error: error.message || 'Failed to create account' };
    }
}
