import { NextResponse } from 'next/server';
import { verifyPayHereNotification, PayHereNotification } from '@/lib/payhere';

export async function POST(req: Request) {
    try {
        // PayHere sends notifications as application/x-www-form-urlencoded
        const formData = await req.formData();
        const data: any = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        const notification: PayHereNotification = data;
        const merchantSecret = process.env.PAYHERE_SECRET || 'MTM4ODg0MTczMTEyNTE2NzQ0ODQzMTk5MjMwNjg4OTgzMDIyMTM4';

        // 1. Verify the signature
        const isValid = verifyPayHereNotification(notification, merchantSecret);

        if (!isValid) {
            console.error('Invalid PayHere Signature for Order:', notification.order_id);
            return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
        }

        // 2. Process the payment
        if (notification.status_code === '2') {
            console.log(`Payment successful for Order ID: ${notification.order_id}`);

            // TODO: Update database using Prisma
            // Example:
            // await prisma.order.update({
            //     where: { id: notification.order_id },
            //     data: { status: 'PAID', payhere_payment_id: notification.payment_id }
            // });

        } else {
            console.log(`Payment failed or pending for Order ID: ${notification.order_id}. Status: ${notification.status_code}`);
        }

        // PayHere expects a 200 OK response
        return NextResponse.json({ status: 'success' });

    } catch (error) {
        console.error('PayHere Notification Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
