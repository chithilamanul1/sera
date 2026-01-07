'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getAllBlogPosts, deleteBlogPost, BlogPost } from '@/lib/firestore-blog';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function BlogManagerPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPosts();
    }, []);

    async function loadPosts() {
        try {
            const data = await getAllBlogPosts(false); // Get all posts including drafts
            setPosts(data);
        } catch (error) {
            console.error('Error loading posts:', error);
            toast.error('Failed to load blog posts');
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this blog post?')) return;

        try {
            await deleteBlogPost(id);
            setPosts(posts.filter(p => p.id !== id));
            toast.success('Blog post deleted');
        } catch (error) {
            toast.error('Failed to delete post');
        }
    };

    if (loading) {
        return (
            <ProtectedRoute allowedRoles={['admin', 'owner']}>
                <DashboardLayout>
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="text-center">
                            <div className="w-16 h-16 border-4 border-glow-silver/20 border-t-glow-silver rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-silver/70">Loading blog posts...</p>
                        </div>
                    </div>
                </DashboardLayout>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute allowedRoles={['admin', 'owner']}>
            <DashboardLayout>
                <div className="space-y-8">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-4xl font-heading font-bold glow-text mb-2">
                                Blog Manager
                            </h1>
                            <p className="text-silver/70">
                                Create and manage blog posts for your website
                            </p>
                        </div>

                        <Link href="/owner/blog/new">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 rounded-lg bg-gradient-to-r from-silver via-white to-platinum text-void font-heading font-semibold flex items-center gap-2"
                            >
                                <Plus className="w-5 h-5" />
                                New Post
                            </motion.button>
                        </Link>
                    </div>

                    {/* Posts List */}
                    {posts.length > 0 ? (
                        <div className="glass rounded-2xl overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-surface/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-silver/90">Title</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-silver/90">Category</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-silver/90">Author</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-silver/90">Views</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-silver/90">Status</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-silver/90">Date</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-silver/90">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-silver/10">
                                    {posts.map((post) => (
                                        <tr key={post.id} className="hover:bg-surface/30 transition-colors">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="text-white font-medium">{post.title}</p>
                                                    <p className="text-silver/60 text-sm truncate max-w-md">{post.excerpt}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-silver/90">{post.category}</td>
                                            <td className="px-6 py-4 text-silver/90">{post.author}</td>
                                            <td className="px-6 py-4 text-silver/90">{post.views || 0}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit ${post.published
                                                        ? 'bg-green-500/20 text-green-500'
                                                        : 'bg-yellow-500/20 text-yellow-500'
                                                    }`}>
                                                    {post.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                                                    {post.published ? 'Published' : 'Draft'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-silver/70 text-sm">
                                                {post.createdAt?.toDate?.()?.toLocaleDateString() || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <Link href={`/owner/blog/edit/${post.id}`}>
                                                        <button className="p-2 rounded-lg bg-surface hover:bg-surface/80 text-blue-500 transition-colors">
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(post.id)}
                                                        className="p-2 rounded-lg bg-surface hover:bg-surface/80 text-red-500 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="glass p-12 rounded-2xl text-center">
                            <Plus className="w-16 h-16 mx-auto mb-4 text-silver/30" />
                            <h3 className="text-xl font-heading font-bold text-white mb-2">
                                No Blog Posts Yet
                            </h3>
                            <p className="text-silver/70 mb-6">
                                Create your first blog post to start sharing content
                            </p>
                            <Link href="/owner/blog/new">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-silver via-white to-platinum text-void font-heading font-semibold"
                                >
                                    Create First Post
                                </motion.button>
                            </Link>
                        </div>
                    )}
                </div>
            </DashboardLayout>
        </ProtectedRoute>
    );
}
