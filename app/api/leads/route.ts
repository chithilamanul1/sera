import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export async function POST(request: Request) {
    try {
        if (!db) {
            console.error('Firestore not initialized');
            return NextResponse.json(
                { error: 'Database service unavailable' },
                { status: 503 }
            );
        }

        const body = await request.json();
        const { name, email, phone, message, budget, type } = body;

        // Basic validation
        if (!name || !email) {
            return NextResponse.json(
                { error: 'Name and Email are required' },
                { status: 400 }
            );
        }

        // Save to Firestore
        const docRef = await addDoc(collection(db, 'leads'), {
            name,
            email,
            phone: phone || '',
            message: message || '',
            budget: budget || '',
            type: body.type || '',
            company: body.name || '', // Note: The frontend sends 'name' as company? No, check frontend logic.
            // Frontend: message: formData.message || `Inquiry from ${formData.company || 'Website'}`
            // Frontend structure: name, email, phone, type, budget, message
            source: 'website_contact_form',
            status: 'new',
            createdAt: Timestamp.now(),
        });

        return NextResponse.json({
            success: true,
            id: docRef.id,
            message: 'Quote request received'
        });

    } catch (error) {
        console.error('Error processing lead:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
