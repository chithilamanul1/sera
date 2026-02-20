import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET() {
    try {
        const session = await auth();
        if (!session || session.user?.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // In a real app, we might store settings in a separate collection or a single doc
        // For now, let's just return a placeholder or implement a basic settings model if it exists
        // Since we don't have a Settings model in schema.prisma, we could store it in a special "Config" model
        // but let's check the schema first.

        return NextResponse.json({
            settings: {
                siteName: 'Seranex',
                siteDescription: 'Enterprise AI & Agentic Software Architecture',
                contactEmail: 'contact@seranex.com',
                contactPhone: '+94 XX XXX XXXX',
                serviceDemoUrls: {
                    'web-development': 'https://chithilamanul.online/',
                    'mobile-applications': 'https://srilankantaxi.lk/',
                    'ai-solutions': 'https://chithilamanul.online/',
                    'custom-software': 'https://novalink.lk/',
                    'crm-systems': 'https://dash.novalink.lk/auth/login',
                    'pos-systems': 'https://jayanthamotors.site/',
                }
            }
        });
    } catch (error) {
        console.error('Error fetching settings:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await auth();
        if (!session || session.user?.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        // We would persist this to the DB here.
        // For now, since schema doesn't have a Settings model, we'll just log it and return success.
        console.log('Update Settings:', body);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating settings:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
