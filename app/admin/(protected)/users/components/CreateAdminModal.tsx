'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserPlus, Loader2, ShieldAlert, Key, Mail, User } from 'lucide-react';
import { createAdmin } from '../actions';

export function CreateAdminModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'ADMIN'
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await createAdmin(formData);
            if (res.success) {
                onClose();
                setFormData({ name: '', email: '', password: '', role: 'ADMIN' });
            } else {
                alert(res.error);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="bg-zinc-950 border border-zinc-900 w-full max-w-lg rounded-[3rem] p-10 relative z-10 shadow-2xl"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-2xl font-black uppercase tracking-tighter text-white">Provision <span className="text-blue-500">Access.</span></h3>
                                <p className="text-zinc-500 text-xs font-medium uppercase tracking-widest mt-1">Manual Executive Onboarding</p>
                            </div>
                            <button onClick={onClose} className="p-2 text-zinc-500 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-2">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 w-4 h-4" />
                                        <input
                                            required
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-black border border-zinc-900 rounded-2xl pl-12 pr-6 py-4 text-white focus:border-blue-500/50 outline-none transition-all placeholder:text-zinc-800"
                                            placeholder="e.g. John Doe"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-2">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 w-4 h-4" />
                                        <input
                                            required
                                            type="email"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-black border border-zinc-900 rounded-2xl pl-12 pr-6 py-4 text-white focus:border-blue-500/50 outline-none transition-all placeholder:text-zinc-800"
                                            placeholder="john@seranex.org"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-2">Secure Access Key</label>
                                    <div className="relative">
                                        <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 w-4 h-4" />
                                        <input
                                            required
                                            type="password"
                                            value={formData.password}
                                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                                            className="w-full bg-black border border-zinc-900 rounded-2xl pl-12 pr-6 py-4 text-white focus:border-blue-500/50 outline-none transition-all placeholder:text-zinc-800"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-2">Clearance Level</label>
                                    <select
                                        value={formData.role}
                                        onChange={e => setFormData({ ...formData, role: e.target.value })}
                                        className="w-full bg-black border border-zinc-900 rounded-2xl px-6 py-4 text-white focus:border-blue-500/50 outline-none transition-all appearance-none cursor-pointer font-bold tracking-tight"
                                    >
                                        <option value="ADMIN">Administrative Lead</option>
                                        <option value="EDITOR">Content Strategist</option>
                                        <option value="USER">Standard Associate</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-5 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-4 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.05)]"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <UserPlus className="w-5 h-5" />}
                                Authorize Executive
                            </button>
                        </form>

                        <div className="mt-8 p-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl flex gap-4">
                            <ShieldAlert className="text-zinc-600 w-5 h-5 shrink-0" />
                            <p className="text-[10px] font-medium text-zinc-600 leading-relaxed uppercase tracking-widest">
                                <span className="text-white">Security Protocol:</span> All manual provisioning is logged under your Owner ID. Ensure the executive rotates their access key immediately.
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
