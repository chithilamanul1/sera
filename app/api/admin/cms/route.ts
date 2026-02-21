import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
    try {
        let config = await prisma.siteConfig.findFirst();

        // If no config exists, create a default one
        if (!config) {
            config = await prisma.siteConfig.create({
                data: {
                    heroTitle: "WE BUILD SCALABLE WEB & MOBILE APPS",
                    heroSubtitle: "From next-gen SaaS platforms to enterprise mobile solutions.",
                    aboutTitle: "The Ecosystem",
                    aboutContent: "Everything you need to scale, secured by next-gen architecture.",
                    contactEmail: "info@seranex.lk",
                    contactPhone: "0728382638",
                    retailTitle: "Modern Retail",
                    retailDesc: "AI-driven inventory, personalized commerce, and 60FPS shopping experiences.",
                    fintechTitle: "Fintech Sovereignty",
                    fintechDesc: "Secure, high-load payment gateways and audited digital asset infrastructure.",
                    logisticsTitle: "Logistics Engine",
                    logisticsDesc: "Real-time fleet tracking, geofencing, and automated matching engines."
                }
            });
        }

        return NextResponse.json(config);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    const session = await auth();
    if (!session || (session.user as any).role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const data = await req.json();
        const config = await prisma.siteConfig.findFirst();

        if (!config) {
            const newConfig = await prisma.siteConfig.create({ data });
            return NextResponse.json(newConfig);
        }

        const updatedConfig = await prisma.siteConfig.update({
            where: { id: config.id },
            data
        });

        return NextResponse.json(updatedConfig);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
