import { getSiteData } from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar } from 'lucide-react';

// 1. GENERATE DYNAMIC METADATA
export async function generateMetadata({ params }) {
  const { id } = await params;
  const data = await getSiteData();
  const post = (data.blogs || []).find(b => b.id === id);

  if (!post) return { title: 'Article Not Found' };

  return {
    title: `${post.title} | Seranex Blog`,
    description: post.content.substring(0, 160) + '...',
    openGraph: {
      title: post.title,
      description: post.content.substring(0, 160),
      images: [post.image],
    },
  };
}

export default async function BlogDetail({ params }) {
  const { id } = await params;
  const data = await getSiteData();
  const post = (data.blogs || []).find(b => b.id === id);

  if (!post) {
    return <div className="min-h-screen flex items-center justify-center text-white">Article Not Found</div>;
  }

  // 2. STRUCTURED DATA (JSON-LD)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    image: post.image,
    datePublished: post.date, 
    author: {
      '@type': 'Organization',
      name: 'Seranex Elite Engineering'
    }
  };

  return (
    <article className="min-h-screen pt-24 pb-20">
      {/* Inject JSON-LD for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft size={20} /> Back to Articles
        </Link>

        <header className="mb-10">
            <div className="flex items-center gap-2 text-accent mb-4">
                <Calendar size={16} />
                <span className="text-sm font-bold uppercase tracking-wider">{post.date}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight mb-8">
                {post.title}
            </h1>
            {post.image && (
                <div className="relative w-full h-96 rounded-2xl overflow-hidden border border-gray-800">
                    <Image 
                        src={post.image} 
                        alt={post.title} 
                        fill 
                        className="object-cover"
                        referrerPolicy="no-referrer"
                    />
                </div>
            )}
        </header>

        <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {post.content}
            </p>
        </div>
      </div>
    </article>
  );
}