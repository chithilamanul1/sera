'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { motion } from 'framer-motion';
import { Save, Eye, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { createBlogPost, updateBlogPost, getBlogPost } from '@/lib/firestore-blog';
import toast from 'react-hot-toast';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function BlogEditorPage() {
    const { user } = useAuth();
    const router = useRouter();
    const params = useParams();
    const isEdit = params?.id !== 'new';

    const [loading, setLoading] = useState(isEdit);
    const [saving, setSaving] = useState(false);
    const [post, setPost] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        category: 'Web Development',
        tags: [] as string[],
        featuredImage: '',
        published: false,
    });
    const [tagInput, setTagInput] = useState('');

    useEffect(() => {
        if (isEdit && params?.id) {
            loadPost(params.id as string);
        }
    }, [isEdit, params?.id]);

    async function loadPost(slug: string) {
        try {
            const data = await getBlogPost(slug);
            if (data) {
                setPost({
                    title: data.title,
                    slug: data.slug,
                    excerpt: data.excerpt,
                    content: data.content,
                    category: data.category,
                    tags: data.tags || [],
                    featuredImage: data.featuredImage || '',
                    published: data.published,
                });
            }
        } catch (error) {
            console.error('Error loading post:', error);
            toast.error('Failed to load post');
        } finally {
            setLoading(false);
        }
    }

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
    };

    const handleTitleChange = (title: string) => {
        setPost({ ...post, title, slug: generateSlug(title) });
    };

    const handleAddTag = () => {
        if (tagInput.trim() && !post.tags.includes(tagInput.trim())) {
            setPost({ ...post, tags: [...post.tags, tagInput.trim()] });
            setTagInput('');
        }
    };

    const handleRemoveTag = (tag: string) => {
        setPost({ ...post, tags: post.tags.filter(t => t !== tag) });
    };

    const handleSave = async (publish: boolean) => {
        if (!post.title || !post.content) {
            toast.error('Title and content are required');
            return;
        }

        if (!user) {
            toast.error('You must be logged in');
            return;
        }

        try {
            setSaving(true);
            const postData = {
                ...post,
                published: publish,
                author: user.displayName || user.email || 'Admin',
                authorId: user.uid,
            };

            if (isEdit && params?.id) {
                await updateBlogPost(params.id as string, postData);
                toast.success(publish ? 'Post published!' : 'Post saved as draft');
            } else {
                await createBlogPost(postData);
                toast.success(publish ? 'Post published!' : 'Post created as draft');
                router.push('/owner/blog');
            }
        } catch (error) {
            console.error('Error saving post:', error);
            toast.error('Failed to save post');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <ProtectedRoute allowedRoles={['admin', 'owner']}>
                <DashboardLayout>
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="text-center">
                            <div className="w-16 h-16 border-4 border-glow-silver/20 border-t-glow-silver rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-silver/70">Loading post...</p>
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
                        <div className="flex items-center gap-4">
                            <Link href="/owner/blog">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-2 rounded-lg bg-surface hover:bg-surface/80 text-silver/90"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </motion.button>
                            </Link>
                            <div>
                                <h1 className="text-4xl font-heading font-bold glow-text mb-2">
                                    {isEdit ? 'Edit Post' : 'New Post'}
                                </h1>
                                <p className="text-silver/70">
                                    Create and publish blog content
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <motion.button
                                onClick={() => handleSave(false)}
                                disabled={saving}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 rounded-lg bg-surface hover:bg-surface/80 text-white font-heading font-semibold flex items-center gap-2 disabled:opacity-50"
                            >
                                <Save className="w-5 h-5" />
                                Save Draft
                            </motion.button>

                            <motion.button
                                onClick={() => handleSave(true)}
                                disabled={saving}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 rounded-lg bg-gradient-to-r from-silver via-white to-platinum text-void font-heading font-semibold flex items-center gap-2 disabled:opacity-50"
                            >
                                <Eye className="w-5 h-5" />
                                {saving ? 'Publishing...' : 'Publish'}
                            </motion.button>
                        </div>
                    </div>

                    {/* Editor */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Title */}
                            <div className="glass p-6 rounded-2xl">
                                <label className="block text-silver/80 text-sm mb-2">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    value={post.title}
                                    onChange={(e) => handleTitleChange(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg bg-surface border border-silver/10 text-white text-2xl font-heading font-bold placeholder-silver/40 focus:border-glow-silver/40 focus:outline-none transition-colors"
                                    placeholder="Enter post title..."
                                />
                            </div>

                            {/* Slug */}
                            <div className="glass p-6 rounded-2xl">
                                <label className="block text-silver/80 text-sm mb-2">
                                    URL Slug
                                </label>
                                <div className="flex items-center gap-2">
                                    <span className="text-silver/60 text-sm">seranex.org/blog/</span>
                                    <input
                                        type="text"
                                        value={post.slug}
                                        onChange={(e) => setPost({ ...post, slug: e.target.value })}
                                        className="flex-1 px-4 py-2 rounded-lg bg-surface border border-silver/10 text-white placeholder-silver/40 focus:border-glow-silver/40 focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Excerpt */}
                            <div className="glass p-6 rounded-2xl">
                                <label className="block text-silver/80 text-sm mb-2">
                                    Excerpt
                                </label>
                                <textarea
                                    value={post.excerpt}
                                    onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-lg bg-surface border border-silver/10 text-white placeholder-silver/40 focus:border-glow-silver/40 focus:outline-none transition-colors"
                                    placeholder="Brief description of the post..."
                                />
                            </div>

                            {/* Content */}
                            <div className="glass p-6 rounded-2xl">
                                <label className="block text-silver/80 text-sm mb-2">
                                    Content *
                                </label>
                                <textarea
                                    value={post.content}
                                    onChange={(e) => setPost({ ...post, content: e.target.value })}
                                    rows={20}
                                    className="w-full px-4 py-3 rounded-lg bg-surface border border-silver/10 text-white placeholder-silver/40 focus:border-glow-silver/40 focus:outline-none transition-colors font-mono text-sm"
                                    placeholder="Write your post content here... (Markdown supported)"
                                />
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Category */}
                            <div className="glass p-6 rounded-2xl">
                                <label className="block text-silver/80 text-sm mb-2">
                                    Category
                                </label>
                                <select
                                    value={post.category}
                                    onChange={(e) => setPost({ ...post, category: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-surface border border-silver/10 text-white focus:border-glow-silver/40 focus:outline-none"
                                >
                                    <option value="Web Development">Web Development</option>
                                    <option value="Mobile Apps">Mobile Apps</option>
                                    <option value="UI/UX Design">UI/UX Design</option>
                                    <option value="Digital Marketing">Digital Marketing</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Business">Business</option>
                                </select>
                            </div>

                            {/* Tags */}
                            <div className="glass p-6 rounded-2xl">
                                <label className="block text-silver/80 text-sm mb-2">
                                    Tags
                                </label>
                                <div className="flex gap-2 mb-3">
                                    <input
                                        type="text"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                                        className="flex-1 px-4 py-2 rounded-lg bg-surface border border-silver/10 text-white placeholder-silver/40 focus:border-glow-silver/40 focus:outline-none transition-colors"
                                        placeholder="Add tag..."
                                    />
                                    <button
                                        onClick={handleAddTag}
                                        className="px-4 py-2 rounded-lg bg-surface hover:bg-surface/80 text-glow-silver font-semibold"
                                    >
                                        Add
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 rounded-full bg-surface text-silver/90 text-sm flex items-center gap-2"
                                        >
                                            {tag}
                                            <button
                                                onClick={() => handleRemoveTag(tag)}
                                                className="text-red-500 hover:text-red-400"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Featured Image */}
                            <div className="glass p-6 rounded-2xl">
                                <label className="block text-silver/80 text-sm mb-2">
                                    Featured Image URL
                                </label>
                                <input
                                    type="url"
                                    value={post.featuredImage}
                                    onChange={(e) => setPost({ ...post, featuredImage: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-surface border border-silver/10 text-white placeholder-silver/40 focus:border-glow-silver/40 focus:outline-none transition-colors"
                                    placeholder="https://..."
                                />
                                {post.featuredImage && (
                                    <img
                                        src={post.featuredImage}
                                        alt="Preview"
                                        className="mt-4 w-full h-40 object-cover rounded-lg"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </ProtectedRoute>
    );
}
