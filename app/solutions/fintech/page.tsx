
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { Landmark, ArrowRight, Shield, Globe, Lock } from 'lucide-react';
import Link from 'next/link';

export default function FintechSolution() {
    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-amber-500/30">
            <Navbar />

            <section className="pt-48 pb-24 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-16 items-center">
                    <div className="flex-1 space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-widest">
                            Fintech & Finance
                        </div>
                        <h1 className="text-6xl md:text-8xl font-bold font-syne tracking-tighter italic leading-tight">
                            Institutional <br /><span className="text-zinc-500">Security Layers.</span>
                        </h1>
                        <p className="text-zinc-400 text-xl leading-relaxed max-w-xl">
                            We architect immutable financial infrastructure, high-load payment rails, and zero-trust asset management systems for the global economy.
                        </p>
                        <div className="flex gap-4">
                            <Link href="/quote" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-all">
                                Initialize Audit
                            </Link>
                        </div>
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-4">
                        <div className="p-8 rounded-[3rem] bg-zinc-900 border border-white/5 flex flex-col justify-between aspect-square">
                            <Shield className="w-8 h-8 text-amber-400" />
                            <div>
                                <span className="text-4xl font-bold block mb-2">100%</span>
                                <span className="text-xs text-zinc-500 uppercase font-black tracking-widest">Audit Transparency</span>
                            </div>
                        </div>
                        <div className="p-8 rounded-[3rem] bg-zinc-900 border border-white/5 flex flex-col justify-between aspect-square translate-y-12">
                            <Lock className="w-8 h-8 text-amber-400" />
                            <div>
                                <span className="text-4xl font-bold block mb-2">Zero</span>
                                <span className="text-xs text-zinc-500 uppercase font-black tracking-widest">Security Breaches</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 px-6 border-t border-white/5 bg-zinc-950/50">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                    <FeatureCard title="High-Load Rails" desc="Payment infrastructure designed for millions of concurrent transactions." />
                    <FeatureCard title="Immutable Ledgers" desc="Blockchain-inspired data integrity for mission-critical accounting." />
                    <FeatureCard title="Sovereign Wallets" desc="Enterprise-grade asset custody with multi-sig and cold storage logic." />
                </div>
            </section>

            <Footer />
        </main>
    );
}

function FeatureCard({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="p-10 rounded-[2.5rem] bg-zinc-900 border border-white/5 group hover:border-amber-500/20 transition-all">
            <h4 className="text-xl font-bold mb-4 font-syne tracking-tight group-hover:text-amber-400 transition-colors uppercase">{title}</h4>
            <p className="text-zinc-500 leading-relaxed text-sm">{desc}</p>
        </div>
    );
}
