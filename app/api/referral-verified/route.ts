import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { referrerEmail, referrerName, referredEmail, referredName, referralCode } = body;

        // Validate inputs
        if (!referrerEmail || !referredEmail) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Send notification to business owner
        const { data, error } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'noreply@seranex.com',
            to: process.env.RESEND_TO_EMAIL || 'contact@seranex.com',
            subject: `✅ Referral Verified - ${referrerName || referrerEmail}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 12px 12px 0 0;">
                        <h1 style="color: white; margin: 0; font-size: 24px;">✅ Referral Verified!</h1>
                    </div>
                    
                    <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px;">
                        <p style="color: #374151; font-size: 16px; margin-bottom: 20px;">
                            A referral has been verified for the LKR 5,000 Website Campaign!
                        </p>
                        
                        <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981;">
                            <p style="margin: 5px 0;"><strong>Referrer:</strong> ${referrerName || referrerEmail}</p>
                            <p style="margin: 5px 0;"><strong>Referrer Email:</strong> ${referrerEmail}</p>
                            <p style="margin: 10px 0 5px; color: #6b7280; font-size: 14px;">Referred:</p>
                            <p style="margin: 5px 0;"><strong>Name:</strong> ${referredName || 'Not provided'}</p>
                            <p style="margin: 5px 0;"><strong>Email:</strong> ${referredEmail}</p>
                            <p style="margin: 5px 0;"><strong>Code Used:</strong> <code style="background: #f3f4f6; padding: 2px 8px; border-radius: 4px;">${referralCode}</code></p>
                        </div>
                        
                        <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; margin-top: 20px;">
                            <p style="color: #065f46; margin: 0;">
                                <strong>🎯 Progress Update:</strong><br>
                                Check the campaign dashboard to see if ${referrerName || referrerEmail} has qualified!
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

        // Send congratulations email to referrer
        await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'noreply@seranex.com',
            to: referrerEmail,
            subject: `🎉 Referral Verified! One Step Closer!`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Great News!</h1>
                    </div>
                    
                    <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px;">
                        <p style="color: #374151; font-size: 18px; font-weight: bold;">
                            Your referral has been verified!
                        </p>
                        
                        <p style="color: #374151;">
                            ${referredName || 'Your friend'} just signed up using your referral code. You're one step closer to getting your website for only LKR 5,000!
                        </p>
                        
                        <div style="background: white; padding: 25px; border-radius: 8px; margin: 25px 0; border: 2px solid #10b981; text-align: center;">
                            <h2 style="color: #10b981; margin-top: 0;">Keep Sharing!</h2>
                            <p style="color: #374151; font-size: 16px;">
                                Share your link with 2 more friends to qualify for the offer!
                            </p>
                            <div style="margin: 20px 0;">
                                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://seranex.org'}/campaign/website-5000" 
                                   style="display: inline-block; background: #10b981; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                                    View Progress →
                                </a>
                            </div>
                        </div>
                        
                        <div style="background: #fef2f2; padding: 20px; border-radius: 8px;">
                            <p style="color: #991b1b; margin: 0; text-align: center;">
                                <strong>💡 Pro Tip:</strong> Share on WhatsApp groups & Facebook for faster results!
                            </p>
                        </div>
                        
                        <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
                            Questions about the campaign?
                        </p>
                        
                        <a href="https://wa.me/94728382638" 
                           style="display: inline-block; background: #25D366; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 10px 0;">
                            💬 Ask on WhatsApp
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
