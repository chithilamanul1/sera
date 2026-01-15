'use client';

import { motion } from 'framer-motion';
import { Calendar, User, Tag, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getAllBlogPosts, getBlogCategories, BlogPost } from '@/lib/firestore-blog';
import Link from 'next/link';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Web Design & Tech Blog Sri Lanka | Seranex Insights',
    description: 'Expert articles on web design trends, e-commerce growth, and digital marketing strategies for Sri Lankan businesses. Stay ahead with Seranex.',
    keywords: ['web design blog sri lanka', 'tech news colombo', 'e-commerce tips sri lanka', 'digital marketing trends 2026'],
};

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            const [postsData, categoriesData] = await Promise.all([
                getAllBlogPosts(true),
                getBlogCategories(),
            ]);
            setPosts(postsData);
            setCategories(['All', ...categoriesData]);
        } catch (error) {
            console.error('Error loading blog:', error);
        } finally {
            setLoading(false);
        }
    }

    const filteredPosts = selectedCategory === 'All'
        ? posts
        : posts.filter(p => p.category === selectedCategory);

    if (loading) {
        return (
            <div className="min-h-screen bg-void flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-glow-silver/20 border-t-glow-silver rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-silver/70">Loading blog...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-void">
            <Header />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-6">
                    {/* Hero */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-5xl md:text-6xl font-heading font-bold glow-text mb-6">
                            Blog
                        </h1>
                        <p className="text-xl text-silver/80 max-w-2xl mx-auto">
                            Insights, tutorials, and updates from the Seranex team
                        </p>
                    </motion.div>

                    {/* Categories */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-wrap justify-center gap-3 mb-12"
                    >
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2 rounded-full font-semibold transition-all ${selectedCategory === category
                                    ? 'bg-gradient-to-r from-silver via-white to-platinum text-void'
                                    : 'glass text-silver/90 hover:text-white'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </motion.div>

                    {/* Posts Grid */}
                    {filteredPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPosts.map((post, index) => (
                                <motion.article
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="glass rounded-2xl overflow-hidden group hover:scale-[1.02] transition-transform"
                                >
                                    {post.featuredImage && (
                                        <div className="aspect-video overflow-hidden">
                                            <img
                                                src={post.featuredImage}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                    )}

                                    <div className="p-6">
                                        <div className="flex items-center gap-4 mb-4 text-sm text-silver/70">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {post.createdAt?.toDate?.()?.toLocaleDateString() || 'Recent'}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <User className="w-4 h-4" />
                                                {post.author}
                                            </span>
                                        </div>

                                        <span className="inline-block px-3 py-1 rounded-full bg-surface text-glow-silver text-xs font-semibold mb-3">
                                            {post.category}
                                        </span>

                                        <h2 className="text-2xl font-heading font-bold text-white mb-3 group-hover:glow-text transition-all">
                                            {post.title}
                                        </h2>

                                        <p className="text-silver/80 mb-4 line-clamp-3">
                                            {post.excerpt}
                                        </p>

                                        {post.tags && post.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {post.tags.slice(0, 3).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="flex items-center gap-1 text-xs text-silver/60"
                                                    >
                                                        <Tag className="w-3 h-3" />
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <Link href={`/blog/${post.slug}`}>
                                            <motion.button
                                                whileHover={{ x: 5 }}
                                                className="text-glow-silver font-semibold flex items-center gap-2 group/btn"
                                            >
                                                Read More
                                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                            </motion.button>
                                        </Link>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-silver/70 text-lg">
                                No posts found in this category.
                            </p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
