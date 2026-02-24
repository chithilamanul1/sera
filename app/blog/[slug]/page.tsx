import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { ProgressBar } from '../components/ProgressBar';
import { SeraAgentSidebar } from '../components/SeraAgentSidebar';
import { AISavingsCalculator } from '../components/AISavingsCalculator';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ChevronLeft, ArrowRight, Sparkles } from 'lucide-react';
import prisma from '@/lib/prisma';

function parseMarkdown(md: string) {
    let html = md.replace(/^[ \t]{12}/gm, '').trim();

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank">$1</a>');

    // Lists
    html = html.replace(/^\* (.*$)/gim, '<ul><li>$1</li></ul>');
    html = html.replace(/<\/ul>\n<ul>/gim, '\n');
    html = html.replace(/^- (.*$)/gim, '<ul><li>$1</li></ul>');
    html = html.replace(/<\/ul>\n<ul>/gim, '\n');

    // Paragraphs (simplistic)
    html = html.split('\n\n').map(p => {
        if (p.startsWith('<h') || p.startsWith('<ul') || p.startsWith('<li')) return p;
        return `<p>${p}</p>`;
    }).join('\n\n');

    // Tables
    html = html.replace(/\|(.*)\|/gim, (match) => {
        const row = match.split('|').filter(Boolean).map(cell => `<td>${cell.trim()}</td>`).join('');
        return `<tr>${row}</tr>`;
    });
    // Replace the first td with th for table headers
    html = html.replace(/<tr><td>---<\/td>.*?<\/tr>/gim, ''); // remove separator row

    if (html.includes('<tr>')) {
        html = `<table><tbody>${html}</tbody></table>`;
        // Make the very first row a header
        html = html.replace(/<tbody>\s*<tr>(.*?)<\/tr>/i, '<thead><tr>$1</tr></thead><tbody>').replace(/<thead><tr>(.*?)<\/tr><\/thead>/i, (match, inner) => {
            return `<thead><tr>${inner.replace(/<td/g, '<th').replace(/<\/td>/g, '</th>')}</tr></thead>`;
        });
    }

    return html;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;

    // Fetch post from DB
    const post = await prisma.blogPost.findUnique({
        where: { slug }
    });

    if (!post) {
        return {
            title: 'Post Not Found | Seranex',
            description: 'The requested blog post could not be found.'
        };
    }

    return {
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.excerpt,
        keywords: Array.isArray(post.keywords) ? post.keywords.join(', ') : (post.keywords as string || ''),
        openGraph: {
            title: post.metaTitle || post.title,
            description: post.metaDescription || post.excerpt,
            url: `https://seranex.org/blog/${post.slug}`,
            images: [
                {
                    url: post.coverImage,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: post.metaTitle || post.title,
            description: post.metaDescription || post.excerpt,
            images: [post.coverImage],
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Fetch post from DB
    const rawPost = await prisma.blogPost.findUnique({
        where: { slug }
    });

    if (!rawPost) notFound();

    // Serialize post
    const post = {
        ...rawPost,
        id: rawPost.id.toString(),
        createdAt: rawPost.createdAt.toISOString(),
        updatedAt: rawPost.updatedAt.toISOString(),
        publishedAt: rawPost.createdAt.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        keywords: Array.isArray(rawPost.keywords) ? rawPost.keywords : []
    };

    // Fetch related posts from DB
    const rawRelated = await prisma.blogPost.findMany({
        where: {
            category: post.category,
            NOT: { id: rawPost.id },
            published: true
        },
        take: 2
    });

    const relatedPosts = rawRelated.map(rp => ({
        ...rp,
        id: rp.id.toString(),
        publishedAt: rp.createdAt.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }));

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-cyan-500/30">
            <ProgressBar />
            <Navbar />

            {/* Standard BlogPosting Schema */}
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
                                "url": "https://seranex.org/icon.png"
                            }
                        }
                    })
                }}
            />

            {/* Dynamic FAQPage Schema for Generative Engine Optimization */}
            {Array.isArray(post.faqs) && post.faqs.length > 0 && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": (post.faqs as any[]).map(faq => ({
                                "@type": "Question",
                                "name": faq?.question || '',
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": faq?.answer || ''
                                }
                            }))
                        })
                    }}
                />
            )}

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
                            prose-h3:text-2xl prose-h3:font-bold prose-h3:mt-12 prose-h3:mb-6 prose-h3:font-clash
                            prose-p:text-zinc-400 prose-p:text-lg prose-p:leading-relaxed prose-p:mb-8
                            prose-strong:text-white prose-strong:font-bold
                            prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-8 prose-ul:text-zinc-400 prose-li:mb-2
                            prose-table:w-full prose-table:text-left prose-table:border-collapse prose-table:mb-12
                            prose-th:bg-zinc-900 prose-th:p-4 prose-th:border prose-th:border-white/10 prose-th:text-white prose-th:font-bold
                            prose-td:p-4 prose-td:border prose-td:border-white/10 prose-td:text-zinc-400">

                            {/* Render markdown content as HTML */}
                            <div dangerouslySetInnerHTML={{
                                __html: parseMarkdown(post.content || '')
                            }} />

                            {/* ROI Calculator for AI posts */}
                            {post.category === 'AI' && <AISavingsCalculator />}

                            {/* Sera Insight Box */}
                            {(post as any).seraInsight && (
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
