'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Save, Loader2, ArrowLeft, LayoutGrid, Globe, Smartphone, Monitor, Laptop } from 'lucide-react';
import Link from 'next/link';

export default function NewProjectPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        liveUrl: '',
        desc: '',
        tags: '',
        device: 'laptop',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/admin/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: formData.title,
                    slug: formData.title.toLowerCase().replace(/\s+/g, '-'),
                    category: formData.category,
                    imageUrl: formData.liveUrl,
                    content: formData.desc,
                    techStack: formData.tags.split(',').map((t) => t.trim()),
                    features: [],
                    galleryImages: [],
                    role: formData.device,
                }),
            });

            if (res.ok) {
                router.push('/admin/projects');
                router.refresh();
            } else {
                alert('Failed to deploy infrastructure');
            }
        } catch (err) {
            console.error('Error creating project:', err);
            alert('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl relative">
            <Link
                href="/admin/projects"
                className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-all mb-10 group"
            >
                <div className="p-2 bg-zinc-950 border border-white/5 rounded-lg group-hover:border-blue-500/30 transition-all">
                    <ArrowLeft size={16} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest">Return to Asset Repository</span>
            </Link>

            <h1 className="text-4xl font-black font-syne mb-2 italic uppercase tracking-tighter text-white">Deploy <span className="text-blue-500">Asset.</span></h1>
            <p className="text-zinc-500 mb-12">Integrating a new high-fidelity infrastructure module into the ecosystem.</p>

            <form onSubmit={handleSubmit} className="space-y-10">
                <div className="bg-zinc-950 border border-white/5 rounded-[2.5rem] p-10 space-y-8 group hover:border-blue-500/10 transition-all">
                    <div className="flex items-center gap-3 mb-4">
                        <LayoutGrid className="text-blue-500" size={20} />
                        <h2 className="text-xl font-black font-syne italic uppercase">Asset Specifications</h2>
                    </div>

                    <div>
                        <label className="block text-[10px] font-black text-zinc-650 uppercase tracking-[0.2em] mb-3">
                            Asset Identifier (Title)
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full bg-black border border-white/5 rounded-2xl px-6 py-4 text-white placeholder-zinc-800 focus:outline-none focus:border-blue-500 transition-all font-bold"
                            placeholder="PROJECT_ALPHA_INTERFACE"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-[10px] font-black text-zinc-650 uppercase tracking-[0.2em] mb-3">
                                Classification (Category)
                            </label>
                            <input
                                type="text"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full bg-black border border-white/5 rounded-2xl px-6 py-4 text-white placeholder-zinc-800 focus:outline-none focus:border-blue-500 transition-all font-bold"
                                placeholder="Core Architecture"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-black text-zinc-650 uppercase tracking-[0.2em] mb-3">
                                Target Interface (Device)
                            </label>
                            <select
                                value={formData.device}
                                onChange={(e) => setFormData({ ...formData, device: e.target.value })}
                                className="w-full bg-black border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-all font-black uppercase tracking-widest text-[10px] cursor-pointer"
                            >
                                <option value="laptop">Laptop Protocol</option>
                                <option value="desktop">Desktop Matrix</option>
                                <option value="phone">Mobile Node</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-black text-zinc-650 uppercase tracking-[0.2em] mb-3">
                            Neural Link (Live URL)
                        </label>
                        <input
                            type="url"
                            value={formData.liveUrl}
                            onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                            className="w-full bg-black border border-white/5 rounded-2xl px-6 py-4 text-white placeholder-zinc-800 focus:outline-none focus:border-blue-500 transition-all font-bold"
                            placeholder="https://transmission.seranex.io"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-black text-zinc-650 uppercase tracking-[0.2em] mb-3">
                            Technical Dossier (Description)
                        </label>
                        <textarea
                            value={formData.desc}
                            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                            rows={4}
                            className="w-full bg-black border border-white/5 rounded-2xl px-6 py-4 text-white placeholder-zinc-800 focus:outline-none focus:border-blue-500 transition-all resize-none font-medium h-32"
                            placeholder="Deep technical breakdown of high-density features..."
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-black text-zinc-650 uppercase tracking-[0.2em] mb-3">
                            Semantic Tags (Comma-separated)
                        </label>
                        <input
                            type="text"
                            value={formData.tags}
                            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                            className="w-full bg-black border border-white/5 rounded-2xl px-6 py-4 text-white placeholder-zinc-800 focus:outline-none focus:border-blue-500 transition-all font-bold"
                            placeholder="Next.js, Agentic, High-Fidelity"
                            required
                        />
                    </div>
                </div>

                <div className="flex gap-4 pb-20">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-white text-black font-black py-5 rounded-full hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 uppercase text-xs tracking-widest shadow-2xl"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin" size={18} />
                        ) : (
                            <>
                                <Save size={18} />
                                Deploy Interface
                            </>
                        )}
                    </button>
                    <Link
                        href="/admin/projects"
                        className="px-10 py-5 bg-zinc-950 border border-white/5 text-zinc-500 font-black rounded-full hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all uppercase text-xs tracking-widest"
                    >
                        Abort
                    </Link>
                </div>
            </form>
        </div>
    );
}
