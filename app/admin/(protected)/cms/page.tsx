'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Loader2, Layout, Phone, Monitor, Smartphone, Globe } from 'lucide-react';

export default function CMSPage() {
    const [config, setConfig] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<'hero' | 'content' | 'solutions' | 'contact'>('hero');

    useEffect(() => {
        fetchConfig();
    }, []);

    const fetchConfig = async () => {
        try {
            const res = await fetch('/api/admin/cms');
            if (res.ok) {
                const data = await res.json();
                setConfig(data);
            }
        } catch (err) {
            console.error('Error fetching CMS config:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/admin/cms', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config),
            });
            if (res.ok) {
                alert('Changes saved!');
            }
        } catch (err) {
            console.error('Error saving CMS config:', err);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center py-24">
                <Loader2 className="animate-spin text-blue-500 w-12 h-12" />
            </div>
        );
    }

    const tabs = [
        { key: 'hero', label: 'Hero' },
        { key: 'content', label: 'About' },
        { key: 'solutions', label: 'Solutions' },
        { key: 'contact', label: 'Contact' },
    ];

    return (
        <div className="relative">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold font-syne mb-2 tracking-tight text-white">Content Manager</h1>
                    <p className="text-zinc-500 text-sm">Edit your website content. Changes go live when you save.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-full hover:scale-105 active:scale-95 transition-all disabled:opacity-50 text-sm"
                >
                    {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                    Save Changes
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1.5 mb-8 bg-zinc-950 p-1.5 rounded-xl border border-white/5 w-fit">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key as any)}
                        className={`px-5 py-2.5 rounded-lg text-xs font-semibold transition-all ${activeTab === tab.key ? 'bg-white text-black' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Editor */}
                <div className="space-y-6">
                    {activeTab === 'hero' && (
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                            <div className="bg-zinc-950 border border-white/5 rounded-2xl p-8">
                                <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-white">
                                    <Layout size={18} className="text-blue-500" />
                                    Hero Section
                                </h2>
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-xs text-zinc-500 mb-2">Headline</label>
                                        <textarea
                                            value={config.heroTitle || ''}
                                            onChange={(e) => setConfig({ ...config, heroTitle: e.target.value })}
                                            className="w-full bg-black border border-white/5 rounded-xl px-5 py-3.5 text-white focus:border-blue-500/50 outline-none h-28 resize-none transition-all text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-zinc-500 mb-2">Subheadline</label>
                                        <textarea
                                            value={config.heroSubtitle || ''}
                                            onChange={(e) => setConfig({ ...config, heroSubtitle: e.target.value })}
                                            className="w-full bg-black border border-white/5 rounded-xl px-5 py-3.5 text-white focus:border-blue-500/50 outline-none h-20 resize-none transition-all text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'content' && (
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                            <div className="bg-zinc-950 border border-white/5 rounded-2xl p-8">
                                <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-white">
                                    <Globe size={18} className="text-emerald-500" />
                                    About Section
                                </h2>
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-xs text-zinc-500 mb-2">Title</label>
                                        <input
                                            type="text"
                                            value={config.aboutTitle || ''}
                                            onChange={(e) => setConfig({ ...config, aboutTitle: e.target.value })}
                                            className="w-full bg-black border border-white/5 rounded-xl px-5 py-3.5 text-white focus:border-emerald-500/50 outline-none transition-all text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-zinc-500 mb-2">Description</label>
                                        <textarea
                                            value={config.aboutContent || ''}
                                            onChange={(e) => setConfig({ ...config, aboutContent: e.target.value })}
                                            className="w-full bg-black border border-white/5 rounded-xl px-5 py-3.5 text-white focus:border-emerald-500/50 outline-none h-28 resize-none transition-all text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'solutions' && (
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                            <div className="bg-zinc-950 border border-white/5 rounded-2xl p-8">
                                <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-white">
                                    <Monitor size={18} className="text-amber-500" />
                                    Solutions
                                </h2>
                                <div className="space-y-8">
                                    <div className="space-y-3">
                                        <h4 className="text-xs font-semibold text-rose-400">Retail</h4>
                                        <input
                                            type="text"
                                            placeholder="Title"
                                            value={config.retailTitle || ''}
                                            onChange={(e) => setConfig({ ...config, retailTitle: e.target.value })}
                                            className="w-full bg-black border border-white/5 rounded-xl px-5 py-3 text-white focus:border-rose-500/50 outline-none text-sm"
                                        />
                                        <textarea
                                            placeholder="Description"
                                            value={config.retailDesc || ''}
                                            onChange={(e) => setConfig({ ...config, retailDesc: e.target.value })}
                                            className="w-full bg-black border border-white/5 rounded-xl px-5 py-3 text-white focus:border-rose-500/50 outline-none h-20 resize-none text-sm"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <h4 className="text-xs font-semibold text-amber-400">Fintech</h4>
                                        <input
                                            type="text"
                                            placeholder="Title"
                                            value={config.fintechTitle || ''}
                                            onChange={(e) => setConfig({ ...config, fintechTitle: e.target.value })}
                                            className="w-full bg-black border border-white/5 rounded-xl px-5 py-3 text-white focus:border-amber-500/50 outline-none text-sm"
                                        />
                                        <textarea
                                            placeholder="Description"
                                            value={config.fintechDesc || ''}
                                            onChange={(e) => setConfig({ ...config, fintechDesc: e.target.value })}
                                            className="w-full bg-black border border-white/5 rounded-xl px-5 py-3 text-white focus:border-amber-500/50 outline-none h-20 resize-none text-sm"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <h4 className="text-xs font-semibold text-emerald-400">Logistics</h4>
                                        <input
                                            type="text"
                                            placeholder="Title"
                                            value={config.logisticsTitle || ''}
                                            onChange={(e) => setConfig({ ...config, logisticsTitle: e.target.value })}
                                            className="w-full bg-black border border-white/5 rounded-xl px-5 py-3 text-white focus:border-emerald-500/50 outline-none text-sm"
                                        />
                                        <textarea
                                            placeholder="Description"
                                            value={config.logisticsDesc || ''}
                                            onChange={(e) => setConfig({ ...config, logisticsDesc: e.target.value })}
                                            className="w-full bg-black border border-white/5 rounded-xl px-5 py-3 text-white focus:border-emerald-500/50 outline-none h-20 resize-none text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'contact' && (
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                            <div className="bg-zinc-950 border border-white/5 rounded-2xl p-8">
                                <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-white">
                                    <Phone size={18} className="text-rose-500" />
                                    Contact Info
                                </h2>
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-xs text-zinc-500 mb-2">Email</label>
                                        <input
                                            type="email"
                                            value={config.contactEmail || ''}
                                            onChange={(e) => setConfig({ ...config, contactEmail: e.target.value })}
                                            className="w-full bg-black border border-white/5 rounded-xl px-5 py-3.5 text-white focus:border-rose-500/50 outline-none text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-zinc-500 mb-2">Phone</label>
                                        <input
                                            type="text"
                                            value={config.contactPhone || ''}
                                            onChange={(e) => setConfig({ ...config, contactPhone: e.target.value })}
                                            className="w-full bg-black border border-white/5 rounded-xl px-5 py-3.5 text-white focus:border-rose-500/50 outline-none text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Live Preview */}
                <div className="hidden lg:block relative">
                    <div className="sticky top-8 bg-zinc-950 border border-white/5 rounded-2xl overflow-hidden shadow-2xl aspect-[9/16] max-h-[85vh] flex flex-col">
                        <div className="p-5 bg-zinc-900/50 border-b border-white/5 flex justify-between items-center">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
                            </div>
                            <span className="text-[10px] text-zinc-600 font-medium tracking-wider">Live Preview</span>
                        </div>

                        <div className="flex-1 p-8 space-y-10 overflow-y-auto custom-scrollbar">
                            <div className="space-y-4 pt-4">
                                <div className="w-12 h-0.5 bg-blue-500/40 rounded-full" />
                                <h3 className="text-3xl font-bold leading-tight tracking-tight text-white">
                                    {config.heroTitle || 'Your headline here'}
                                </h3>
                                <p className="text-sm text-zinc-500 leading-relaxed">
                                    {config.heroSubtitle || 'Your subheadline here'}
                                </p>
                            </div>

                            <div className="pt-8 border-t border-white/5">
                                <div className="text-[10px] text-zinc-600 tracking-wider font-medium mb-6">Preview</div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-5 bg-zinc-900 rounded-xl border border-white/5 flex flex-col items-center gap-3">
                                        <Monitor size={20} className="text-blue-400" />
                                        <span className="text-[10px] text-zinc-500">Desktop</span>
                                    </div>
                                    <div className="p-5 bg-zinc-900 rounded-xl border border-white/5 flex flex-col items-center gap-3">
                                        <Smartphone size={20} className="text-emerald-400" />
                                        <span className="text-[10px] text-zinc-500">Mobile</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
