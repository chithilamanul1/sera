'use server';

import prisma from '@/lib/prisma';
import { resend } from '@/lib/resend';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

export async function sendNewsletterBroadcast(subject: string, content: string) {
    const session = await auth();
    if (!session || session.user?.role !== 'ADMIN') {
        throw new Error('Unauthorized');
    }

    try {
        const subscribers = await prisma.newsletterSubscriber.findMany({
            where: { status: 'ACTIVE' }
        });

        if (subscribers.length === 0) {
            return { success: false, error: 'No active subscribers found.' };
        }

        const emails = subscribers.map(s => s.email);

        // Resend batch sending (limit is 100 per call for some plans, but we can iterate)
        // For simplicity, we use the broadcast method or a loop
        const { data, error } = await resend.emails.send({
            from: 'SeraNex Insights <info@seranex.org>',
            to: emails,
            subject: subject,
            html: `
                <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: auto; padding: 40px; color: #111; background: #fff; border: 1px solid #eee; border-radius: 20px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #007bff; margin: 0; font-weight: 900; letter-spacing: -1px;">SeraNex</h1>
                        <p style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Intelligence Dispatch</p>
                    </div>
                    <div style="font-size: 16px; line-height: 1.6;">
                        ${content.replace(/\n/g, '<br/>')}
                    </div>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;"/>
                    <div style="text-align: center; color: #999; font-size: 12px;">
                        <p>© 2026 SeraNex Modern UI. All rights reserved.</p>
                        <p>Seeduwa, Sri Lanka | Elite Engineering Studio</p>
                        <p style="margin-top: 10px;">
                            <a href="#" style="color: #007bff; text-decoration: none;">Unsubscribe</a> from this list.
                        </p>
                    </div>
                </div>
            `
        });

        if (error) {
            console.error('Resend Broadcast Error:', error);
            return { success: false, error: error.message };
        }

        return { success: true, count: emails.length };
    } catch (error: any) {
        console.error('Newsletter Broadcast Error:', error);
        return { success: false, error: error.message || 'Failed to send broadcast' };
    }
}

export async function deleteSubscriber(id: string) {
    const session = await auth();
    if (!session || session.user?.role !== 'ADMIN') {
        throw new Error('Unauthorized');
    }

    try {
        await prisma.newsletterSubscriber.delete({
            where: { id }
        });
        revalidatePath('/admin/newsletter');
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Failed to delete' };
    }
}
