import { getSiteData } from '@/lib/db';

export default async function Blog() {
  const data = await getSiteData();
  const blogs = data.blogs || [];

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl md:text-5xl font-bold font-display text-white mb-12 text-center">Latest Updates</h1>

      <div className="space-y-12">
        {blogs.length === 0 ? (
           <div className="text-center text-gray-500">No updates yet.</div>
        ) : (
           blogs.map((post, idx) => (
             <article key={idx} className="bg-surface rounded-2xl p-8 border border-gray-800 flex flex-col md:flex-row gap-8 items-start">
               {post.image && (
                 <img src={post.image} alt={post.title} className="w-full md:w-48 h-32 object-cover rounded-lg bg-gray-800" />
               )}
               <div>
                 <div className="text-primary text-sm font-bold mb-2">{post.date}</div>
                 <h2 className="text-2xl font-bold text-white mb-4">{post.title}</h2>
                 <p className="text-muted leading-relaxed whitespace-pre-wrap">{post.content}</p>
               </div>
             </article>
           ))
        )}
      </div>
    </div>
  );
}