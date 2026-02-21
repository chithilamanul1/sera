'use client';

import { motion } from 'framer-motion';
import { Cpu, Zap, Code, ShieldCheck } from 'lucide-react';

const steps = [
    { title: "We Write Code Faster", desc: "Our AI tools help us build consistent, clean code in half the time — so your project launches sooner.", icon: Code },
    { title: "We Catch Bugs Early", desc: "Automated testing finds and fixes problems before they reach your users.", icon: ShieldCheck },
    { title: "We Ship Quickly", desc: "Continuous deployment means updates go live fast, without downtime.", icon: Zap },
];

export function AIEngineSection() {
    return (
        <section className="py-24 px-6 border-t border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-zinc-950/20 transition-colors duration-500">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-16 items-center">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 text-blue-500 mb-6">
                            <Cpu className="w-5 h-5" />
                            <span className="text-xs font-semibold uppercase tracking-widest">Our Process</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold font-syne tracking-tight mb-8 leading-tight text-zinc-900 dark:text-white">
                            How We <br /><span className="text-zinc-400 dark:text-zinc-500">Use AI.</span>
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-12 leading-relaxed max-w-xl">
                            We use AI tools every day to build your project. The result? <span className="text-blue-600 dark:text-white font-bold">3× faster delivery</span> without cutting corners on quality.
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
                                    <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/10 group-hover:border-blue-500/20 transition-colors">
                                        <step.icon className="w-6 h-6 text-zinc-400 dark:text-zinc-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold mb-1 tracking-tight text-zinc-900 dark:text-white">{step.title}</h4>
                                        <p className="text-zinc-600 dark:text-zinc-500 text-sm leading-relaxed">{step.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 relative aspect-square md:aspect-auto md:h-[600px] w-full bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 rounded-[4rem] overflow-hidden group transition-colors">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="w-64 h-64 md:w-96 md:h-96 rounded-full border border-dashed border-zinc-300 dark:border-white/10"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <span className="text-6xl md:text-9xl font-black font-syne text-zinc-900 dark:text-white tracking-tighter">3×</span>
                                        <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mt-2">Faster Delivery</p>
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
