'use server';

import prisma from '@/lib/prisma';
import nodemialer from 'nodemailer';

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
const ADMIN_EMAIL = 'chithilamanul1@gmail.com';

export async function submitBooking(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const packageType = formData.get('package') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !packageType) {
        return { success: false, error: 'Missing required fields' };
    }

    try {
        // 1. Save to Database
        const booking = await prisma.booking.create({
            data: {
                name,
                email,
                package: packageType,
                message,
            },
        });

        // 2. Send Discord Notification
        if (DISCORD_WEBHOOK_URL) {
            await fetch(DISCORD_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: `**New Booking Alert! 🚀**\n\n**Client:** ${name}\n**Email:** ${email}\n**Package:** ${packageType}\n**Message:** ${message || 'No message'}\n\n*Check Admin Panel for details.*`,
                }),
            });
        }

        // 3. Send Email Notification (Nodemailer)
        // Configure your SMTP credentials in .env
        const transporter = nodemialer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: ADMIN_EMAIL,
            subject: `New Seranex Booking: ${packageType} - ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nPackage: ${packageType}\nMessage: ${message}`,
        };

        // Attempt to send email, but don't fail the request if it fails (optional)
        try {
            if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
                await transporter.sendMail(mailOptions);
            }
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
        }

        return { success: true, bookingId: booking.id };

    } catch (error) {
        console.error('Booking submission error:', error);
        return { success: false, error: 'Failed to submit booking' };
    }
}
