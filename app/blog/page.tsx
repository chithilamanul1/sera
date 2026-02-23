
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { blogPosts, BlogPost } from '@/lib/blog/posts';
import Link from 'next/link';
import { Sparkles, Smartphone, Terminal, ArrowRight, Clock } from 'lucide-react';
import Image from 'next/image';

export default function BlogPage() {
    const featuredPost = blogPosts.find(p => p.featured);
    const regularPosts = blogPosts.filter(p => !p.featured);

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-cyan-500/30">
            <Navbar />

            <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-20 text-center space-y-4">
                    <h1 className="text-6xl md:text-8xl font-bold font-clash uppercase tracking-widest italic tracking-tighter">
                        SERA<span className="text-cyan-400">BLOG</span>
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-300 text-xl max-w-2xl mx-auto">
                        Elite technical insights on AI, Mobile Performance, and Enterprise Sovereignty.
                    </p>
                </div>

                {/* Main Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto gap-6">

                    {/* Featured Pillar (Large) */}
                    {featuredPost && (
                        <Link
                            href={`/blog/${featuredPost.slug}`}
                            className="md:col-span-3 md:row-span-2 group relative overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800/50 hover:border-cyan-500/50 transition-all duration-500"
                        >
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={featuredPost.coverImage}
                                    alt={featuredPost.title}
                                    fill
                                    className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                            </div>

                            <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-end">
                                <span className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest">
                                    <Sparkles className="w-3 h-3" />
                                    Featured Pillar
                                </span>
                                <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight group-hover:text-cyan-400 transition-colors">
                                    {featuredPost.title}
                                </h2>
                                <p className="text-zinc-800 dark:text-zinc-200 text-lg max-w-2xl mb-8 line-clamp-2">
                                    {featuredPost.excerpt}
                                </p>
                                <div className="flex items-center gap-6 text-sm text-zinc-500 font-medium">
                                    <span className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" /> {featuredPost.readTime} min read
                                    </span>
                                    <span>{featuredPost.publishedAt}</span>
                                </div>
                            </div>
                        </Link>
                    )}

                    {/* Sidebar / Top Clusters */}
                    {regularPosts.slice(0, 2).map((post, idx) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="group relative overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800/50 p-6 flex flex-col justify-between hover:border-white/20 transition-all"
                        >
                            <div>
                                <div className={`w-10 h-10 rounded-xl mb-4 flex items-center justify-center ${post.category === 'AI' ? 'bg-cyan-500/10 text-cyan-400' :
                                    post.category === 'Mobile' ? 'bg-purple-500/10 text-purple-400' :
                                        'bg-emerald-500/10 text-emerald-400'
                                    }`}>
                                    {post.category === 'AI' ? <Sparkles className="w-5 h-5" /> :
                                        post.category === 'Mobile' ? <Smartphone className="w-5 h-5" /> :
                                            <Terminal className="w-5 h-5" />}
                                </div>
                                <h3 className="text-xl font-bold group-hover:text-cyan-400 transition-colors">
                                    {post.title}
                                </h3>
                            </div>
                            <div className="mt-8 flex items-center justify-between text-xs text-zinc-500">
                                <span>{post.readTime}m read</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ))}

                    {/* Second Row Pillars */}
                    {blogPosts.filter(p => p.id === 'p2' || p.id === 'p3').map((post) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-zinc-950 border border-zinc-800/50 hover:bg-zinc-900 transition-all aspect-[16/9]"
                        >
                            <div className="absolute inset-0 z-0 opacity-30 group-hover:opacity-50 transition-opacity">
                                <Image
                                    src={post.coverImage}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                                <h3 className="text-2xl font-bold mb-4">{post.title}</h3>
                                <p className="text-zinc-400 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                                <div className="text-sm font-bold text-cyan-500 flex items-center gap-2">
                                    Explore Pillar <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </Link>
                    ))}

                </div>
            </section>

            <Footer />
        </main>
    );
}
