import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth();

    if (!session?.user || (session.user as any).role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const totalLeads = await prisma.lead.count();
        const totalOrders = await prisma.order.count();
        const totalUsers = await prisma.user.count();

        const recentLeads = await prisma.lead.findMany({
            take: 5,
            orderBy: { createdAt: "desc" }
        });

        const recentOrders = await prisma.order.findMany({
            take: 5,
            orderBy: { createdAt: "desc" },
            include: { user: true }
        });

        return NextResponse.json({
            stats: {
                totalLeads,
                totalOrders,
                totalUsers,
            },
            recentLeads,
            recentOrders
        });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
