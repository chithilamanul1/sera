'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Loader2, Sparkles, X } from 'lucide-react';

export function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        try {
            const res = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            if (res.ok) {
                setStatus('success');
                setMessage(data.message || 'Welcome to SeraNex!');
                setEmail('');
            } else {
                throw new Error(data.error || 'Failed to subscribe');
            }
        } catch (err: any) {
            setStatus('error');
            setMessage(err.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto">
            <div className="relative p-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-[2rem] overflow-hidden group">
                <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-xl rounded-[2rem]" />
                
                <div className="relative p-8 md:p-10 space-y-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-blue-500 mb-2">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Insights Dispatch</span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white leading-none">
                            Stay Ahead of the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Curve</span>
                        </h3>
                        <p className="text-zinc-500 text-sm font-medium leading-relaxed max-w-sm">
                            Exclusive technical deep-dives into Agentic AI and enterprise software engineering in Sri Lanka.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="relative">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Engineering lead's email..."
                            required
                            disabled={status === 'loading' || status === 'success'}
                            className="w-full bg-black/50 border border-zinc-800 rounded-2xl px-6 py-4 text-white focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition-all placeholder:text-zinc-700 disabled:opacity-50"
                        />
                        <button
                            type="submit"
                            disabled={status === 'loading' || status === 'success'}
                            className="absolute right-2 top-2 bottom-2 px-6 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-xl transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.3)] disabled:opacity-50"
                        >
                            {status === 'loading' ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <>
                                    <Send className="w-4 h-4" />
                                    <span className="hidden sm:inline">Subscribe</span>
                                </>
                            )}
                        </button>
                    </form>

                    <AnimatePresence>
                        {status === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-blue-400"
                            >
                                <CheckCircle2 className="w-5 h-5 shrink-0" />
                                <p className="text-xs font-bold uppercase tracking-widest">{message}</p>
                                <button onClick={() => setStatus('idle')} className="ml-auto p-1 hover:bg-white/5 rounded-lg">
                                    <X className="w-3 h-3" />
                                </button>
                            </motion.div>
                        )}
                        {status === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400"
                            >
                                <div className="p-1 bg-red-500/20 rounded-lg shrink-0">
                                    <X className="w-4 h-4" />
                                </div>
                                <p className="text-xs font-bold uppercase tracking-widest">{message}</p>
                                <button onClick={() => setStatus('idle')} className="ml-auto p-1 hover:bg-white/5 rounded-lg opacity-50">
                                    <X className="w-3 h-3" />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="flex items-center gap-4 pt-2">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-6 h-6 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center overflow-hidden">
                                     <div className="w-full h-full bg-gradient-to-br from-zinc-700 to-zinc-900" />
                                </div>
                            ))}
                        </div>
                        <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-tighter">
                            Joined by +100 Elite Engineers in Sri Lanka
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
