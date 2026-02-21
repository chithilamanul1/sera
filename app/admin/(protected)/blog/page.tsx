'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Trash2, Edit, Eye, Loader2, Calendar, FileText, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    published: boolean;
    featured: boolean;
    views: number;
    createdAt: string;
}

export default function BlogListPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/admin/blog');
            if (res.ok) {
                const data = await res.json();
                setPosts(data.posts || []);
            }
        } catch (err) {
            console.error('Error fetching posts:', err);
        } finally {
            setLoading(false);
        }
    };

    const deletePost = async (id: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return;

        try {
            const res = await fetch(`/api/admin/blog/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setPosts(posts.filter((p) => p.id !== id));
            }
        } catch (err) {
            console.error('Error deleting post:', err);
        }
    };

    const togglePublish = async (id: string, currentStatus: boolean) => {
        try {
            const res = await fetch(`/api/admin/blog/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ published: !currentStatus }),
            });

            if (res.ok) {
                setPosts(posts.map((p) => (p.id === id ? { ...p, published: !currentStatus } : p)));
            }
        } catch (err) {
            console.error('Error updating post:', err);
        }
    };

    const filteredPosts = posts
        .filter((p) => {
            if (filter === 'published') return p.published;
            if (filter === 'draft') return !p.published;
            return true;
        })
        .filter(
            (p) =>
                p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.category.toLowerCase().includes(searchQuery.toLowerCase())
        );

    if (loading) {
        return (
            <div className="flex justify-center py-24">
                <Loader2 className="animate-spin text-blue-500 w-12 h-12" />
            </div>
        );
    }

    return (
        <div className="relative">
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="text-3xl font-bold font-syne mb-2 tracking-tight text-white">Blog Posts</h1>
                    <p className="text-zinc-500 text-sm">Write and manage your blog articles.</p>
                </div>
                <Link
                    href="/admin/blog/new"
                    className="flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-full hover:scale-105 active:scale-95 transition-all text-sm"
                >
                    <Plus size={18} />
                    New Post
                </Link>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-10">
                <div className="flex-1 relative group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-700 group-hover:text-blue-500 transition-colors" size={20} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search posts..."
                        className="w-full bg-zinc-950 border border-white/5 rounded-2xl px-12 py-4 text-white placeholder-zinc-700 focus:outline-none focus:border-blue-500/50 transition-all text-sm"
                    />
                </div>
                <div className="flex gap-2 p-1.5 bg-zinc-950 border border-white/5 rounded-2xl">
                    {(['all', 'published', 'draft'] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-5 py-2.5 rounded-lg text-xs font-semibold transition-all ${filter === f
                                ? 'bg-white text-black'
                                : 'text-zinc-500 hover:text-zinc-300'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {filteredPosts.length === 0 ? (
                <div className="text-center py-20 bg-zinc-900/30 border border-white/5 rounded-3xl">
                    <FileText className="mx-auto mb-4 text-zinc-700" size={40} />
                    <p className="text-zinc-500 text-sm">No blog posts found.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {filteredPosts.map((post, idx) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-zinc-950 border border-white/5 rounded-2xl p-6 hover:border-blue-500/20 transition-all group overflow-hidden relative"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-3 mb-3">
                                        <h3 className="font-bold text-xl text-white group-hover:text-blue-400 transition-colors">{post.title}</h3>
                                        <div className="flex gap-2">
                                            {post.featured && (
                                                <span className="text-[10px] font-medium px-2.5 py-1 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
                                                    Featured
                                                </span>
                                            )}
                                            <span
                                                className={`text-[10px] font-medium px-2.5 py-1 rounded-full border transition-all ${post.published
                                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                    : 'bg-zinc-900 text-zinc-500 border-white/5'
                                                    }`}
                                            >
                                                {post.published ? 'Published' : 'Draft'}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-zinc-500 text-sm mb-5 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                                    <div className="flex items-center gap-6 text-xs text-zinc-500 pt-4 border-t border-white/5">
                                        <span className="flex items-center gap-1.5">
                                            <Calendar size={12} className="text-zinc-600" />
                                            {new Date(post.createdAt).toLocaleDateString()}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Eye size={12} className="text-zinc-600" />
                                            {post.views} views
                                        </span>
                                        <span className="text-blue-400 text-xs">{post.category}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 ml-8">
                                    <button
                                        onClick={() => togglePublish(post.id, post.published)}
                                        className="p-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-500 hover:text-white border border-white/5 rounded-xl transition-all"
                                        title={post.published ? 'Unpublish' : 'Publish'}
                                    >
                                        <ShieldCheck size={16} className={post.published ? 'text-emerald-400' : ''} />
                                    </button>
                                    <Link
                                        href={`/admin/blog/${post.id}/edit`}
                                        className="p-2.5 bg-white text-black rounded-xl hover:scale-105 active:scale-95 transition-all"
                                    >
                                        <Edit size={16} />
                                    </Link>
                                    <button
                                        onClick={() => deletePost(post.id)}
                                        className="p-2.5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
