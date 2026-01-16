import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
    const resendKey = process.env.RESEND_API_KEY;
    const isPlaceholder = resendKey === 're_YOUR_API_KEY_HERE' || !resendKey;
    const resend = new Resend(isPlaceholder ? '' : resendKey);

    try {
        if (isPlaceholder) {
            return NextResponse.json(
                { error: 'Email service not configured.' },
                { status: 503 }
            );
        }
        const body = await request.json();
        const { userId, campaignId, referralCode, userEmail, userName } = body;

        if (!userEmail || !campaignId || !userId) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // 1. Store in Database (Supabase)
        const supabase = await createClient();
        const { error: dbError } = await supabase
            .from('campaign_signups')
            .insert({
                user_id: userId,
                campaign_id: campaignId,
                referral_code: referralCode,
            });

        if (dbError) {
            console.error('Database insertion error:', dbError);
            // If it's a conflict (already signed up), we might want to still send emails or handle it
            if (dbError.code !== '23505') {
                return NextResponse.json({ error: 'Database signup failed' }, { status: 500 });
            }
        }

        // Send notification to business owner
        const { data, error } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'noreply@seranex.com',
            to: process.env.RESEND_TO_EMAIL || 'contact@seranex.com',
            subject: `🚀 New Campaign Signup - ${userName || userEmail}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%); padding: 30px; border-radius: 12px 12px 0 0;">
                        <h1 style="color: white; margin: 0; font-size: 24px;">🚀 New Campaign Signup!</h1>
                    </div>
                    
                    <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px;">
                        <p style="color: #374151; font-size: 16px; margin-bottom: 20px;">
                            Someone just joined the LKR 5,000 Website Campaign!
                        </p>
                        
                        <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #EF4444;">
                            <p style="margin: 5px 0;"><strong>Name:</strong> ${userName || 'Not provided'}</p>
                            <p style="margin: 5px 0;"><strong>Email:</strong> ${userEmail}</p>
                            <p style="margin: 5px 0;"><strong>Referral Code:</strong> <code style="background: #f3f4f6; padding: 2px 8px; border-radius: 4px;">${referralCode}</code></p>
                            <p style="margin: 5px 0;"><strong>Campaign:</strong> Website for LKR 5,000</p>
                        </div>
                        
                        <div style="background: #fef2f2; padding: 15px; border-radius: 8px; margin-top: 20px;">
                            <p style="color: #991b1b; margin: 0;">
                                <strong>📊 Next Steps:</strong><br>
                                User needs to refer 3 friends to qualify for the offer.
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

        // Send welcome email to user
        await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'noreply@seranex.com',
            to: userEmail,
            subject: `Welcome to the LKR 5,000 Website Campaign! 🎉`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 28px;">🎉 You're In!</h1>
                    </div>
                    
                    <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px;">
                        <p style="color: #374151; font-size: 18px; font-weight: bold;">
                            Welcome to the LKR 5,000 Website Campaign!
                        </p>
                        
                        <p style="color: #374151;">
                            You're just 3 referrals away from getting a professional website for only LKR 5,000!
                        </p>
                        
                        <div style="background: white; padding: 25px; border-radius: 8px; margin: 25px 0; border: 2px solid #EF4444;">
                            <h2 style="color: #EF4444; margin-top: 0;">Your Referral Code:</h2>
                            <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 2px; color: #1f2937;">
                                ${referralCode}
                            </div>
                        </div>
                        
                        <div style="background: #fef2f2; padding: 20px; border-radius: 8px;">
                            <h3 style="color: #991b1b; margin-top: 0;">How It Works:</h3>
                            <ol style="color: #374151; line-height: 1.8;">
                                <li>Share your referral link with friends</li>
                                <li>They sign up and log in to verify</li>
                                <li>After 3 verified referrals, you qualify!</li>
                                <li>Choose your domain and get your website</li>
                            </ol>
                        </div>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://seranex.org'}/campaign/website-5000" 
                               style="display: inline-block; background: #EF4444; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                                View Your Progress →
                            </a>
                        </div>
                        
                        <p style="color: #6b7280; font-size: 14px;">
                            Questions? We're here to help!
                        </p>
                        
                        <a href="https://wa.me/94728382638" 
                           style="display: inline-block; background: #25D366; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 10px 0;">
                            💬 Chat on WhatsApp
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
