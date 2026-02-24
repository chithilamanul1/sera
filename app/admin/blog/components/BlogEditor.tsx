'use client';

import { useState } from 'react';
import { saveBlogPost } from '../actions';
import { Loader2, ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
    executiveSummary?: string | null;
}

export function BlogEditor({ initialData = {} }: { initialData?: BlogPostInput }) {
    const [loading, setLoading] = useState(false);

    // Convert array of keywords to comma separated string for the input
    const initialKeywords = initialData.keywords?.join(', ') || '';

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // We use native form submission but wrap it to show loading states
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        try {
            await saveBlogPost(formData);
        } catch (error) {
            console.error(error);
            alert("Failed to save post.");
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto pb-24">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin/blog" className="p-2 bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-zinc-800 transition-all">
                        <ArrowLeft className="w-5 h-5 text-zinc-400" />
                    </Link>
                    <h1 className="text-3xl font-bold font-clash uppercase tracking-widest text-white">
                        {initialData.id ? 'Edit Post' : 'New Blog Post'}
                    </h1>
                </div>
                <button
                    type="submit"
                    form="blog-editor-form"
                    disabled={loading}
                    className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-3 rounded-xl transition-all disabled:opacity-50"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    {initialData.id ? 'Save Changes' : 'Create Post'}
                </button>
            </div>

            <form id="blog-editor-form" onSubmit={handleFormSubmit} className="space-y-6">
                {initialData.id && <input type="hidden" name="id" value={initialData.id} />}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Main Editing Column */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 space-y-4">
                            <div>
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Post Title</label>
                                <input
                                    name="title"
                                    required
                                    defaultValue={initialData.title}
                                    className="w-full mt-2 bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-cyan-500/50 focus:outline-none transition-colors"
                                    placeholder="Enter extreme value proposition..."
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">URL Slug</label>
                                <input
                                    name="slug"
                                    required
                                    defaultValue={initialData.slug}
                                    className="w-full mt-2 bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-cyan-500/50 focus:outline-none transition-colors font-mono text-sm"
                                    placeholder="your-optimized-slug"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Short Excerpt (Meta Description)</label>
                                <textarea
                                    name="excerpt"
                                    required
                                    defaultValue={initialData.excerpt}
                                    rows={2}
                                    className="w-full mt-2 bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-cyan-500/50 focus:outline-none transition-colors"
                                    placeholder="Compelling 150-160 character description for Google snippets..."
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 flex justify-between">
                                    <span>Content Body (Markdown Supported)</span>
                                    <span className="text-cyan-500">Preview dynamically generated on frontend</span>
                                </label>
                                <textarea
                                    name="content"
                                    required
                                    defaultValue={initialData.content}
                                    rows={15}
                                    className="w-full mt-2 bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-cyan-500/50 focus:outline-none transition-colors font-mono text-sm"
                                    placeholder="## Start your elite technical write-up here..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Metadata & Config Column */}
                    <div className="space-y-6">
                        <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 space-y-4">
                            <h3 className="font-bold border-b border-zinc-800 pb-2 mb-4">Publishing Status</h3>

                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="published"
                                    defaultChecked={initialData.published}
                                    className="w-5 h-5 rounded border-zinc-800 bg-black text-cyan-500 focus:ring-cyan-500"
                                />
                                <span className="font-medium text-white">Publicly Visible</span>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="featured"
                                    defaultChecked={initialData.featured}
                                    className="w-5 h-5 rounded border-zinc-800 bg-black text-cyan-500 focus:ring-cyan-500"
                                />
                                <span className="font-medium text-white">Featured Pillar Post</span>
                            </label>
                        </div>

                        <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 space-y-4">
                            <h3 className="font-bold border-b border-zinc-800 pb-2 mb-4">SEO & Taxonomy</h3>

                            <div>
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Category</label>
                                <select
                                    name="category"
                                    defaultValue={initialData.category || 'AI'}
                                    className="w-full mt-2 bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-cyan-500/50 focus:outline-none"
                                >
                                    <option value="AI">AI Engineering</option>
                                    <option value="Web">Web Development</option>
                                    <option value="Mobile">Mobile Apps</option>
                                    <option value="Enterprise">Enterprise Solutions</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Cover Image URL</label>
                                <input
                                    name="coverImage"
                                    required
                                    defaultValue={initialData.coverImage}
                                    className="w-full mt-2 bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-cyan-500/50 focus:outline-none text-xs"
                                    placeholder="https://..."
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Keywords (CSV)</label>
                                <input
                                    name="keywords"
                                    defaultValue={initialKeywords}
                                    className="w-full mt-2 bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-cyan-500/50 focus:outline-none text-xs"
                                    placeholder="Agentic AI, Web Vitals, ..."
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Read Time (Mins)</label>
                                <input
                                    type="number"
                                    name="readTime"
                                    defaultValue={initialData.readTime || 5}
                                    className="w-full mt-2 bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-cyan-500/50 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
