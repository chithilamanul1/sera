'use client';

import { motion } from 'framer-motion';
import { Shield, Database, Eye, CheckCircle } from 'lucide-react';
import { LiquidGlassCard } from './LiquidGlassCard';

interface CardProps {
    title: string;
    model: string;
    usage: string;
    protection: string;
    icon: any;
}

export function AITransparencyCard({ title, model, usage, protection, icon: Icon }: CardProps) {
    return (
        <LiquidGlassCard
            className="p-8"
            variant="primary"
        >
            <div className="absolute top-0 right-0 p-6 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity text-zinc-900 dark:text-white">
                <Icon size={120} />
            </div>

            <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
                    <Icon className="text-blue-600 dark:text-blue-500" size={24} />
                </div>

                <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-500">AI Transparency Score</span>
                    <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="w-2 h-2 rounded-full bg-blue-500" />
                        ))}
                    </div>
                </div>

                <h3 className="text-2xl font-bold mb-6 tracking-tight text-zinc-900 dark:text-white font-syne italic">{title}</h3>

                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <Database className="w-4 h-4 text-zinc-400 dark:text-zinc-500 mt-1" />
                        <div>
                            <p className="text-[10px] font-bold text-zinc-700 dark:text-zinc-500 uppercase tracking-widest">Core Engine</p>
                            <p className="text-sm text-zinc-800 dark:text-zinc-300 font-medium">{model}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Eye className="w-4 h-4 text-zinc-400 dark:text-zinc-500 mt-1" />
                        <div>
                            <p className="text-[10px] font-bold text-zinc-700 dark:text-zinc-500 uppercase tracking-widest">Data Utilization</p>
                            <p className="text-sm text-zinc-800 dark:text-zinc-300 font-medium">{usage}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Shield className="w-4 h-4 text-zinc-400 dark:text-zinc-500 mt-1" />
                        <div>
                            <p className="text-[10px] font-bold text-zinc-700 dark:text-zinc-500 uppercase tracking-widest">Security Protocol</p>
                            <p className="text-sm text-zinc-800 dark:text-zinc-300 font-medium">{protection}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-zinc-500 italic text-xs">
                        <CheckCircle size={14} className="text-emerald-500" />
                        Compliant with EU AI Act
                    </div>
                    <button className="text-[10px] font-bold text-zinc-900 dark:text-white uppercase tracking-widest hover:text-blue-500 transition-colors">
                        View Ethics Page
                    </button>
                </div>
            </div>
        </LiquidGlassCard>
    );
}
