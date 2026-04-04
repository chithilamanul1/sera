import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET() {
    try {
        const ownerEmail = "info@seranex.org";
        const password = "SeraNexOwner2026!"; // Secure default password
        
        // Use a more robust check or just upsert
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.upsert({
            where: { email: ownerEmail },
            update: { 
                password: hashedPassword,
                role: "OWNER" 
            },
            create: {
                name: "SeraNex Owner",
                email: ownerEmail,
                password: hashedPassword,
                role: "OWNER"
            }
        });

        return NextResponse.json({ 
            success: true,
            message: "OWNER account provisioned successfully.",
            user: {
                email: user.email,
                role: user.role
            },
            instruction: "You can now login at /admin/login using these credentials."
        });
    } catch (error: any) {
        console.error("Init Error:", error);
        return NextResponse.json({ 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
}
