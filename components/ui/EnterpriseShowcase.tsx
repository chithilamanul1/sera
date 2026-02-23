'use client';

import { motion } from 'framer-motion';
import { Globe, Smartphone, Palette, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const features = [
    { icon: Globe, title: "Web Applications", desc: "Fast, responsive sites built with React and Next.js." },
    { icon: Smartphone, title: "Mobile Apps", desc: "Cross-platform apps for iOS and Android." },
    { icon: Palette, title: "UI/UX Design", desc: "Clean, modern interfaces that users actually enjoy." },
    { icon: Zap, title: "AI Automation", desc: "Smart bots and tools that save your team time." },
];

export function EnterpriseShowcase() {
    return (
        <section className="py-24 px-6 bg-white dark:bg-black transition-colors duration-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.06] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold font-syne tracking-tight mb-6 text-zinc-900 dark:text-white">
                        Everything You Need <br />
                        <span className="text-zinc-400 dark:text-zinc-500">In One Team.</span>
                    </h2>
                    <p className="text-zinc-800 dark:text-zinc-300 text-lg max-w-2xl mx-auto">
                        From the first design mockup to production deployment — we handle the entire process.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/5 hover:bg-zinc-100 dark:hover:bg-zinc-900/50 hover:border-blue-500/20 transition-all duration-500"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-white dark:bg-black border border-zinc-200 dark:border-white/10 flex items-center justify-center mb-6 group-hover:border-blue-500/30 group-hover:scale-110 transition-all duration-500">
                                <feature.icon className="w-6 h-6 text-zinc-400 dark:text-zinc-500 group-hover:text-blue-500 transition-colors" />
                            </div>
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 tracking-tight">{feature.title}</h3>
                            <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link href="/services">
                        <button className="group px-8 py-3.5 border border-zinc-300 dark:border-white/10 text-zinc-900 dark:text-white rounded-full font-semibold text-sm transition-all hover:bg-zinc-100 dark:hover:bg-white/5 inline-flex items-center gap-3">
                            See All Services
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
