'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Trash2, Edit, Eye, Loader2, Calendar } from 'lucide-react';
import Link from 'next/link';
import AdminLayout from '../../layout';

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

    return (
        <AdminLayout>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold font-syne italic mb-2">Blog Posts</h1>
                    <p className="text-zinc-500">Manage your blog content</p>
                </div>
                <Link
                    href="/admin/blog/new"
                    className="flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-xl hover:bg-zinc-200 transition-colors"
                >
                    <Plus size={18} />
                    New Post
                </Link>
            </div>

            <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search posts..."
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-12 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                </div>
                <div className="flex gap-2">
                    {(['all', 'published', 'draft'] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-3 rounded-xl font-medium text-sm transition-all ${filter === f
                                    ? 'bg-white text-black'
                                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-zinc-700'
                                }`}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-24">
                    <Loader2 className="animate-spin text-blue-500 w-12 h-12" />
                </div>
            ) : filteredPosts.length === 0 ? (
                <div className="text-center py-24">
                    <p className="text-zinc-500 mb-4">No posts found</p>
                    <Link
                        href="/admin/blog/new"
                        className="inline-flex items-center gap-2 text-blue-500 hover:underline"
                    >
                        <Plus size={16} />
                        Create your first post
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredPosts.map((post) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-bold text-lg">{post.title}</h3>
                                        {post.featured && (
                                            <span className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/30">
                                                Featured
                                            </span>
                                        )}
                                        <span
                                            className={`text-xs px-2 py-1 rounded-lg ${post.published
                                                    ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                                                    : 'bg-zinc-800 text-zinc-500'
                                                }`}
                                        >
                                            {post.published ? 'Published' : 'Draft'}
                                        </span>
                                    </div>
                                    <p className="text-zinc-400 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                                    <div className="flex items-center gap-4 text-xs text-zinc-500">
                                        <span className="flex items-center gap-1">
                                            <Calendar size={12} />
                                            {new Date(post.createdAt).toLocaleDateString()}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Eye size={12} />
                                            {post.views} views
                                        </span>
                                        <span className="uppercase tracking-wider">{post.category}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 ml-4">
                                    <button
                                        onClick={() => togglePublish(post.id, post.published)}
                                        className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-lg transition-colors text-xs"
                                    >
                                        {post.published ? 'Unpublish' : 'Publish'}
                                    </button>
                                    <Link
                                        href={`/admin/blog/${post.id}/edit`}
                                        className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-lg transition-colors text-xs flex items-center gap-1"
                                    >
                                        <Edit size={12} />
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => deletePost(post.id)}
                                        className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-medium rounded-lg transition-colors text-xs flex items-center gap-1"
                                    >
                                        <Trash2 size={12} />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}
