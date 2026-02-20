import { blogPosts } from '@/lib/blog/posts';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { ProgressBar } from '../components/ProgressBar';
import { SeraAgentSidebar } from '../components/SeraAgentSidebar';
import { AISavingsCalculator } from '../components/AISavingsCalculator';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ChevronLeft, ArrowRight, Sparkles } from 'lucide-react';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = blogPosts.find(p => p.slug === slug);

    if (!post) notFound();

    const relatedPosts = blogPosts.filter(p => p.category === post.category && p.id !== post.id).slice(0, 2);

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-cyan-500/30">
            <ProgressBar />
            <Navbar />

            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        "headline": post.title,
                        "description": post.excerpt,
                        "image": post.coverImage,
                        "datePublished": post.publishedAt,
                        "author": {
                            "@type": "Organization",
                            "name": "Seranex Business Solutions"
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "Seranex",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://seranex.com/logo.svg"
                            }
                        }
                    })
                }}
            />

            <div className="flex flex-col md:flex-row min-h-screen">
                {/* Main Content Area */}
                <article className="flex-1 pt-32 pb-20 px-6 md:px-12 lg:px-24">
                    <div className="max-w-4xl mx-auto">

                        <Link href="/blog" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-12 text-sm font-medium">
                            <ChevronLeft className="w-4 h-4" /> Back to Blog
                        </Link>

                        {/* Breadcrumb / Category */}
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-bold uppercase tracking-widest text-zinc-400">
                                {post.category}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold font-clash mb-8 tracking-tight leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-zinc-500 text-sm mb-12 pb-12 border-b border-white/5">
                            <span className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" /> {post.publishedAt}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock className="w-4 h-4" /> {post.readTime} min read
                            </span>
                        </div>

                        {/* GEO: Executive Summary Box */}
                        {post.executiveSummary && (
                            <div className="mb-12 p-8 rounded-3xl bg-cyan-500/5 border border-cyan-500/20 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-20">
                                    <Sparkles className="w-12 h-12 text-cyan-400" />
                                </div>
                                <h4 className="text-cyan-400 font-bold text-xs uppercase tracking-widest mb-4">Executive Summary (AI Optimized)</h4>
                                <p className="text-zinc-300 leading-relaxed italic">
                                    {post.executiveSummary}
                                </p>
                            </div>
                        )}

                        <div className="relative aspect-video rounded-3xl overflow-hidden mb-16">
                            <Image
                                src={post.coverImage}
                                alt={post.title}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Article Content */}
                        <div className="prose prose-invert prose-cyan max-w-none 
                            prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-16 prose-h2:mb-8 prose-h2:font-clash
                            prose-p:text-zinc-400 prose-p:text-lg prose-p:leading-relaxed prose-p:mb-8
                            prose-strong:text-white prose-strong:font-bold">
                            <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }} />

                            {/* ROI Calculator for AI posts */}
                            {post.category === 'AI' && <AISavingsCalculator />}

                            {/* Sera Insight Box */}
                            {post.seraInsight && (
                                <div className="my-12 p-6 rounded-2xl bg-zinc-900 border-l-4 border-cyan-500 flex gap-4">
                                    <Sparkles className="w-6 h-6 text-cyan-500 shrink-0 mt-1" />
                                    <div>
                                        <p className="text-white font-bold mb-1">Sera's Insight</p>
                                        <p className="text-zinc-400 italic text-base leading-relaxed">{post.seraInsight}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Related / Internal Linking */}
                        <div className="mt-20 pt-20 border-t border-white/5">
                            <h3 className="text-2xl font-bold font-clash mb-8 uppercase tracking-widest">Keep Reading</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {relatedPosts.map(rp => (
                                    <Link key={rp.id} href={`/blog/${rp.slug}`} className="group block">
                                        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-4">
                                            <Image src={rp.coverImage} alt={rp.title} fill className="object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        <h4 className="text-xl font-bold group-hover:text-cyan-400 transition-colors">{rp.title}</h4>
                                        <div className="flex items-center gap-2 text-cyan-500 font-bold text-sm mt-4">
                                            Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </article>

                {/* AI Interaction Sidebar */}
                <SeraAgentSidebar postContent={post.content} postTitle={post.title} />
            </div>

            <Footer />
        </main>
    );
}
