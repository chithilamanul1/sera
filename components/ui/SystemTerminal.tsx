'use client';

import { useState, useEffect } from 'react';
import { Terminal as TerminalIcon, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const logs = [
    { text: "Starting project build...", type: "info" },
    { text: "Installing dependencies (Next.js, React, Tailwind)...", type: "info" },
    { text: "Running security scan — all clear ✓", type: "success" },
    { text: "Building components and pages...", type: "info" },
    { text: "Running automated tests — 47/47 passed ✓", type: "success" },
    { text: "Deploying to production server...", type: "success" },
    { text: "Site is live! Response time: 12ms ✓", type: "success" },
];

export function SystemTerminal() {
    const [visibleLogs, setVisibleLogs] = useState<typeof logs>([]);
    const [step, setStep] = useState(0);

    const idxToSpeed = (idx: number) => [500, 800, 1200, 600, 400, 300, 1000][idx] || 1000;

    useEffect(() => {
        if (step < logs.length) {
            const timer = setTimeout(() => {
                setVisibleLogs(prev => [...prev, logs[step]]);
                setStep(s => s + 1);
            }, idxToSpeed(step));
            return () => clearTimeout(timer);
        } else {
            const resetTimer = setTimeout(() => {
                setVisibleLogs([]);
                setStep(0);
            }, 5000);
            return () => clearTimeout(resetTimer);
        }
    }, [step]);

    return (
        <section className="py-24 px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-semibold uppercase tracking-widest mb-6">
                        Our Workflow
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold font-syne mb-8 tracking-tight text-zinc-900 dark:text-white">
                        See How We <br /><span className="text-zinc-400 dark:text-zinc-500">Build Things.</span>
                    </h2>
                    <p className="text-zinc-800 dark:text-zinc-300 text-lg mb-8 leading-relaxed">
                        Every project follows a clear process — from setup to deployment. Here&apos;s a live look at how we get your site from code to production.
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-sm text-zinc-800 dark:text-zinc-200">
                            <Check className="w-5 h-5 text-emerald-500" /> Clean, well-organized code
                        </div>
                        <div className="flex items-center gap-3 text-sm text-zinc-800 dark:text-zinc-200">
                            <Check className="w-5 h-5 text-emerald-500" /> Automated testing before every launch
                        </div>
                        <div className="flex items-center gap-3 text-sm text-zinc-800 dark:text-zinc-200">
                            <Check className="w-5 h-5 text-emerald-500" /> Real-time performance monitoring
                        </div>
                    </div>
                </div>

                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative h-[400px] w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-2xl font-mono text-sm transition-colors">
                        {/* Terminal Header */}
                        <div className="flex items-center justify-between px-4 py-3 bg-zinc-100 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-white/5">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400 dark:bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-amber-400 dark:bg-amber-500/50" />
                                <div className="w-3 h-3 rounded-full bg-emerald-400 dark:bg-emerald-500/50" />
                            </div>
                            <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-600">
                                <TerminalIcon className="w-4 h-4" />
                                <span className="text-xs uppercase tracking-widest font-semibold">deploy.sh</span>
                            </div>
                        </div>

                        {/* Terminal Body */}
                        <div className="p-6 space-y-2 overflow-y-auto h-[340px] scrollbar-hide">
                            <AnimatePresence>
                                {visibleLogs.map((log, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex gap-3"
                                    >
                                        <span className="text-zinc-400 dark:text-zinc-600 shrink-0 select-none">$</span>
                                        <span className={
                                            log.type === 'success' ? 'text-emerald-600 dark:text-emerald-400' :
                                                log.type === 'warning' ? 'text-amber-600 dark:text-amber-400' :
                                                    'text-zinc-700 dark:text-zinc-300'
                                        }>
                                            {log.text}
                                        </span>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {(step < logs.length) && (
                                <div className="flex gap-3">
                                    <span className="text-zinc-400 dark:text-zinc-600">$</span>
                                    <span className="w-2 h-5 bg-zinc-400/50 dark:bg-white/50 animate-pulse" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
