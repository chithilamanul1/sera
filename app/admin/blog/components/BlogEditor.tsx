'use client';

import { useState, useEffect, useRef } from 'react';
import { saveBlogPost, getAISuggestions } from '../actions';
import { Loader2, ArrowLeft, Save, Sparkles, Eye, Edit3, Plus, Trash2, CheckCircle2, Globe, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface FAQ {
    question: string;
    answer: string;
}

interface BlogPostInput {
    id?: string;
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    coverImage?: string;
    category?: string;
    keywords?: string[];
    readTime?: number;
    published?: boolean;
    featured?: boolean;
    metaTitle?: string | null;
    metaDescription?: string | null;
    executiveSummary?: string | null;
    faqs?: any;
}

// Reusing the project's markdown parser logic for the preview
function parseMarkdown(md: string) {
    if (!md) return '';
    let html = md.trim();
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank">$1</a>');
    html = html.replace(/^\* (.*$)/gim, '<ul><li>$1</li></ul>');
    html = html.replace(/<\/ul>\n<ul>/gim, '\n');
    html = html.replace(/^- (.*$)/gim, '<ul><li>$1</li></ul>');
    html = html.replace(/<\/ul>\n<ul>/gim, '\n');
    html = html.split('\n\n').map(p => {
        if (p.startsWith('<h') || p.startsWith('<ul') || p.startsWith('<li')) return p;
        return `<p>${p}</p>`;
    }).join('\n\n');
    return html;
}

export function BlogEditor({ initialData = {} }: { initialData?: BlogPostInput }) {
    const [loading, setLoading] = useState(false);
    const [aiLoading, setAiLoading] = useState(false);
    const [view, setView] = useState<'edit' | 'preview'>('edit');
    
    // Form States
    const [title, setTitle] = useState(initialData.title || '');
    const [slug, setSlug] = useState(initialData.slug || '');
    const [content, setContent] = useState(initialData.content || '');
    const [faqs, setFaqs] = useState<FAQ[]>(Array.isArray(initialData.faqs) ? initialData.faqs : []);
    
    const [metaTitle, setMetaTitle] = useState(initialData.metaTitle || '');
    const [metaDescription, setMetaDescription] = useState(initialData.metaDescription || '');
    const [executiveSummary, setExecutiveSummary] = useState(initialData.executiveSummary || '');
    const [keywords, setKeywords] = useState(initialData.keywords?.join(', ') || '');

    // Auto-slug generation
    useEffect(() => {
        if (!initialData.id && title) {
            setSlug(title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
        }
    }, [title, initialData.id]);

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        formData.append('faqs', JSON.stringify(faqs));
        try {
            await saveBlogPost(formData);
        } catch (error) {
            console.error(error);
            alert("Failed to save post.");
            setLoading(false);
        }
    };

    const handleAISEO = async () => {
        if (!title || !content) {
            alert("Please enter a title and some content first.");
            return;
        }
        setAiLoading(true);
        try {
            const suggestions = await getAISuggestions(title, content);
            if (suggestions) {
                if (suggestions.metaTitle) setMetaTitle(suggestions.metaTitle);
                if (suggestions.metaDescription) setMetaDescription(suggestions.metaDescription);
                if (suggestions.executiveSummary) setExecutiveSummary(suggestions.executiveSummary);
                if (suggestions.tags) setKeywords(Array.isArray(suggestions.tags) ? suggestions.tags.join(', ') : suggestions.tags);
                if (suggestions.faqs) setFaqs(suggestions.faqs);
            }
        } catch (error) {
            console.error("AI Generation failed", error);
        } finally {
            setAiLoading(false);
        }
    };

    const addFAQ = () => setFaqs([...faqs, { question: '', answer: '' }]);
    const removeFAQ = (index: number) => setFaqs(faqs.filter((_, i) => i !== index));
    const updateFAQ = (index: number, field: keyof FAQ, value: string) => {
        const newFaqs = [...faqs];
        newFaqs[index][field] = value;
        setFaqs(newFaqs);
    };

    return (
        <div className="max-w-7xl mx-auto pb-24 px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/blog" className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-zinc-800 transition-all text-zinc-400">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-black uppercase tracking-tighter text-white">
                            {initialData.id ? 'Edit Masterpiece' : 'Draft New Strategy'}
                        </h1>
                        <p className="text-xs text-zinc-500 font-bold tracking-widest uppercase">Seranex Advanced CMS v2.0</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                        onClick={() => setView(view === 'edit' ? 'preview' : 'edit')}
                        className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all border ${view === 'preview' ? 'bg-white text-black border-white' : 'bg-zinc-900 text-white border-zinc-800 hover:bg-zinc-800'}`}
                    >
                        {view === 'preview' ? <Edit3 className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        {view === 'preview' ? 'Back to Editor' : 'Live Preview'}
                    </button>
                    
                    <button
                        type="submit"
                        form="blog-editor-form"
                        disabled={loading}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        {initialData.id ? 'Push Update' : 'Publish Live'}
                    </button>
                </div>
            </div>

            <form id="blog-editor-form" onSubmit={handleFormSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {initialData.id && <input type="hidden" name="id" value={initialData.id} />}
                <input type="hidden" name="faqs" value={JSON.stringify(faqs)} />

                {/* Left Panel: Content Creation */}
                <div className={`lg:col-span-8 space-y-6 ${view === 'preview' ? 'hidden lg:block' : ''}`}>
                    <div className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-900 rounded-3xl p-8 space-y-6">
                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Primary Headline</label>
                                <span className={`text-[10px] font-bold ${title.length > 50 ? 'text-blue-400' : 'text-zinc-600'}`}>{title.length} chars</span>
                            </div>
                            <input
                                name="title"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full bg-black/50 border border-zinc-800 rounded-2xl px-6 py-4 text-xl font-bold text-white focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition-all placeholder:text-zinc-700"
                                placeholder="Elite custom software development..."
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2 block">Permalink Configuration</label>
                            <div className="relative group">
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 font-mono text-sm group-focus-within:text-blue-500 transition-colors">seranex.org/blog/</span>
                                <input
                                    name="slug"
                                    required
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    className="w-full bg-black/50 border border-zinc-800 rounded-2xl pl-[135px] pr-6 py-3 text-zinc-400 focus:border-blue-500/50 focus:outline-none font-mono text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <Sparkles className="w-3 h-3 text-blue-500" />
                                    Post Architecture (Markdown)
                                </label>
                                <div className="flex gap-4">
                                    <button type="button" onClick={() => setContent(content + '\n## ')} className="text-[10px] font-bold text-zinc-500 hover:text-white uppercase tracking-tighter">H2</button>
                                    <button type="button" onClick={() => setContent(content + '\n### ')} className="text-[10px] font-bold text-zinc-500 hover:text-white uppercase tracking-tighter">H3</button>
                                    <button type="button" onClick={() => setContent(content + '\n**bold**')} className="text-[10px] font-bold text-zinc-500 hover:text-white uppercase tracking-tighter">B</button>
                                    <button type="button" onClick={() => setContent(content + '\n[Title](URL)')} className="text-[10px] font-bold text-zinc-500 hover:text-white uppercase tracking-tighter">Link</button>
                                </div>
                            </div>
                            <textarea
                                name="content"
                                required
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={25}
                                className="w-full bg-black/50 border border-zinc-800 rounded-3xl px-8 py-8 text-zinc-300 leading-relaxed focus:border-blue-500/50 focus:outline-none font-mono text-[15px] resize-none scrollbar-hide focus:ring-1 focus:ring-blue-500/10"
                                placeholder="# The Era of Agentic AI..."
                            />
                        </div>
                    </div>
                </div>

                {/* Right Panel: SEO & Config */}
                <div className={`lg:col-span-4 space-y-6 ${view === 'edit' ? 'hidden lg:block' : ''}`}>
                    
                    {/* Live Preview Overwrite for Right Panel when in Preview Mode */}
                    {view === 'preview' && (
                        <div className="lg:fixed lg:right-[calc(50%-600px)] lg:w-[calc(66%-60px)] lg:h-[calc(100vh-200px)] overflow-y-auto pr-4 scrollbar-hide">
                            <div className="bg-zinc-950/80 backdrop-blur-2xl border border-zinc-800 rounded-[3rem] p-12 overflow-hidden relative shadow-2xl">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                                <div className="prose prose-invert prose-blue max-w-none 
                                    prose-h1:text-4xl prose-h1:font-black prose-h1:tracking-tight prose-h1:font-clash prose-h1:mb-8
                                    prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-12 prose-h2:font-clash
                                    prose-p:text-zinc-400 prose-p:leading-relaxed prose-p:text-base
                                    prose-strong:text-white prose-strong:font-black
                                    prose-li:text-zinc-500">
                                    <h1>{title || 'Untiltled Strategy'}</h1>
                                    <div dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }} />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className={view === 'preview' ? 'hidden lg:block' : ''}>
                        <div className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-900 rounded-3xl p-8 space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-2">
                                    <Globe className="w-4 h-4 text-blue-500" />
                                    SEO Dashboard
                                </h3>
                                <button
                                    type="button"
                                    onClick={handleAISEO}
                                    disabled={aiLoading}
                                    className="p-2 bg-blue-500/10 border border-blue-500/20 text-blue-500 rounded-lg hover:bg-blue-500/20 transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest disabled:opacity-50"
                                >
                                    {aiLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                                    AI Assist
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2">Google Meta Title</label>
                                    <input
                                        name="metaTitle"
                                        value={metaTitle}
                                        onChange={(e) => setMetaTitle(e.target.value)}
                                        className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white text-xs focus:border-blue-500/50 focus:outline-none"
                                        placeholder="Strategic Title for Rank Dominance"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2">Meta Description</label>
                                    <textarea
                                        name="metaDescription"
                                        value={metaDescription}
                                        onChange={(e) => setMetaDescription(e.target.value)}
                                        rows={3}
                                        className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-xs focus:border-blue-500/50 focus:outline-none"
                                        placeholder="160 character snippet for high CTR..."
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2 flex items-center gap-2">
                                        Executive Summary
                                        <AlertCircle className="w-3 h-3 text-zinc-700" />
                                    </label>
                                    <textarea
                                        name="executiveSummary"
                                        value={executiveSummary}
                                        onChange={(e) => setExecutiveSummary(e.target.value)}
                                        rows={4}
                                        className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-zinc-400 italic text-xs focus:border-blue-500/50 focus:outline-none"
                                        placeholder="High-density summary for LLM grounding and AI scrapers..."
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-900 rounded-3xl p-8 space-y-6 mt-6">
                            <h3 className="text-sm font-black uppercase tracking-widest text-white flex items-center justify-between">
                                FAQ Architect
                                <Plus className="w-4 h-4 text-blue-500 cursor-pointer hover:scale-125 transition-transform" onClick={addFAQ} />
                            </h3>
                            
                            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide">
                                {faqs.map((faq, idx) => (
                                    <div key={idx} className="p-4 bg-black border border-zinc-800 rounded-2xl relative group">
                                        <button type="button" onClick={() => removeFAQ(idx)} className="absolute -top-2 -right-2 bg-zinc-900 text-zinc-500 hover:text-red-500 p-1 rounded-full border border-zinc-800 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                        <input
                                            value={faq.question}
                                            onChange={(e) => updateFAQ(idx, 'question', e.target.value)}
                                            placeholder="Question"
                                            className="w-full bg-transparent text-white text-xs font-bold focus:outline-none mb-2"
                                        />
                                        <textarea
                                            value={faq.answer}
                                            onChange={(e) => updateFAQ(idx, 'answer', e.target.value)}
                                            placeholder="Answer"
                                            className="w-full bg-transparent text-zinc-500 text-xs focus:outline-none resize-none"
                                            rows={2}
                                        />
                                    </div>
                                ))}
                                {faqs.length === 0 && <p className="text-[10px] text-zinc-600 text-center italic">No FAQs built. Use AI Assist to generate.</p>}
                            </div>
                        </div>

                        <div className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-900 rounded-3xl p-8 space-y-6 mt-6">
                            <div className="grid grid-cols-2 gap-4">
                                <label className="flex flex-col gap-3 p-4 bg-black border border-zinc-800 rounded-2xl cursor-pointer hover:border-blue-500/50 transition-all group">
                                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest group-hover:text-blue-500 transition-colors">Published</span>
                                    <div className="flex items-center justify-between">
                                        <input type="checkbox" name="published" defaultChecked={initialData.published} className="w-5 h-5 rounded border-zinc-800 bg-zinc-900 text-blue-500 focus:ring-blue-500" />
                                        <Globe className="w-4 h-4 text-zinc-700" />
                                    </div>
                                </label>
                                <label className="flex flex-col gap-3 p-4 bg-black border border-zinc-800 rounded-2xl cursor-pointer hover:border-blue-500/50 transition-all group">
                                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest group-hover:text-blue-500 transition-colors">Featured</span>
                                    <div className="flex items-center justify-between">
                                        <input type="checkbox" name="featured" defaultChecked={initialData.featured} className="w-5 h-5 rounded border-zinc-800 bg-zinc-900 text-blue-500 focus:ring-blue-500" />
                                        <CheckCircle2 className="w-4 h-4 text-zinc-700" />
                                    </div>
                                </label>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2">Category</label>
                                    <select name="category" defaultValue={initialData.category || 'AI'} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white text-xs focus:outline-none">
                                        <option value="AI">AI Engineering</option>
                                        <option value="Web">Web Development</option>
                                        <option value="Mobile">Mobile Apps</option>
                                        <option value="Enterprise">Enterprise Solutions</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2">Keywords (CSV)</label>
                                    <input name="keywords" value={keywords} onChange={(e) => setKeywords(e.target.value)} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-zinc-400 text-xs focus:outline-none" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2">Cover Image URL</label>
                                    <input name="coverImage" required defaultValue={initialData.coverImage} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-zinc-500 text-xs focus:outline-none" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
