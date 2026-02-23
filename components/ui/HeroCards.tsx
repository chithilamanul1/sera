'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { TrendingUp, Users, CheckCircle, BarChart3 } from 'lucide-react';

export function ProfitCard() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50, rotate: 5 }}
            animate={{ opacity: 1, x: 0, rotate: -2 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute top-[20%] right-[-5%] md:right-[5%] xl:right-[10%] w-64 bg-white dark:bg-black/60 backdrop-blur-2xl border border-zinc-200 dark:border-white/10 rounded-3xl p-6 shadow-2xl z-20 hidden md:block transition-colors duration-500"
        >
            <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <TrendingUp className="text-emerald-500" size={20} />
                </div>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Growth Engine</span>
            </div>
            <div className="space-y-1">
                <h3 className="text-3xl font-black font-syne tracking-tighter text-zinc-900 dark:text-white uppercase italic">+184%</h3>
                <p className="text-xs text-zinc-800 dark:text-zinc-300 font-medium">Efficiency in delivery pipelines</p>
            </div>
            <div className="mt-6 h-12 w-full flex items-end gap-1">
                {[40, 70, 45, 90, 65, 100, 80].map((h, i) => (
                    <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: 1 + i * 0.1 }}
                        className="flex-1 bg-gradient-to-t from-emerald-500/20 to-emerald-400 rounded-t-sm"
                    />
                ))}
            </div>
        </motion.div>
    );
}

export function CustomerTrustCard() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50, rotate: -5 }}
            animate={{ opacity: 1, x: 0, rotate: 3 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="absolute bottom-[15%] left-[-5%] md:left-[5%] xl:left-[10%] w-64 bg-white dark:bg-black/60 backdrop-blur-2xl border border-zinc-200 dark:border-white/10 rounded-3xl p-6 shadow-2xl z-20 hidden lg:block transition-colors duration-500"
        >
            <div className="flex items-center gap-3 mb-4">
                <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-black bg-zinc-800 flex items-center justify-center overflow-hidden">
                            <Image
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`}
                                alt={`Partner ${i}`}
                                width={32}
                                height={32}
                            />
                        </div>
                    ))}
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-700 dark:text-zinc-300">Global Trust</p>
                    <p className="text-xs text-zinc-900 dark:text-white font-bold">500+ Enterprises</p>
                </div>
            </div>
            <div
                className="relative w-full h-full bg-white dark:bg-zinc-900/40 backdrop-blur-xl border border-zinc-200 dark:border-white/10 rounded-3xl overflow-hidden transition-colors duration-500">
                <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="text-blue-600 dark:text-blue-500" size={14} />
                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Success Story</span>
                </div>
                <p className="text-[10px] text-zinc-800 dark:text-zinc-300 leading-relaxed italic">
                    &quot;Seranex transformed our logistics architecture in weeks.&quot;
                </p>
            </div>
        </motion.div>
    );
}
