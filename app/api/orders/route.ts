import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    // Lead generation: Allow unauthenticated submissions
    const session = await auth();

    try {
        const data = await req.json();

        // Log data for debugging 500 errors
        console.log("Creating order with data:", JSON.stringify(data, null, 2));

        const order = await prisma.order.create({
            data: {
                userId: session?.user ? (session.user as any).id : null,
                serviceType: data.serviceType || "Unknown",
                price: Number(data.price) || 0,
                quoteData: data.quoteData || {}, // Ensure it's not null/undefined
                status: "PENDING",
            },
        });

        return NextResponse.json(order);
    } catch (error: any) {
        console.error("Order Creation Error Detailed:", {
            message: error.message,
            stack: error.stack,
            code: error.code // Prisma error codes
        });
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}

export async function GET(req: Request) {
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const orders = await prisma.order.findMany({
            where: {
                userId: (session.user as any).id,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(orders);
    } catch (error) {
        console.error("Order Fetch Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
