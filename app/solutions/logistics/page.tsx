
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { Truck, ArrowRight, Map, Clock, Zap } from 'lucide-react';
import Link from 'next/link';

export default function LogisticsSolution() {
    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-emerald-500/30">
            <Navbar />

            <section className="pt-48 pb-24 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-16 items-center">
                    <div className="flex-1 space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
                            Logistics & Supply Chain
                        </div>
                        <h1 className="text-6xl md:text-8xl font-bold font-syne tracking-tighter italic leading-tight">
                            Autonomous <br /><span className="text-zinc-500">Fleet Control.</span>
                        </h1>
                        <p className="text-zinc-400 text-xl leading-relaxed max-w-xl">
                            We build automated logistics platforms featuring real-time GPS tracking, geofencing, and intelligent matching engines for the global supply chain.
                        </p>
                        <div className="flex gap-4">
                            <Link href="/quote" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-all">
                                Deploy Fleet Hub
                            </Link>
                        </div>
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-4">
                        <div className="p-8 rounded-[3rem] bg-zinc-900 border border-white/5 flex flex-col justify-between aspect-square">
                            <Map className="w-8 h-8 text-emerald-400" />
                            <div>
                                <span className="text-4xl font-bold block mb-2">99.9%</span>
                                <span className="text-xs text-zinc-500 uppercase font-black tracking-widest">Tracking Accuracy</span>
                            </div>
                        </div>
                        <div className="p-8 rounded-[3rem] bg-zinc-900 border border-white/5 flex flex-col justify-between aspect-square translate-y-12">
                            <Clock className="w-8 h-8 text-emerald-400" />
                            <div>
                                <span className="text-4xl font-bold block mb-2">25min</span>
                                <span className="text-xs text-zinc-500 uppercase font-black tracking-widest">Avg. Matching Speed</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 px-6 border-t border-white/5 bg-zinc-950/50">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                    <FeatureCard title="Real-time Viz" desc="High-resolution fleet visualization with sub-second latency updates." />
                    <FeatureCard title="Geofence Logic" desc="Autonomous alerts and triggers based on precise spatial boundaries." />
                    <FeatureCard title="Matching Engine" desc="Logarithmic algorithms that pair drivers and loads with peak efficiency." />
                </div>
            </section>

            <Footer />
        </main>
    );
}

function FeatureCard({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="p-10 rounded-[2.5rem] bg-zinc-900 border border-white/5 group hover:border-emerald-500/20 transition-all">
            <h4 className="text-xl font-bold mb-4 font-syne tracking-tight group-hover:text-emerald-400 transition-colors uppercase">{title}</h4>
            <p className="text-zinc-500 leading-relaxed text-sm">{desc}</p>
        </div>
    );
}
