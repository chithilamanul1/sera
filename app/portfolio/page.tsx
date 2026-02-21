'use client';

import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { Portfolio } from '@/components/ui/Portfolio';
import { FloatingIcons } from '@/components/ui/FloatingIcons';

export default function PortfolioPage() {
    return (
        <main className="min-h-screen bg-[#020617] text-foreground relative overflow-hidden">
            <Navbar />

            {/* Blue Glow Background */}
            <div className="bg-blue-glow" />

            {/* Floating Icons Background */}
            <FloatingIcons />

            <div className="relative z-10 pt-24 md:pt-32 pb-12 px-4 md:px-6">
                <div className="max-w-7xl mx-auto text-center mb-16">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-clash mb-6 uppercase italic tracking-tighter leading-[0.85] break-words text-cool px-2">Master Portfolio</h1>
                    <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto px-4">
                        Explore our curated selection of enterprise-grade applications,
                        AI systems, and digital architectures.
                    </p>
                </div>

                <div className="relative z-20">
                    <Portfolio />
                </div>
            </div>

            <Footer />
        </main>
    );
}
