'use client';

import { useState, useEffect } from 'react';
import { Terminal as TerminalIcon, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const logs = [
    { text: "Initializing Seranex Engine v15.1...", type: "info" },
    { text: "Loading AI context models (RAG-Enabled)...", type: "info" },
    { text: "Scanning security protocols (Zero-Trust)...", type: "info" },
    { text: "Verifying blockchain integrity layers...", type: "warning" },
    { text: "Deploying microservices to global edge...", type: "success" },
    { text: "Latency check: 12ms (Target: <20ms)...", type: "success" },
    { text: "System State: SECURE / OPTIMIZED", type: "success" },
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
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                        Proof of Engineering
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold font-syne mb-8 tracking-tighter italic">Live Architecture <br /><span className="text-zinc-500">Visualization.</span></h2>
                    <p className="text-zinc-500 text-lg mb-8 leading-relaxed">
                        We don&apos;t just build websites. We architect resilient systems.
                        Watch our engine deploy secure, AI-native infrastructure in real-time.
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-sm text-zinc-300">
                            <Check className="w-5 h-5 text-emerald-500" /> Infrastructure as Code (Terraform)
                        </div>
                        <div className="flex items-center gap-3 text-sm text-zinc-300">
                            <Check className="w-5 h-5 text-emerald-500" /> Automated CI/CD (GitHub Actions)
                        </div>
                        <div className="flex items-center gap-3 text-sm text-zinc-300">
                            <Check className="w-5 h-5 text-emerald-500" /> Real-time Performance Monitoring
                        </div>
                    </div>
                </div>

                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative h-[400px] w-full bg-zinc-950 border border-white/5 rounded-2xl overflow-hidden shadow-2xl font-mono text-sm">
                        {/* Terminal Header */}
                        <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/50 border-b border-white/5">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                                <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                            </div>
                            <div className="flex items-center gap-2 text-zinc-600">
                                <TerminalIcon className="w-4 h-4" />
                                <span className="text-xs uppercase tracking-widest font-bold">seranex_deploy.sh</span>
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
                                        <span className="text-zinc-600 shrink-0 select-none">$</span>
                                        <span className={
                                            log.type === 'success' ? 'text-emerald-400' :
                                                log.type === 'warning' ? 'text-amber-400' :
                                                    'text-zinc-300'
                                        }>
                                            {log.text}
                                        </span>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {(step < logs.length) && (
                                <div className="flex gap-3">
                                    <span className="text-zinc-600">$</span>
                                    <span className="w-2 h-5 bg-white/50 animate-pulse" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
