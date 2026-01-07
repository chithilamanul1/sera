import { getSiteData } from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar } from 'lucide-react';
import BlogInteractions from '@/components/BlogInteractions'; // <--- NEW IMPORT

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
    },
  };
}

export default async function BlogDetail({ params }) {
  const { id } = await params;
  const data = await getSiteData();
  const post = (data.blogs || []).find(b => b.id === id);

  if (!post) return <div className="min-h-screen pt-32 text-center text-white">Article not found.</div>;

  return (
    <article className="min-h-screen bg-background pb-20">
      <div className="fixed top-0 left-0 h-1 bg-primary z-[60] w-full animate-[width_1s_ease-out]" style={{width: '100%'}} />

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
                    <div className="text-primary font-bold">By Seranex Engineering Team</div>
                </div>
            </div>
         </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-12">
        <div className="prose prose-invert prose-lg max-w-none">
            <div className="whitespace-pre-wrap leading-loose text-gray-300">
               {post.content}
            </div>
        </div>

        {/* SOCIAL ENGINE INJECTED HERE */}
        <BlogInteractions postId={id} /> 

      </div>
    </article>
  );
}