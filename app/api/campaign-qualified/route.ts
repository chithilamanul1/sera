import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const resend = new Resend(process.env.RESEND_API_KEY || '');

    try {
        const body = await request.json();
        const { userEmail, userName, referralCount, referralCode } = body;

        // Validate inputs
        if (!userEmail) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        // Send notification to business owner
        const { data, error } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'noreply@seranex.com',
            to: process.env.RESEND_TO_EMAIL || 'contact@seranex.com',
            subject: `🏆 Campaign Qualified - ${userName || userEmail}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 30px; border-radius: 12px 12px 0 0;">
                        <h1 style="color: white; margin: 0; font-size: 24px;">🏆 Campaign Qualified!</h1>
                    </div>
                    
                    <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px;">
                        <p style="color: #374151; font-size: 16px; margin-bottom: 20px;">
                            <strong>${userName || userEmail}</strong> has completed 3 referrals and qualified for the LKR 5,000 website!
                        </p>
                        
                        <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b;">
                            <p style="margin: 5px 0;"><strong>Name:</strong> ${userName || 'Not provided'}</p>
                            <p style="margin: 5px 0;"><strong>Email:</strong> ${userEmail}</p>
                            <p style="margin: 5px 0;"><strong>Referrals:</strong> ${referralCount}/3 ✅</p>
                            <p style="margin: 5px 0;"><strong>Code:</strong> <code style="background: #f3f4f6; padding: 2px 8px; border-radius: 4px;">${referralCode}</code></p>
                        </div>
                        
                        <div style="background: #fffbeb; padding: 15px; border-radius: 8px; margin-top: 20px;">
                            <p style="color: #92400e; margin: 0;">
                                <strong>⚡ Action Required:</strong><br>
                                Contact this customer to collect their requirements and build their website!
                            </p>
                        </div>
                        
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

        // Send congratulations email to qualified user
        await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'noreply@seranex.com',
            to: userEmail,
            subject: `🏆 Congratulations! You've Qualified for LKR 5,000 Website!`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 40px; border-radius: 12px 12px 0 0; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 32px;">🏆 Congratulations!</h1>
                        <p style="color: white; font-size: 18px; margin: 10px 0 0;">You Did It!</p>
                    </div>
                    
                    <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px;">
                        <p style="color: #374151; font-size: 18px; font-weight: bold; text-align: center;">
                            You've successfully referred 3 friends!
                        </p>
                        
                        <div style="background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%); padding: 30px; border-radius: 12px; margin: 25px 0; text-align: center;">
                            <p style="color: #92400e; font-size: 16px; margin: 0 0 15px;">
                                You're now eligible for:
                            </p>
                            <h2 style="color: #78350f; margin: 0; font-size: 36px;">
                                Professional Website<br>
                                <span style="color: #f59e0b;">LKR 5,000 Only!</span>
                            </h2>
                            <p style="color: #92400e; font-size: 14px; margin: 15px 0 0;">
                                + Free Domain for 1 Year
                            </p>
                        </div>
                        
                        <div style="background: white; padding: 25px; border-radius: 8px; margin: 25px 0; border: 2px solid #f59e0b;">
                            <h3 style="color: #f59e0b; margin-top: 0;">What Happens Next?</h3>
                            <ol style="color: #374151; line-height: 2;">
                                <li><strong>We'll contact you within 24 hours</strong></li>
                                <li>Discuss your website requirements</li>
                                <li>Choose your domain (.online, .site, .tech FREE or upgrade to .com)</li>
                                <li>We build your professional website</li>
                                <li>Launch in 5-7 days! 🚀</li>
                            </ol>
                        </div>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://seranex.org'}/campaign/website-5000" 
                               style="display: inline-block; background: #f59e0b; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                                View Your Campaign Dashboard
                            </a>
                        </div>
                        
                        <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <p style="color: #991b1b; margin: 0; text-align: center;">
                                <strong>Can't Wait?</strong><br>
                                Contact us on WhatsApp to get started immediately!
                            </p>
                        </div>
                        
                        <div style="text-align: center; margin: 20px 0;">
                            <a href="https://wa.me/94728382638" 
                               style="display: inline-block; background: #25D366; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                                💬 Message on WhatsApp
                            </a>
                        </div>
                        
                        <p style="color: #6b7280; font-size: 14px; margin-top: 40px; text-align: center;">
                            Thank you for choosing Seranex!<br>
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
