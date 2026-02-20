
'use client';

import { motion } from 'framer-motion';
import { Terminal, Cpu, Smartphone, Shield, Zap, Globe } from 'lucide-react';
import Link from 'next/link';

const features = [
    {
        title: "Autonomous AI Agents",
        desc: "Goal-oriented digital workers that scale your operations logarithmically.",
        icon: Cpu,
        size: "md:col-span-2",
        color: "from-cyan-500/20 to-transparent",
        tag: "Sera-Auto"
    },
    {
        title: "60FPS Mobile Performance",
        desc: "Butter-smooth universal apps optimized for every millisecond.",
        icon: Smartphone,
        size: "md:col-span-1",
        color: "from-purple-500/20 to-transparent",
        tag: "Universal"
    },
    {
        title: "Digital Sovereignty",
        desc: "Own your data and infrastructure with cloud-portable architectures.",
        icon: Shield,
        size: "md:col-span-1",
        color: "from-emerald-500/20 to-transparent",
        tag: "Secure"
    },
    {
        title: "Mission-Critical Systems",
        desc: "High-load enterprise software built on zero-trust principles.",
        icon: Terminal,
        size: "md:col-span-2",
        color: "from-blue-500/20 to-transparent",
        tag: "Enterprise"
    }
];

export function BentoFeatures() {
    return (
        <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
            <div className="mb-16">
                <h2 className="text-3xl md:text-6xl font-bold font-syne mb-4 tracking-tighter italic">Solutions for <span className="text-zinc-500">Scale.</span></h2>
                <p className="text-zinc-500 text-lg">Outcome-driven engineering for global enterprises.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((f, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`${f.size} group relative overflow-hidden rounded-[2.5rem] bg-zinc-900/30 border border-white/5 p-8 h-full hover:bg-zinc-900/50 transition-all duration-500`}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-8">
                                    <div className="w-12 h-12 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                        <f.icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-500">
                                        {f.tag}
                                    </span>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">{f.title}</h3>
                                <p className="text-zinc-500 leading-relaxed font-medium">{f.desc}</p>
                            </div>

                            <div className="mt-12">
                                <Link href="/quote" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">
                                    Initialize Solution <Zap className="w-3 h-3 text-cyan-500" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
