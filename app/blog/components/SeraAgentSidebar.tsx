
'use client';

import { useState } from 'react';
import { Sparkles, Send, X, MessageSquare } from 'lucide-react';

interface Props {
    postContent: string;
    postTitle: string;
}

export function SeraAgentSidebar({ postContent, postTitle }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'agent', text: string }[]>([
        { role: 'agent', text: `I am Sera, your context-aware assistant for "${postTitle}". Ask me anything about this article.` }
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = input.trim();
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput('');

        // Mock AI Logic (RAG-lite)
        setTimeout(() => {
            let response = "I'm analyzing the post for you... ";
            if (userMsg.toLowerCase().includes('rag')) {
                response = "In this post, RAG (Retrieval Augmented Generation) is highlighted as the technical foundation for grounding 2026 agents in company-specific data.";
            } else if (userMsg.toLowerCase().includes('scale') || userMsg.toLowerCase().includes('business')) {
                response = "The article mentions that scaling becomes 'logarithmic' with agents, as they can handle thousands of interactions simultaneously without linear hiring.";
            } else {
                response = `Based on the article "${postTitle}", we focus on elite technical execution and high-performance architecture. Is there a specific technical detail you'd like me to clarify?`;
            }
            setMessages(prev => [...prev, { role: 'agent', text: response }]);
        }, 800);
    };

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-8 right-8 z-50 md:hidden w-14 h-14 rounded-full bg-cyan-500 text-black flex items-center justify-center shadow-lg shadow-cyan-500/20 active:scale-95 transition-all`}
            >
                <MessageSquare className="w-6 h-6" />
            </button>

            {/* Sidebar Shell */}
            <aside className={`
                fixed top-0 right-0 h-full w-full md:w-96 bg-zinc-950 border-l border-white/10 z-[60] 
                transform transition-transform duration-500 ease-in-out
                ${isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0 md:sticky md:top-0 md:h-screen'}
            `}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-6 border-b border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-cyan-400 font-bold">
                            <Sparkles className="w-5 h-5" />
                            <span>SERA AGENT</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="md:hidden text-zinc-500 hover:text-white">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                        ? 'bg-cyan-500 text-black font-medium rounded-tr-none'
                                        : 'bg-zinc-900 text-zinc-300 border border-white/5 rounded-tl-none'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer Input */}
                    <div className="p-6 bg-zinc-900/50 border-t border-white/5">
                        <div className="relative group">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask Sera..."
                                className="w-full bg-black border border-white/10 focus:border-cyan-500 transition-colors rounded-xl py-3 pl-4 pr-12 text-sm outline-none"
                            />
                            <button
                                onClick={handleSend}
                                className="absolute right-2 top-1.5 w-9 h-9 flex items-center justify-center bg-cyan-500 text-black rounded-lg hover:scale-105 active:scale-95 transition-all"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                        <p className="mt-4 text-[10px] text-zinc-600 text-center uppercase tracking-widest font-bold">
                            AI Powered by Seranex Neural Architecture
                        </p>
                    </div>
                </div>
            </aside>
        </>
    );
}
