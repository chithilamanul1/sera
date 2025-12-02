import { getSiteData } from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Share2, Facebook, Linkedin, MessageCircle } from 'lucide-react';

// SEO METADATA
export async function generateMetadata({ params }) {
  const { id } = await params;
  const data = await getSiteData();
  const post = (data.blogs || []).find(b => b.id === id);
  if (!post) return { title: 'Article Not Found' };

  return {
    title: `${post.title} | Seranex`,
    description: post.content.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.content.substring(0, 160),
      images: [post.image],
      type: 'article',
    },
  };
}

export default async function BlogDetail({ params }) {
  const { id } = await params;
  const data = await getSiteData();
  const post = (data.blogs || []).find(b => b.id === id);
  const related = (data.blogs || []).filter(b => b.id !== id).slice(0, 2); // Get 2 other posts

  if (!post) return <div className="min-h-screen pt-32 text-center text-white">Article not found.</div>;

  // Calculate Read Time
  const words = post.content.split(' ').length;
  const readTime = Math.ceil(words / 200);

  return (
    <article className="min-h-screen bg-background pb-20">
      
      {/* READING PROGRESS BAR (Simple CSS Animation) */}
      <div className="fixed top-0 left-0 h-1 bg-primary z-[60] w-full animate-[width_1s_ease-out]" style={{width: '100%'}} />

      {/* HERO HEADER */}
      <div className="relative h-[60vh] w-full">
         <Image src={post.image} alt={post.title} fill className="object-cover brightness-[0.3]" priority referrerPolicy="no-referrer" />
         <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
         <div className="absolute bottom-0 left-0 w-full px-6 pb-12">
            <div className="max-w-4xl mx-auto">
                <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors text-sm font-bold uppercase tracking-widest">
                    <ArrowLeft size={16} /> Back to Intel
                </Link>
                <h1 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight mb-6">{post.title}</h1>
                <div className="flex flex-wrap items-center gap-6 text-gray-300 text-sm">
                    <div className="flex items-center gap-2"><Calendar size={16} className="text-primary"/> {post.date}</div>
                    <div className="w-1 h-1 bg-gray-600 rounded-full" />
                    <div>{readTime} Min Read</div>
                    <div className="w-1 h-1 bg-gray-600 rounded-full" />
                    <div className="text-primary font-bold">By Seranex Engineering Team</div>
                </div>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 mt-12">
        
        {/* MAIN CONTENT */}
        <div className="prose prose-invert prose-lg max-w-none">
            {/* Introductory Hook */}
            <p className="text-xl text-gray-300 leading-relaxed font-light border-l-4 border-primary pl-6 mb-10 italic">
               {post.content.substring(0, 150)}...
            </p>
            {/* Full Body */}
            <div className="whitespace-pre-wrap leading-loose text-gray-300">
               {post.content}
            </div>
            
            {/* CTA Box */}
            <div className="my-12 p-8 bg-surface border border-gray-800 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 not-prose">
                <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Build something like this?</h3>
                    <p className="text-muted">We turn ideas into software. Start your project today.</p>
                </div>
                <Link href="/contact" className="bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
                    Start Now
                </Link>
            </div>
        </div>

        {/* SIDEBAR (Sticky) */}
        <aside className="space-y-8 h-fit lg:sticky lg:top-24">
            
            {/* Share Widget */}
            <div className="bg-surface p-6 rounded-2xl border border-gray-800">
                <h4 className="text-white font-bold mb-4 flex items-center gap-2"><Share2 size={18}/> Share Article</h4>
                <div className="flex gap-2">
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=https://seranex.org/blog/${post.id}`} target="_blank" className="p-3 bg-blue-600 rounded-lg text-white hover:opacity-90"><Facebook size={20}/></a>
                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=https://seranex.org/blog/${post.id}`} target="_blank" className="p-3 bg-blue-700 rounded-lg text-white hover:opacity-90"><Linkedin size={20}/></a>
                    <a href={`https://wa.me/?text=${post.title} - Read this: https://seranex.org/blog/${post.id}`} target="_blank" className="p-3 bg-green-500 rounded-lg text-white hover:opacity-90"><MessageCircle size={20}/></a>
                </div>
            </div>

            {/* Related Posts */}
            <div>
                <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Read Next</h4>
                <div className="space-y-4">
                    {related.map(r => (
                        <Link key={r.id} href={`/blog/${r.id}`} className="block group">
                            <div className="relative h-32 w-full rounded-xl overflow-hidden mb-3 border border-gray-800">
                                <Image src={r.image} alt={r.title} fill className="object-cover group-hover:scale-110 transition-transform" referrerPolicy="no-referrer" />
                            </div>
                            <h5 className="text-white font-bold leading-snug group-hover:text-primary transition-colors">{r.title}</h5>
                        </Link>
                    ))}
                </div>
            </div>

        </aside>
      </div>
    </article>
  );
}