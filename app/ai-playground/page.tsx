'use client';

import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { motion } from 'framer-motion';
import { Bot, Sparkles, Cpu, Zap, Network } from 'lucide-react';

export default function AIPlayground() {
    return (
        <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
            <Navbar />

            <section className="pt-40 pb-20 px-6 relative z-10">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold mb-8"
                    >
                        <Sparkles size={16} />
                        Next-Gen AI Laboratory
                    </motion.div>

                    <h1 className="text-7xl md:text-9xl font-bold font-syne italic tracking-tighter mb-8 leading-tight">
                        AI <span className="text-zinc-600">Playground.</span>
                    </h1>

                    <p className="text-zinc-400 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-12">
                        Experience the neural architecture of Seranex. Test our proprietary models and see how we're reshaping Sri Lankan industry with silicon intelligence.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
                        {[
                            { icon: Bot, title: "Neural Agents", desc: "Autonomous bots that handle complex workflows and customer intent." },
                            { icon: Cpu, title: "Custom LLMs", desc: "Domain-specific models trained for locally focused niche industries." },
                            { icon: Network, title: "Smart Mesh", desc: "Seamless interconnectivity between your legacy data and AI layers." }
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                className="p-10 rounded-[3rem] bg-zinc-900/40 border border-zinc-800 hover:border-blue-500/50 transition-all group"
                            >
                                <item.icon className="w-12 h-12 text-blue-500 mb-6 group-hover:scale-110 transition-transform" />
                                <h3 className="text-2xl font-bold font-syne italic mb-4">{item.title}</h3>
                                <p className="text-zinc-500 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Neural Background Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

            <section className="py-32 px-6">
                <div className="max-w-5xl mx-auto bg-zinc-900/50 border border-zinc-800 rounded-[4rem] p-12 md:p-20 relative overflow-hidden">
                    <div className="relative z-10 text-center space-y-8">
                        <Zap className="w-16 h-16 text-blue-500 mx-auto animate-pulse" />
                        <h2 className="text-4xl md:text-5xl font-bold font-syne italic">The Seranex Engine.</h2>
                        <p className="text-zinc-400 text-lg md:text-xl">
                            Our playground is currently in &quot;Beta Access&quot; for Seranex Elite partners.
                            Interested in deploying proprietary AI?
                        </p>
                        <Link href="/contact" className="inline-block">
                            <button className="px-10 py-5 bg-white text-black font-bold rounded-full hover:scale-105 active:scale-95 transition-all">
                                Request SDK Access
                            </button>
                        </Link>
                    </div>

                    {/* Decorative Circuit Lines */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
                    <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
                </div>
            </section>

            <Footer />
        </main>
    );
}
