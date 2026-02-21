'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Loader2, Layout, FileText, Phone, Monitor, Smartphone, Globe } from 'lucide-react';
import AdminLayout from '../../layout';

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
                alert('CMS Updated Successfully!');
            }
        } catch (err) {
            console.error('Error saving CMS config:', err);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex justify-center py-24">
                    <Loader2 className="animate-spin text-blue-500 w-12 h-12" />
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold font-syne italic mb-2">Content Manager (CMS)</h1>
                    <p className="text-zinc-500">Edit your website content in real-time</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-xl hover:bg-zinc-200 transition-all disabled:opacity-50"
                >
                    {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    Save Changes
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-8 bg-zinc-900/50 p-1.5 rounded-2xl border border-zinc-800 w-fit">
                <button
                    onClick={() => setActiveTab('hero')}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'hero' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                    Hero Section
                </button>
                <button
                    onClick={() => setActiveTab('content')}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'content' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                    Site Content
                </button>
                <button
                    onClick={() => setActiveTab('solutions')}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'solutions' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                    Solutions
                </button>
                <button
                    onClick={() => setActiveTab('contact')}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'contact' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                    Global Settings
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Editor Side */}
                <div className="space-y-6">
                    {activeTab === 'hero' && (
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                            <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-8">
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <Layout size={20} className="text-blue-500" />
                                    Hero Content
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Main Headline</label>
                                        <textarea
                                            value={config.heroTitle || ''}
                                            onChange={(e) => setConfig({ ...config, heroTitle: e.target.value })}
                                            className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none h-32 resize-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Sub-headline</label>
                                        <textarea
                                            value={config.heroSubtitle || ''}
                                            onChange={(e) => setConfig({ ...config, heroSubtitle: e.target.value })}
                                            className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none h-24 resize-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'content' && (
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                            <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-8">
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <Globe size={20} className="text-emerald-500" />
                                    Ecosystem Section
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Title</label>
                                        <input
                                            type="text"
                                            value={config.aboutTitle || ''}
                                            onChange={(e) => setConfig({ ...config, aboutTitle: e.target.value })}
                                            className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Description</label>
                                        <textarea
                                            value={config.aboutContent || ''}
                                            onChange={(e) => setConfig({ ...config, aboutContent: e.target.value })}
                                            className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none h-32 resize-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'solutions' && (
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                            <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-8">
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-amber-500">
                                    <Monitor size={20} />
                                    Solutions & Devices
                                </h2>
                                <div className="space-y-8">
                                    {/* Retail */}
                                    <div className="space-y-4">
                                        <h4 className="text-xs font-bold text-rose-500 uppercase tracking-[0.2em]">Retail (Laptop View)</h4>
                                        <input
                                            type="text"
                                            placeholder="Retail Title"
                                            value={config.retailTitle || ''}
                                            onChange={(e) => setConfig({ ...config, retailTitle: e.target.value })}
                                            className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-rose-500 outline-none"
                                        />
                                        <textarea
                                            placeholder="Retail Description"
                                            value={config.retailDesc || ''}
                                            onChange={(e) => setConfig({ ...config, retailDesc: e.target.value })}
                                            className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-rose-500 outline-none h-20 resize-none"
                                        />
                                    </div>
                                    {/* Fintech */}
                                    <div className="space-y-4">
                                        <h4 className="text-xs font-bold text-amber-500 uppercase tracking-[0.2em]">Fintech (Desktop View)</h4>
                                        <input
                                            type="text"
                                            placeholder="Fintech Title"
                                            value={config.fintechTitle || ''}
                                            onChange={(e) => setConfig({ ...config, fintechTitle: e.target.value })}
                                            className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-amber-500 outline-none"
                                        />
                                        <textarea
                                            placeholder="Fintech Description"
                                            value={config.fintechDesc || ''}
                                            onChange={(e) => setConfig({ ...config, fintechDesc: e.target.value })}
                                            className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-amber-500 outline-none h-20 resize-none"
                                        />
                                    </div>
                                    {/* Logistics */}
                                    <div className="space-y-4">
                                        <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-[0.2em]">Logistics (Mobile/Tablet View)</h4>
                                        <input
                                            type="text"
                                            placeholder="Logistics Title"
                                            value={config.logisticsTitle || ''}
                                            onChange={(e) => setConfig({ ...config, logisticsTitle: e.target.value })}
                                            className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none"
                                        />
                                        <textarea
                                            placeholder="Logistics Description"
                                            value={config.logisticsDesc || ''}
                                            onChange={(e) => setConfig({ ...config, logisticsDesc: e.target.value })}
                                            className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none h-20 resize-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'contact' && (
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                            <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-8">
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <Phone size={20} className="text-rose-500" />
                                    Global Settings
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Support Email</label>
                                        <input
                                            type="email"
                                            value={config.contactEmail || ''}
                                            onChange={(e) => setConfig({ ...config, contactEmail: e.target.value })}
                                            className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-rose-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Support Phone</label>
                                        <input
                                            type="text"
                                            value={config.contactPhone || ''}
                                            onChange={(e) => setConfig({ ...config, contactPhone: e.target.value })}
                                            className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-rose-500 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Preview Side (Mini Mockup) */}
                <div className="hidden lg:block relative">
                    <div className="sticky top-8 bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl aspect-[9/16] max-h-[80vh] flex flex-col">
                        <div className="p-4 bg-zinc-900/50 border-b border-zinc-800 flex justify-between items-center">
                            <div className="flex gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                                <div className="w-2 h-2 rounded-full bg-amber-500/50" />
                                <div className="w-2 h-2 rounded-full bg-green-500/50" />
                            </div>
                            <span className="text-[10px] text-zinc-600 font-mono tracking-widest">LIVE PREVIEW</span>
                        </div>

                        <div className="flex-1 p-8 space-y-8 overflow-y-auto">
                            {/* Mock Hero */}
                            <div className="space-y-4 pt-8">
                                <div className="w-12 h-2 bg-blue-500/20 rounded-full" />
                                <h3 className="text-3xl font-black leading-none uppercase tracking-tighter">
                                    {config.heroTitle || 'Your Headline'}
                                </h3>
                                <p className="text-sm text-zinc-500 line-clamp-2">
                                    {config.heroSubtitle || 'Your sub-headline will appear here.'}
                                </p>
                                <div className="flex gap-2">
                                    <div className="w-24 h-8 bg-white rounded-full" />
                                    <div className="w-24 h-8 bg-zinc-800 rounded-full" />
                                </div>
                            </div>

                            {/* Mock Device Indicators the user asked about */}
                            <div className="pt-12 border-t border-zinc-900 mt-20">
                                <div className="text-[10px] text-zinc-700 tracking-[0.3em] font-bold mb-6">DEVICE PREVIEWS</div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800 flex flex-col items-center gap-3">
                                        <Monitor size={24} className="text-amber-500" />
                                        <span className="text-[10px] font-bold text-zinc-500">DESKTOP</span>
                                    </div>
                                    <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800 flex flex-col items-center gap-3 opacity-50">
                                        <Smartphone size={24} className="text-emerald-500" />
                                        <span className="text-[10px] font-bold text-zinc-500">MOBILE</span>
                                    </div>
                                </div>
                                <p className="text-[10px] text-zinc-700 mt-4 leading-relaxed">
                                    * Mobile and Tablet components are automatically synchronized with the main desktop architecture.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
