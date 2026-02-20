
'use client';

import { motion } from 'framer-motion';
import { Cpu, Zap, Code, ShieldCheck } from 'lucide-react';

const steps = [
    { title: "AI-Automated Coding", desc: "Our engine generates consistent, optimized codebases 5x faster.", icon: Code },
    { title: "Neuro-Sync Testing", desc: "Autonomous QA that predicts and fixes edge cases before they happen.", icon: ShieldCheck },
    { title: "Instant Evolution", desc: "Rapid CI/CD pipelines that deploy as you dream.", icon: Zap },
];

export function AIEngineSection() {
    return (
        <section className="py-24 px-6 border-t border-white/5 bg-zinc-950/20">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-16 items-center">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 text-cyan-400 mb-6">
                            <Cpu className="w-5 h-5" />
                            <span className="text-xs font-black uppercase tracking-[0.3em]">Lifecycle Optimization</span>
                        </div>
                        <h2 className="text-4xl md:text-7xl font-bold font-syne tracking-tighter italic mb-8 leading-tight">
                            The Seranex <br /><span className="text-zinc-500">AI Engine.</span>
                        </h2>
                        <p className="text-zinc-400 text-lg mb-12 leading-relaxed max-w-xl">
                            We don&apos;t just sell AI; we live it. Our internal AI-dev tools automate the entire lifecycle, resulting in <span className="text-white font-bold">3x faster delivery</span> for our clients without compromising precision.
                        </p>

                        <div className="space-y-8">
                            {steps.map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex gap-6 group"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/20 transition-colors">
                                        <step.icon className="w-6 h-6 text-zinc-500 group-hover:text-cyan-400 transition-colors" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold mb-1 tracking-tight">{step.title}</h4>
                                        <p className="text-zinc-500 text-sm leading-relaxed">{step.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 relative aspect-square md:aspect-auto md:h-[600px] w-full bg-zinc-900/50 border border-white/5 rounded-[4rem] overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="w-64 h-64 md:w-96 md:h-96 rounded-full border border-dashed border-white/10"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <span className="text-6xl md:text-9xl font-black font-syne text-white tracking-tighter">3X</span>
                                        <p className="text-[10px] uppercase font-black tracking-[0.5em] text-cyan-400 mt-2">Velocity Gain</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
