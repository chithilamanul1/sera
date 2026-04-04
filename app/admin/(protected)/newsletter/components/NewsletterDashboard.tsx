'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, Trash2, CheckCircle2, Loader2, Sparkles, X, LayoutGrid, List } from 'lucide-react';
import { sendNewsletterBroadcast, deleteSubscriber } from '../actions';
import { useRouter } from 'next/navigation';

export function NewsletterDashboard({ initialSubscribers }: { initialSubscribers: any[] }) {
    const router = useRouter();
    const [subscribers, setSubscribers] = useState(initialSubscribers);
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [sending, setSending] = useState(false);
    const [view, setView] = useState<'compose' | 'subscribers'>('compose');
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSend = async () => {
        if (!subject || !content) return;
        if (!confirm(`Are you sure you want to broadcast this message to ${subscribers.length} executives?`)) return;

        setSending(true);
        setStatus('idle');
        try {
            const res = await sendNewsletterBroadcast(subject, content);
            if (res.success) {
                setStatus('success');
                setMessage(`Broadcast transmitted to ${res.count} intelligence streams.`);
                setSubject('');
                setContent('');
            } else {
                throw new Error(res.error || 'Broadcast failed.');
            }
        } catch (err: any) {
            setStatus('error');
            setMessage(err.message || 'Transmission failed.');
        } finally {
            setSending(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Remove this subscriber?')) return;
        const res = await deleteSubscriber(id);
        if (res.success) {
            setSubscribers(subscribers.filter(s => s.id !== id));
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-6">
                {/* View Switcher */}
                <div className="flex items-center gap-1 p-1 bg-zinc-950/50 border border-zinc-900 rounded-2xl w-fit">
                    <button
                        onClick={() => setView('compose')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                            view === 'compose' ? 'bg-blue-500 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'
                        }`}
                    >
                        <Sparkles className="w-4 h-4" />
                        Compose Insight
                    </button>
                    <button
                        onClick={() => setView('subscribers')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                            view === 'subscribers' ? 'bg-blue-500 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'
                        }`}
                    >
                        <List className="w-4 h-4" />
                        Subscriber Database
                    </button>
                </div>

                {view === 'compose' ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-zinc-950/50 border border-zinc-900 rounded-[2.5rem] p-8 space-y-6 backdrop-blur-3xl"
                    >
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-2">Intelligence Subject</label>
                                <input
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    placeholder="e.g., Q2 AI Trends in Sri Lanka..."
                                    className="w-full bg-black/40 border border-zinc-900 rounded-2xl px-6 py-4 text-white focus:border-blue-500/50 outline-none transition-all placeholder:text-zinc-700"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-2">Broadcast Content (HTML Enabled)</label>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Write your corporate update here..."
                                    rows={12}
                                    className="w-full bg-black/40 border border-zinc-900 rounded-2xl px-6 py-4 text-white focus:border-blue-500/50 outline-none transition-all placeholder:text-zinc-700 resize-none font-mono text-sm leading-relaxed"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4">
                            <div className="flex items-center gap-2 text-zinc-500">
                                <Mail className="w-4 h-4" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">To: {subscribers.length} Streams</span>
                            </div>

                            <button
                                onClick={handleSend}
                                disabled={sending || !subject || !content}
                                className="px-10 py-4 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-zinc-200 transition-all disabled:opacity-50 flex items-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                            >
                                {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                Transmit Broadcast
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-zinc-950/50 border border-zinc-900 rounded-[2.5rem] p-8 backdrop-blur-3xl"
                    >
                        <div className="max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                           <table className="w-full text-left">
                                <thead className="sticky top-0 bg-zinc-950 z-10">
                                    <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">
                                        <th className="px-4 py-4">Executive Stream</th>
                                        <th className="px-4 py-4 text-right">Corporate Controls</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-900">
                                    {subscribers.map((sub) => (
                                        <tr key={sub.id} className="group hover:bg-white/5 transition-colors">
                                            <td className="px-4 py-6">
                                                <p className="text-sm font-bold text-white tracking-tight">{sub.email}</p>
                                                <p className="text-[10px] font-medium text-zinc-600 lowercase tracking-widest">Verified: {new Date(sub.createdAt).toLocaleDateString()}</p>
                                            </td>
                                            <td className="px-4 py-6 text-right">
                                                <button
                                                    onClick={() => handleDelete(sub.id)}
                                                    className="p-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                           </table>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Sidebar Alerts/Status */}
            <div className="space-y-6">
                <AnimatePresence>
                    {status !== 'idle' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className={`p-6 rounded-[2rem] border overflow-hidden relative ${
                                status === 'success' ? 'bg-blue-500/10 border-blue-500/30' : 'bg-red-500/10 border-red-500/30'
                            }`}
                        >
                            <button onClick={() => setStatus('idle')} className="absolute top-4 right-4 text-zinc-500 hover:text-white p-1">
                                <X className="w-4 h-4" />
                            </button>
                            <div className="flex items-start gap-4">
                                <div className={`p-4 rounded-2xl ${
                                    status === 'success' ? 'bg-blue-500/20 text-blue-400' : 'bg-red-500/20 text-red-400'
                                }`}>
                                    {status === 'success' ? <CheckCircle2 className="w-6 h-6" /> : <X className="w-6 h-6" />}
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Transmission Report</p>
                                    <p className={`text-sm font-bold leading-relaxed ${
                                        status === 'success' ? 'text-blue-300' : 'text-red-300'
                                    }`}>
                                        {message}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="bg-zinc-950/50 border border-zinc-900 rounded-[2rem] p-8 space-y-6 backdrop-blur-3xl">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">Corporate Standards</h4>
                    <div className="space-y-4">
                        <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-[10px] font-medium text-zinc-500 leading-relaxed uppercase tracking-widest">
                            <span className="text-white">Professional Tone:</span> Ensure all intelligence dispatches maintain the elite SeraNex brand voice.
                        </div>
                        <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-[10px] font-medium text-zinc-500 leading-relaxed uppercase tracking-widest">
                            <span className="text-white">Batch Sending:</span> Resend Enterprise handles high-volume transmissions with perfect deliverability.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
