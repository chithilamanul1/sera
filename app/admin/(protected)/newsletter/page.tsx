import prisma from '@/lib/prisma';
import { NewsletterDashboard } from './components/NewsletterDashboard';
import { Mail, Users, Send } from 'lucide-react';

export default async function AdminNewsletterPage() {
    const subscribers = await prisma.newsletterSubscriber.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-8 p-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter text-white mb-2 flex items-center gap-3">
                        <Mail className="text-blue-500" />
                        Intelligence <span className="text-zinc-500">Dispatch</span>
                    </h1>
                    <p className="text-zinc-500 text-sm font-medium">Bulk email broadcasts via Resend Enterprise.</p>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center gap-3">
                        <Users className="text-blue-500 w-5 h-5" />
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 leading-none">Subscribers</p>
                            <p className="text-xl font-black text-white">{subscribers.length}</p>
                        </div>
                    </div>
                </div>
            </div>

            <NewsletterDashboard initialSubscribers={subscribers as any} />
        </div>
    );
}
