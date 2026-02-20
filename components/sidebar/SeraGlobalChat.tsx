
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, MessageSquare, Send, Bot, User } from 'lucide-react';

export function SeraGlobalChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Seranex Architecture Online. How can I assist with your business scale today?' }
    ]);
    const [input, setInput] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Mock Response
        setTimeout(() => {
            const botMsg = { role: 'assistant', content: 'Analyzing your query against Seranex standards... Our architects specialize in AI integration, mobile performance, and enterprise cloud migrations. Would you like to view our recent solutions?' };
            setMessages(prev => [...prev, botMsg]);
        }, 1000);
    };

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-white text-black shadow-2xl hover:scale-110 active:scale-95 transition-all group overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <MessageSquare className="w-6 h-6 relative z-10" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.aside
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-screen w-full md:w-[400px] bg-zinc-950 border-l border-white/5 z-[60] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-zinc-900/50 backdrop-blur-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                                    <Sparkles className="w-4 h-4 text-black" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold tracking-tight">SERA AMBIENT</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Architect Online</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                                <X className="w-5 h-5 text-zinc-500" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                            {messages.map((m, i) => (
                                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-zinc-800' : 'bg-white/5 border border-white/10'}`}>
                                            {m.role === 'user' ? <User className="w-4 h-4 text-zinc-400" /> : <Bot className="w-4 h-4 text-cyan-400" />}
                                        </div>
                                        <div className={`p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-zinc-900 border border-white/5 text-zinc-300'}`}>
                                            {m.content}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-6 bg-zinc-900/50 border-t border-white/5">
                            <div className="relative flex items-center">
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask about our architecture..."
                                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors pr-12"
                                />
                                <button
                                    onClick={handleSend}
                                    className="absolute right-2 p-2 hover:bg-white/5 rounded-lg transition-colors"
                                >
                                    <Send className="w-4 h-4 text-cyan-400" />
                                </button>
                            </div>
                            <p className="text-center text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em] mt-4">
                                Seranex AI Intelligence Layer
                            </p>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
}
