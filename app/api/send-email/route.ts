import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
    const resend = new Resend(process.env.RESEND_API_KEY || '');

    try {
        const body = await request.json();
        const { name, email, phone, service, message } = body;

        // Validate inputs
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // 1. Store in Database (Supabase)
        const supabase = await createClient();
        const { error: dbError } = await supabase
            .from('messages')
            .insert({
                name,
                email,
                phone,
                service,
                message,
                status: 'unread' // Default status
            });

        if (dbError) {
            console.error('Database insertion error:', dbError);
            // We continue to send email even if DB fails, but log it.
        }

        // Send email to business owner
        const { data, error } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'noreply@seranex.com',
            to: process.env.RESEND_TO_EMAIL || 'contact@seranex.com',
            subject: `New Contact Form Submission from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #EF4444;">New Contact Form Submission</h2>
                    <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                        <p><strong>Service:</strong> ${service || 'Not specified'}</p>
                    </div>
                    <div style="margin: 20px 0;">
                        <h3 style="color: #333;">Message:</h3>
                        <p style="background: #fff; padding: 15px; border-left: 4px solid #EF4444; border-radius: 4px;">
                            ${message}
                        </p>
                    </div>
                    <p style="color: #666; font-size: 12px; margin-top: 30px;">
                        Received: ${new Date().toLocaleString('en-LK', { timeZone: 'Asia/Colombo' })}
                    </p>
                </div>
            `,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json(
                { error: error.message || 'Failed to send email' },
                { status: 500 }
            );
        }

        // Optional: Send confirmation email to customer
        await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'noreply@seranex.com',
            to: email,
            subject: 'Thank you for contacting Seranex!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #EF4444;">Thank You, ${name}!</h2>
                    <p>We've received your message and will get back to you within 24 hours.</p>
                    <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>Your Message:</strong></p>
                        <p style="background: #fff; padding: 15px; border-radius: 4px;">${message}</p>
                    </div>
                    <p>Need urgent assistance? Contact us on WhatsApp:</p>
                    <a href="https://wa.me/94728382638" style="display: inline-block; background: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0;">
                        Message on WhatsApp
                    </a>
                    <p style="color: #666; font-size: 12px; margin-top: 30px;">
                        Best regards,<br>
                        <strong>Seranex Team</strong>
                    </p>
                </div>
            `,
        });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
