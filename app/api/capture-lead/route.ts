import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const resend = new Resend(process.env.RESEND_API_KEY || '');

    try {
        const body = await request.json();
        const { email, phone } = body;

        // Validate inputs
        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        // Send notification to business owner
        const { data, error } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'noreply@seranex.com',
            to: process.env.RESEND_TO_EMAIL || 'contact@seranex.com',
            subject: `🎁 New Exit Intent Lead Captured!`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%); padding: 30px; border-radius: 12px 12px 0 0;">
                        <h1 style="color: white; margin: 0; font-size: 24px;">🎁 New Exit Intent Lead!</h1>
                    </div>
                    
                    <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px;">
                        <p style="color: #374151; font-size: 16px; margin-bottom: 20px;">
                            Someone was about to leave your site but we captured their info!
                        </p>
                        
                        <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #EF4444;">
                            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
                            <p style="margin: 5px 0;"><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                            <p style="margin: 5px 0;"><strong>Source:</strong> Exit Intent Popup</p>
                            <p style="margin: 5px 0;"><strong>Offer:</strong> Free 15-Minute Consultation</p>
                        </div>
                        
                        <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
                            <strong>Action Required:</strong> Contact this lead within 24 hours to schedule their free consultation.
                        </p>
                        
                        <p style="color: #9ca3af; font-size: 12px; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 15px;">
                            Received: ${new Date().toLocaleString('en-LK', { timeZone: 'Asia/Colombo' })}
                        </p>
                    </div>
                </div>
            `,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json(
                { error: 'Failed to send email' },
                { status: 500 }
            );
        }

        // Send confirmation to lead
        await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'noreply@seranex.com',
            to: email,
            subject: 'Your Free Consultation is Confirmed! 🎉',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 28px;">🎉 You're All Set!</h1>
                    </div>
                    
                    <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px;">
                        <p style="color: #374151; font-size: 16px;">
                            Thank you for your interest in Seranex! We're excited to help you build your dream website.
                        </p>
                        
                        <div style="background: white; padding: 25px; border-radius: 8px; margin: 25px 0; border: 2px solid #EF4444;">
                            <h2 style="color: #EF4444; margin-top: 0;">What Happens Next?</h2>
                            <ul style="color: #374151; line-height: 1.8;">
                                <li>We'll contact you within <strong>24 hours</strong></li>
                                <li>Schedule your <strong>FREE 15-minute consultation</strong></li>
                                <li>Discuss your website requirements</li>
                                <li>Get a custom quote for your project</li>
                            </ul>
                        </div>
                        
                        <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <p style="color: #991b1b; margin: 0; text-align: center;">
                                <strong>🔥 Special Offer:</strong> Get your website for only LKR 5,000!<br>
                                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://seranex.org'}/campaign/website-5000" 
                                   style="color: #EF4444; text-decoration: none; font-weight: bold;">
                                    Learn More →
                                </a>
                            </p>
                        </div>
                        
                        <p style="color: #374151;">
                            Need immediate assistance?
                        </p>
                        
                        <a href="https://wa.me/94728382638" 
                           style="display: inline-block; background: #25D366; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 10px 0;">
                            💬 Message on WhatsApp
                        </a>
                        
                        <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
                            Best regards,<br>
                            <strong>The Seranex Team</strong>
                        </p>
                    </div>
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
