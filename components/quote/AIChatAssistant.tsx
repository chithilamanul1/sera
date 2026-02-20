'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, X } from 'lucide-react';

interface AIChatProps {
    onUpdateQuote: (updates: any) => void;
    currentContext: any;
    isOpen: boolean;
    onClose: () => void;
}

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export function AIChatAssistant({ onUpdateQuote, currentContext, isOpen, onClose }: AIChatProps) {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Hi! I'm your Seranex Architect. Tell me about your project in English or Sinhala/Singlish!" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setIsTyping(true);

        try {
            const res = await fetch('/api/quote/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, { role: 'user', content: userMsg }],
                    currentContext: currentContext
                })
            });

            const data = await res.json();

            if (data.reply) {
                setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
            }

            // Apply updates to the parent form automatically
            if (data.suggested_features || data.project_type) {
                onUpdateQuote(data);
            }

        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting to the mainframe. Please try again." }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="fixed bottom-6 right-6 w-96 h-[600px] bg-zinc-950/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50"
                >
                    {/* Header */}
                    <div className="p-4 border-b border-white/10 flex justify-between items-center bg-zinc-900/50">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                                <Bot size={20} className="text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm">AI Architect</h3>
                                <div className="flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    <span className="text-[10px] text-zinc-400 uppercase tracking-widest">Online</span>
                                </div>
                            </div>
                        </div>
                        <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-zinc-800' : 'bg-blue-600/20'}`}>
                                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} className="text-blue-400" />}
                                </div>
                                <div className={`p-3 rounded-2xl text-sm max-w-[80%] ${msg.role === 'user' ? 'bg-zinc-800 text-white rounded-tr-sm' : 'bg-blue-600/10 border border-blue-500/20 text-blue-100 rounded-tl-sm'}`}>
                                    {msg.content}
                                </div>
                            </motion.div>
                        ))}
                        {isTyping && (
                            <div className="flex gap-3">
                                <div className="p-3 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs flex items-center gap-2">
                                    <Sparkles size={12} className="animate-spin" /> Thinking...
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-white/10 bg-zinc-900/50">
                        <div className="relative">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type a message (Sinhala/English)..."
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isTyping}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                <Send size={14} className="text-white" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
