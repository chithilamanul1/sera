'use client';

import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { EnterpriseShowcase } from '@/components/ui/EnterpriseShowcase';
import { InteractiveConstellation } from '@/components/ui/InteractiveConstellation';
import BlurText from '@/components/ui/BlurText';

export default function SolutionsPage() {
    return (
        <main className="relative min-h-screen bg-background text-foreground selection:bg-blue-500/30">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 min-h-[60vh] flex flex-col items-center justify-center text-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <InteractiveConstellation />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
                        <span className="text-xs font-mono tracking-widest text-blue-400 uppercase">
                            System Architecture
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black font-sans uppercase tracking-tighter mb-8">
                        <BlurText text="ENTERPRISE SOLUTIONS" delay={50} />
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                        Scalable infrastructure, AI-native applications, and sovereign financial systems.
                    </p>
                </div>
            </section>

            {/* Showcase Section */}
            <EnterpriseShowcase />

            {/* Additional Content...? */}

            <Footer />
        </main>
    );
}
