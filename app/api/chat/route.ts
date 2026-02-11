import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { message } = body;

        // Simple mock response logic for "Seranex Assistant"
        let reply = "I'm here to help with Seranex services.";

        if (message.toLowerCase().includes('restaurant') || message.toLowerCase().includes('road house')) {
            reply = "For restaurants like Road House Restro, Seranex can implement a full POS system, inventory management, and a custom booking website. We simulated a 30% efficiency increase in similar projects.";
        } else if (message.toLowerCase().includes('web')) {
            reply = "Our web development service uses Next.js and 3D interactives to create high-converting, premium sites.";
        } else if (message.toLowerCase().includes('price') || message.toLowerCase().includes('cost')) {
            reply = "Our pricing is tailored to your project's scope. Please submit a request on our services page for a quote.";
        }

        return NextResponse.json({ reply });
    } catch {
        return NextResponse.json({ error: 'Failed to process chat' }, { status: 500 });
    }
}
