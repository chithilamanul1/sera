'use client';

import { RateUs } from '@/components/ui/RateUs';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function RateUsPage() {
    return (
        <main className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-8 left-8"
            >
                <Link
                    href="/"
                    className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>
            </motion.div>

            <div className="w-full max-w-md relative z-10">
                <RateUs
                    onClose={() => window.location.href = '/'}
                />
            </div>

            <p className="mt-8 text-zinc-600 text-[10px] uppercase tracking-[0.2em]">
                Seranex Engineering &middot; Quality Assurance
            </p>
        </main>
    );
}
