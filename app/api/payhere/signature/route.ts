import { NextResponse } from 'next/server';
import { generatePayHereSignature } from '@/lib/payhere';

export async function POST(req: Request) {
    try {
        const { order_id, amount, currency } = await req.json();

        const merchantId = process.env.PAYHERE_MERCHANT_ID || '1226784'; // Sandbox fallback
        const merchantSecret = process.env.PAYHERE_SECRET || 'MTM4ODg0MTczMTEyNTE2NzQ0ODQzMTk5MjMwNjg4OTgzMDIyMTM4'; // Sandbox fallback

        if (!order_id || !amount || !currency) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const signature = generatePayHereSignature(
            merchantId,
            merchantSecret,
            order_id,
            amount,
            currency
        );

        return NextResponse.json({ signature, merchantId });
    } catch (error) {
        console.error('PayHere Signature Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
