import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function CampaignBanner() {
    return (
        <div className="relative overflow-hidden bg-gradient-to-r from-accent/10 via-accent/5 to-transparent border-y border-accent/20 py-6">
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                        <div className="text-white font-bold text-lg">Limited Time: Website for LKR 5,000!</div>
                        <div className="text-silver/70 text-sm">Refer 3 friends and get an unbeatable deal</div>
                    </div>
                </div>

                <Link
                    href="/campaign/website-5000"
                    className="px-8 py-3 bg-accent text-white font-bold rounded-full hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 whitespace-nowrap"
                >
                    Join Campaign →
                </Link>
            </div>

            {/* Animated glow */}
            <div className="absolute inset-0 bg-accent/5 blur-3xl -z-10 animate-pulse" />
        </div>
    );
}
