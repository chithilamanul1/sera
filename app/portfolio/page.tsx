'use client';

import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { Portfolio } from '@/components/ui/Portfolio';
import { FloatingIcons } from '@/components/ui/FloatingIcons';

export default function PortfolioPage() {
    return (
        <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
            <Navbar />

            {/* Floating Icons Background */}
            <FloatingIcons />

            <div className="relative z-10 pt-32 pb-12 px-6">
                <div className="max-w-7xl mx-auto text-center mb-16">
                    <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold font-clash mb-6 uppercase italic tracking-tighter leading-[0.85] break-words">Master Portfolio</h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
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
