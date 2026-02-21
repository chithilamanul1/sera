'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Save, Loader2, ArrowLeft, Eye, FileText, Globe, Tag } from 'lucide-react';
import Link from 'next/link';

export default function NewBlogPostPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        coverImage: '',
        category: 'Technology',
        keywords: '',
        readTime: 5,
        published: false,
        featured: false,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/admin/blog', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    keywords: formData.keywords.split(',').map((k) => k.trim()),
                }),
            });

            if (res.ok) {
                router.push('/admin/blog');
                router.refresh();
            } else {
                alert('Failed to initialize document');
            }
        } catch (err) {
            console.error('Error creating post:', err);
            alert('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl relative">
            <Link
                href="/admin/blog"
                className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-all mb-10 group"
            >
                <div className="p-2 bg-zinc-950 border border-white/5 rounded-lg group-hover:border-blue-500/30 transition-all">
                    <ArrowLeft size={16} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest">Return to Repository</span>
            </Link>

            <h1 className="text-4xl font-black font-syne mb-2 italic uppercase tracking-tighter text-white">Initialize <span className="text-blue-500">Intel.</span></h1>
            <p className="text-zinc-500 mb-12">Staging a new intelligence document for global transmission.</p>

            <form onSubmit={handleSubmit} className="space-y-10">
                <div className="bg-zinc-950 border border-white/5 rounded-[2.5rem] p-10 space-y-8 group hover:border-blue-500/10 transition-all">
                    <div className="flex items-center gap-3 mb-4">
                        <FileText className="text-blue-500" size={20} />
                        <h2 className="text-xl font-black font-syne italic uppercase">Core Metadata</h2>
                    </div>

                    <div>
                        <label className="block text-[10px] font-black text-zinc-650 uppercase tracking-[0.2em] mb-3">
                            Document Title
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full bg-black border border-white/5 rounded-2xl px-6 py-4 text-white placeholder-zinc-800 focus:outline-none focus:border-blue-500 transition-all font-bold"
                            placeholder="OPERATIONAL_REPORTS_2026"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-black text-zinc-650 uppercase tracking-[0.2em] mb-3">
                            Executive Summary (Excerpt)
                        </label>
                        <textarea
                            value={formData.excerpt}
                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                            rows={2}
                            className="w-full bg-black border border-white/5 rounded-2xl px-6 py-4 text-white placeholder-zinc-800 focus:outline-none focus:border-blue-500 transition-all resize-none font-medium h-24"
                            placeholder="Brief briefing for high-level consumption..."
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-black text-zinc-650 uppercase tracking-[0.2em] mb-3">
                            Full Intelligence Body (Markdown)
                        </label>
                        <textarea
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            rows={12}
                            className="w-full bg-black border border-white/5 rounded-2xl px-8 py-6 text-zinc-300 placeholder-zinc-800 focus:outline-none focus:border-blue-500 transition-all resize-none font-mono text-sm leading-relaxed"
                            placeholder="// Enter detailed technical data here..."
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-[10px] font-black text-zinc-650 uppercase tracking-[0.2em] mb-3">
                                Intelligence Classification (Category)
                            </label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full bg-black border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-all font-black uppercase tracking-widest text-[10px] cursor-pointer"
                            >
                                <option value="Technology">Technology</option>
                                <option value="AI">Artificial Intelligence</option>
                                <option value="Web Development">Web Architecture</option>
                                <option value="Business">Market Intel</option>
                                <option value="Design">Visual Systems</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black text-zinc-650 uppercase tracking-[0.2em] mb-3">
                                Estimated Consuming Time (Minutes)
                            </label>
                            <input
                                type="number"
                                value={formData.readTime}
                                onChange={(e) => setFormData({ ...formData, readTime: parseInt(e.target.value) })}
                                className="w-full bg-black border border-white/5 rounded-2xl px-6 py-4 text-white placeholder-zinc-800 focus:outline-none focus:border-blue-500 transition-all font-bold"
                                min="1"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 pt-8">
                        <label className="flex items-center gap-4 cursor-pointer group/toggle">
                            <input
                                type="checkbox"
                                checked={formData.published}
                                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                className="w-6 h-6 rounded-lg bg-black border-white/5 text-blue-500 focus:ring-0 transition-all"
                            />
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover/toggle:text-white transition-colors">Immediate Broadcast</span>
                        </label>

                        <label className="flex items-center gap-4 cursor-pointer group/toggle">
                            <input
                                type="checkbox"
                                checked={formData.featured}
                                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                className="w-6 h-6 rounded-lg bg-black border-white/5 text-purple-500 focus:ring-0 transition-all"
                            />
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover/toggle:text-white transition-colors">Priority Staging</span>
                        </label>
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
                                {formData.published ? 'Initiate Broadcast' : 'Stage Document'}
                            </>
                        )}
                    </button>
                    <Link
                        href="/admin/blog"
                        className="px-10 py-5 bg-zinc-950 border border-white/5 text-zinc-500 font-black rounded-full hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all uppercase text-xs tracking-widest"
                    >
                        Terminated
                    </Link>
                </div>
            </form>
        </div>
    );
}
