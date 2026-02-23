'use client';

import { motion } from 'framer-motion';
import { Layout, Code, Rocket, Clock } from 'lucide-react';

const roadmap = [
    { day: "Day 1-2", title: "Plan & Design", icon: Layout, desc: "We map out your project and create detailed wireframes you can review." },
    { day: "Day 3-5", title: "Build & Test", icon: Code, desc: "We build a working prototype you can try out and give feedback on." },
    { day: "Day 6-7", title: "Launch", icon: Rocket, desc: "We test everything thoroughly and deploy your site to production." },
];

export function RoadmapSection() {
    return (
        <section className="py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-20 space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Our Timeline</span>
                <h2 className="text-4xl md:text-6xl font-bold font-syne tracking-tight text-zinc-900 dark:text-white">
                    From Idea to <span className="text-zinc-400 dark:text-zinc-500">Launch.</span>
                </h2>
                <p className="text-zinc-800 dark:text-zinc-300 text-lg max-w-2xl mx-auto">See your project come to life in 7 days before committing to full development.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                {/* Connector Line (Desktop) */}
                <div className="hidden md:block absolute top-24 left-0 right-0 h-[1px] bg-zinc-200 dark:bg-white/5 z-0" />

                {roadmap.map((step, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2 }}
                        className="relative z-10 flex flex-col items-center text-center p-8 rounded-[3rem] bg-zinc-100 dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/5 group hover:bg-zinc-200 dark:hover:bg-zinc-900/50 transition-all duration-500"
                    >
                        <div className="w-16 h-16 rounded-full bg-white dark:bg-black border border-zinc-200 dark:border-white/10 mb-8 flex items-center justify-center group-hover:scale-110 group-hover:border-blue-500/50 transition-all duration-500">
                            <step.icon className="w-6 h-6 text-zinc-900 dark:text-white" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-4">{step.day}</span>
                        <h3 className="text-2xl font-bold mb-4 font-syne text-zinc-900 dark:text-white">{step.title}</h3>
                        <p className="text-zinc-800 dark:text-zinc-300 text-sm leading-relaxed max-w-[220px]">{step.desc}</p>
                    </motion.div>
                ))}
            </div>

            <div className="mt-20 text-center">
                <div className="inline-block p-1 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10">
                    <div className="px-8 py-3 rounded-full bg-white dark:bg-zinc-900 text-sm font-bold border border-zinc-200 dark:border-white/5 text-zinc-900 dark:text-white">
                        Low Risk. Fast Results.
                    </div>
                </div>
            </div>
        </section>
    );
}
