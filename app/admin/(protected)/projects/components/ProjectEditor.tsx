'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Save, Loader2, ArrowLeft, LayoutGrid, Globe, 
    Smartphone, Monitor, Laptop, Sparkles, Eye, 
    Code2, Box, Zap, Trash2, Plus, CheckCircle2 
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { generateProjectSEO } from '@/lib/ai-seo';

interface ProjectData {
    id?: string;
    title: string;
    slug: string;
    category: string;
    imageUrl: string;
    content: string;
    techStack: string[];
    role: string; // Used for device type
    executiveSummary?: string;
    metaTitle?: string;
    metaDescription?: string;
}

export default function ProjectEditor({ initialData, mode = 'create' }: { initialData?: any, mode?: 'create' | 'edit' }) {
    const router = useRouter();
    const [data, setData] = useState<ProjectData>(initialData || {
        title: '',
        slug: '',
        category: 'Web',
        imageUrl: '',
        content: '',
        techStack: [],
        role: 'laptop',
        executiveSummary: '',
        metaTitle: '',
        metaDescription: ''
    });

    const [isGenerating, setIsGenerating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);
    const [newTag, setNewTag] = useState('');

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const url = mode === 'create' ? '/api/admin/projects' : `/api/admin/projects/${data.id}`;
            const method = mode === 'create' ? 'POST' : 'PATCH';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                router.push('/admin/projects');
                router.refresh();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsSaving(false);
        }
    };

    const runAIAssist = async () => {
        if (!data.title || data.content.length < 50) {
            alert('Please provide a title and detailed content first.');
            return;
        }

        setIsGenerating(true);
        try {
            const aiData = await generateProjectSEO(data.title, data.content);
            if (aiData) {
                setData(prev => ({
                    ...prev,
                    metaTitle: aiData.metaTitle,
                    metaDescription: aiData.metaDescription,
                    executiveSummary: aiData.executiveSummary,
                    techStack: [...new Set([...prev.techStack, ...aiData.techStack.split(',').map((s: string) => s.trim())])],
                    category: aiData.category
                }));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsGenerating(false);
        }
    };

    const addTag = () => {
        if (newTag && !data.techStack.includes(newTag)) {
            setData(prev => ({ ...prev, techStack: [...prev.techStack, newTag] }));
            setNewTag('');
        }
    };

    const removeTag = (tag: string) => {
        setData(prev => ({ ...prev, techStack: prev.techStack.filter(t => t !== tag) }));
    };

    return (
        <div className="max-w-7xl mx-auto space-y-10 pb-32">
            {/* Header Actions */}
            <div className="flex items-center justify-between sticky top-6 z-50 bg-black/80 backdrop-blur-xl p-4 rounded-3xl border border-white/5 shadow-2xl">
                <div className="flex items-center gap-6">
                    <Link href="/admin/projects" className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl hover:text-blue-500 transition-colors">
                        <ArrowLeft size={18} />
                    </Link>
                    <div>
                        <h1 className="text-xl font-black uppercase tracking-tighter text-white">
                            {mode === 'create' ? 'Initialize' : 'Calibrate'} <span className="text-blue-500">Asset.</span>
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setPreviewMode(!previewMode)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                            previewMode ? 'bg-blue-500 text-white' : 'bg-zinc-900 text-zinc-500 hover:text-white'
                        }`}
                    >
                        <Eye size={14} />
                        Preview Matrix
                    </button>

                    <button
                        onClick={runAIAssist}
                        disabled={isGenerating}
                        className="flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-blue-500/50 transition-all disabled:opacity-50"
                    >
                        {isGenerating ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} className="text-blue-500" />}
                        AI Neural Assist
                    </button>

                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-8 py-3 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-2xl active:scale-95 disabled:opacity-50"
                    >
                        {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                        Sync Asset
                    </button>
                </div>
            </div>

            {!previewMode ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Form */}
                    <div className="lg:col-span-2 space-y-8">
                        <section className="bg-zinc-950/50 border border-zinc-900 rounded-[2.5rem] p-10 space-y-8">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-2">Asset Identifier (Title)</label>
                                    <input
                                        value={data.title}
                                        onChange={e => setData({ ...data, title: e.target.value })}
                                        placeholder="e.g. XERA WhatsApp Ecosystem"
                                        className="w-full bg-black/40 border border-zinc-900 rounded-2xl px-6 py-4 text-white font-bold tracking-tight focus:border-blue-500/50 outline-none"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-2">Classification</label>
                                        <select
                                            value={data.category}
                                            onChange={e => setData({ ...data, category: e.target.value })}
                                            className="w-full bg-black/40 border border-zinc-900 rounded-2xl px-6 py-4 text-white font-bold tracking-tight focus:border-blue-500/50 outline-none appearance-none cursor-pointer"
                                        >
                                            <option value="Web">Web Systems</option>
                                            <option value="Mobile">Mobile Apps</option>
                                            <option value="AI">AI Engines</option>
                                            <option value="Enterprise">Enterprise ERP</option>
                                            <option value="E-Commerce">Global Commerce</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-2">Target Interface</label>
                                        <div className="flex gap-2 p-1 bg-black/40 border border-zinc-900 rounded-2xl">
                                            {['laptop', 'phone', 'desktop'].map((type) => (
                                                <button
                                                    key={type}
                                                    onClick={() => setData({ ...data, role: type })}
                                                    className={`flex-1 flex items-center justify-center py-3 rounded-xl transition-all ${
                                                        data.role === type ? 'bg-zinc-800 text-blue-500 shadow-inner' : 'text-zinc-600 hover:text-zinc-400'
                                                    }`}
                                                >
                                                    {type === 'laptop' && <Laptop size={16} />}
                                                    {type === 'phone' && <Smartphone size={16} />}
                                                    {type === 'desktop' && <Monitor size={16} />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-2">Dossier (Content)</label>
                                    <textarea
                                        value={data.content}
                                        onChange={e => setData({ ...data, content: e.target.value })}
                                        rows={12}
                                        placeholder="Outline the case study, technical challenges, and solutions..."
                                        className="w-full bg-black/40 border border-zinc-900 rounded-3xl px-8 py-6 text-white leading-relaxed focus:border-blue-500/50 outline-none resize-none font-medium text-sm"
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="bg-zinc-950/50 border border-zinc-900 rounded-[2.5rem] p-10 space-y-8">
                            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-blue-500 flex items-center gap-2">
                                <Code2 size={16} /> Tech Stack Architecture
                            </h3>
                            
                            <div className="flex flex-wrap gap-3">
                                {data.techStack.map((tag) => (
                                    <span key={tag} className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                        {tag}
                                        <button onClick={() => removeTag(tag)} className="hover:text-red-500 transition-colors">
                                            <X size={12} />
                                        </button>
                                    </span>
                                ))}
                                <div className="flex items-center bg-black/40 border border-white/5 rounded-full px-4 ml-2">
                                    <input
                                        value={newTag}
                                        onChange={e => setNewTag(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && addTag()}
                                        placeholder="Add node..."
                                        className="bg-transparent text-[10px] font-black uppercase tracking-widest py-2 outline-none w-24 text-white"
                                    />
                                    <button onClick={addTag} className="text-zinc-600 hover:text-white">
                                        <Plus size={14} />
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar: SEO & GEO Optimization */}
                    <div className="space-y-8">
                        <section className="bg-zinc-950/50 border border-zinc-900 rounded-[2.5rem] p-8 space-y-6">
                            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-blue-500 flex items-center gap-2">
                                <Zap size={16} /> GE-Optimization
                            </h3>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Executive Preview</label>
                                    <textarea
                                        value={data.executiveSummary}
                                        onChange={e => setData({ ...data, executiveSummary: e.target.value })}
                                        className="w-full bg-black/40 border border-zinc-900 rounded-2xl p-4 text-xs text-zinc-300 leading-relaxed focus:border-blue-500/50 outline-none resize-none h-24"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Neural Meta Title</label>
                                    <input
                                        value={data.metaTitle}
                                        onChange={e => setData({ ...data, metaTitle: e.target.value })}
                                        className="w-full bg-black/40 border border-zinc-900 rounded-2xl p-4 text-xs text-white focus:border-blue-500/50 outline-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Neural Description</label>
                                    <textarea
                                        value={data.metaDescription}
                                        onChange={e => setData({ ...data, metaDescription: e.target.value })}
                                        className="w-full bg-black/40 border border-zinc-900 rounded-2xl p-4 text-xs text-zinc-400 focus:border-blue-500/50 outline-none resize-none h-20"
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="bg-zinc-950/50 border border-zinc-900 rounded-[2.5rem] p-8 space-y-6">
                            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-blue-500 flex items-center gap-2">
                                <Globe size={16} /> Asset Imagery
                            </h3>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Cover Image URL</label>
                                <input
                                    value={data.imageUrl}
                                    onChange={e => setData({ ...data, imageUrl: e.target.value })}
                                    className="w-full bg-black/40 border border-zinc-900 rounded-2xl p-4 text-xs text-white focus:border-blue-500/50 outline-none"
                                />
                            </div>
                            {data.imageUrl && (
                                <div className="w-full aspect-video rounded-2xl overflow-hidden border border-white/5">
                                    <img src={data.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </section>
                    </div>
                </div>
            ) : (
                /* Live Preview Mode */
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-20 bg-black min-h-screen rounded-[3rem] p-20 border border-zinc-900"
                >
                    <div className="max-w-4xl mx-auto space-y-12">
                        <header className="space-y-6">
                            <div className="flex items-center gap-4">
                                <span className="px-4 py-1.5 bg-blue-500/10 text-blue-500 text-[10px] font-black uppercase tracking-[0.3em] rounded-full border border-blue-500/20">
                                    Case Study / {data.category}
                                </span>
                            </div>
                            <h1 className="text-7xl font-black tracking-tighter text-white leading-[0.95]">{data.title}</h1>
                            <p className="text-xl text-zinc-400 leading-relaxed font-medium">{data.executiveSummary}</p>
                        </header>

                        <div className="flex flex-wrap gap-3 pt-6 border-t border-zinc-900">
                            {data.techStack.map(tag => (
                                <span key={tag} className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{tag} /</span>
                            ))}
                        </div>

                        <div className="prose prose-invert max-w-none prose-lg">
                            {data.content.split('\n').map((line, i) => (
                                <p key={i} className="text-zinc-300 leading-[1.7] mb-6">{line}</p>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
