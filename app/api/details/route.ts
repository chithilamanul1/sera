import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, service, message } = body;

        // Simulate backend processing / database storage
        console.log('Lead Captured:', { name, email, service, message });

        // In a real app, you would save to DB or send email here

        return NextResponse.json({ success: true, message: 'Details received successfully' });
    } catch {
        return NextResponse.json({ success: false, message: 'Failed to process request' }, { status: 500 });
    }
}
