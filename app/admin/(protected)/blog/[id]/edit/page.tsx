'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Save, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import AdminLayout from '../../../../layout';

export default function EditBlogPostPage() {
    const router = useRouter();
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
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

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/admin/blog/${params.id}`);
                if (res.ok) {
                    const { post } = await res.json();
                    setFormData({
                        title: post.title,
                        excerpt: post.excerpt || '',
                        content: post.content || '',
                        coverImage: post.coverImage || '',
                        category: post.category || 'Technology',
                        keywords: (post.keywords || []).join(', '),
                        readTime: post.readTime || 5,
                        published: post.published || false,
                        featured: post.featured || false,
                    });
                }
            } catch (err) {
                console.error('Error fetching blog post:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [params.id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch(`/api/admin/blog/${params.id}`, {
                method: 'PATCH',
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
                alert('Failed to update post');
            }
        } catch (err) {
            console.error('Error updating post:', err);
            alert('An error occurred');
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
            <div className="max-w-4xl">
                <Link
                    href="/admin/blog"
                    className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-6"
                >
                    <ArrowLeft size={16} />
                    Back to Blog
                </Link>

                <h1 className="text-3xl font-bold font-syne italic mb-2">Edit Blog Post</h1>
                <p className="text-zinc-500 mb-8">Modify blog post details</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">
                                Title *
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">
                                Excerpt *
                            </label>
                            <textarea
                                value={formData.excerpt}
                                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                rows={2}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">
                                Content * (Markdown supported)
                            </label>
                            <textarea
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                rows={12}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors resize-none font-mono text-sm"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-2">
                                    Category *
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                >
                                    <option value="Technology">Technology</option>
                                    <option value="AI">AI</option>
                                    <option value="Web Development">Web Development</option>
                                    <option value="Business">Business</option>
                                    <option value="Design">Design</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-2">
                                    Read Time (minutes)
                                </label>
                                <input
                                    type="number"
                                    value={formData.readTime}
                                    onChange={(e) => setFormData({ ...formData, readTime: parseInt(e.target.value) })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
                                    min="1"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">
                                Cover Image URL
                            </label>
                            <input
                                type="url"
                                value={formData.coverImage}
                                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">
                                Keywords (comma-separated)
                            </label>
                            <input
                                type="text"
                                value={formData.keywords}
                                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>

                        <div className="flex gap-6">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.published}
                                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                    className="w-5 h-5 rounded bg-zinc-900 border-zinc-800 text-blue-500 focus:ring-blue-500"
                                />
                                <span className="text-sm font-medium text-zinc-400">Published</span>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.featured}
                                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                    className="w-5 h-5 rounded bg-zinc-900 border-zinc-800 text-blue-500 focus:ring-blue-500"
                                />
                                <span className="text-sm font-medium text-zinc-400">Featured post</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex-1 bg-white text-black font-bold py-3 rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="animate-spin" size={18} />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save size={18} />
                                    Save Changes
                                </>
                            )}
                        </button>
                        <Link
                            href="/admin/blog"
                            className="px-6 py-3 bg-zinc-900 border border-zinc-800 text-white font-medium rounded-xl hover:bg-zinc-800 transition-colors flex items-center justify-center"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
