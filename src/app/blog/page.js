'use client';
import { useState, useEffect } from 'react';
import { getSiteData } from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';
import FadeIn from "@/components/FadeIn";
import { Search, ArrowRight, Clock } from 'lucide-react';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getSiteData();
      setPosts(data.blogs || []);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = posts.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
  const featured = filtered[0]; // First result is "Featured"
  const others = filtered.slice(1);

  return (
    <div className="min-h-screen pt-24 px-6 pb-20 bg-background">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER & SEARCH */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <FadeIn>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-4">INSIGHTS</h1>
            <p className="text-muted text-xl max-w-xl">
              Engineering secrets, SEO strategies, and the future of tech in Sri Lanka.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.1}>
            <div className="relative w-full md:w-80">
              <input 
                placeholder="Search articles..." 
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-surface border border-gray-800 rounded-full py-3 pl-12 pr-4 text-white focus:border-primary outline-none transition-colors"
              />
              <Search className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />
            </div>
          </FadeIn>
        </div>

        {loading ? (
           <div className="text-white animate-pulse">Loading Intelligence...</div>
        ) : (
           <>
             {/* FEATURED POST (Hero Layout) */}
             {featured && (
               <FadeIn delay={0.2}>
                 <Link href={`/blog/${featured.id}`} className="group relative block w-full h-[500px] rounded-3xl overflow-hidden mb-16 border border-gray-800">
                    <Image 
                      src={featured.image} 
                      alt={featured.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-3xl">
                       <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full mb-4">FEATURED</span>
                       <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight group-hover:text-primary transition-colors">{featured.title}</h2>
                       <div className="flex items-center gap-4 text-gray-300 text-sm">
                          <span className="flex items-center gap-2"><Clock size={16}/> {featured.date}</span>
                          <span className="flex items-center gap-2">Read Article <ArrowRight size={16}/></span>
                       </div>
                    </div>
                 </Link>
               </FadeIn>
             )}

             {/* GRID LAYOUT */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {others.map((post, idx) => (
                 <FadeIn key={post.id} delay={0.1 * idx}>
                   <Link href={`/blog/${post.id}`} className="group block bg-surface border border-gray-800 rounded-2xl overflow-hidden hover:border-primary transition-all hover:-translate-y-1">
                      <div className="relative h-56 w-full overflow-hidden">
                        <Image 
                          src={post.image} 
                          alt={post.title} 
                          fill 
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="p-6">
                        <div className="text-accent text-xs font-bold mb-2">{post.date}</div>
                        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h3>
                        <p className="text-muted text-sm line-clamp-3 leading-relaxed">{post.content.substring(0, 120)}...</p>
                      </div>
                   </Link>
                 </FadeIn>
               ))}
             </div>
           </>
        )}
      </div>
    </div>
  );
}