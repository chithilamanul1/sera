import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET() {
    try {
        const ownerEmail = "info@seranex.org";
        const password = "SeraNexOwner2026!"; // Temporary secure password
        
        const existing = await prisma.user.findUnique({
            where: { email: ownerEmail }
        });

        if (existing && existing.password) {
            return NextResponse.json({ message: "Owner already initialized." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        if (existing) {
            await prisma.user.update({
                where: { email: ownerEmail },
                data: { password: hashedPassword, role: "OWNER" }
            });
        } else {
            await prisma.user.create({
                data: {
                    name: "SeraNex Owner",
                    email: ownerEmail,
                    password: hashedPassword,
                    role: "OWNER"
                }
            });
        }

        return NextResponse.json({ 
            message: "OWNER account initialized successfully.",
            email: ownerEmail,
            password: "Change this immediately!"
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
