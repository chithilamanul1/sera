import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { resend } from '@/lib/resend';

export async function POST(req: Request) {
    try {
        const { email, name } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // Check if subscriber already exists
        const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
            where: { email }
        });

        if (existingSubscriber) {
            if (existingSubscriber.status === 'ACTIVE') {
                return NextResponse.json({ message: 'Already subscribed!' }, { status: 200 });
            } else {
                // Re-subscribe
                await prisma.newsletterSubscriber.update({
                    where: { email },
                    data: { status: 'ACTIVE' }
                });
            }
        } else {
            // Create new subscriber
            await prisma.newsletterSubscriber.create({
                data: { email, name }
            });
        }

        // Send welcome email via Resend
        try {
            await resend.emails.send({
                from: 'SeraNex <info@seranex.org>',
                to: email,
                subject: 'Welcome to SeraNex Insights!',
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; color: #333;">
                        <h1 style="color: #007bff;">Welcome to SeraNex!</h1>
                        <p>Hi ${name || 'there'},</p>
                        <p>Thank you for subscribing to our newsletter! You'll now receive the latest insights on Agentic AI, Enterprise Software, and high-performance digital transformation in Sri Lanka.</p>
                        <p>Stay tuned for our next update.</p>
                        <br/>
                        <p>Best regards,<br/>The SeraNex Team</p>
                        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;"/>
                        <p style="font-size: 12px; color: #999;">If you didn't sign up for this, please ignore this email.</p>
                    </div>
                `
            });
        } catch (mailError) {
            console.error("Resend delivery failed:", mailError);
            // We don't fail the subscription if the mail fails, but we log it
        }

        return NextResponse.json({ message: 'Successfully subscribed!' }, { status: 200 });
    } catch (error) {
        console.error('Newsletter Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
