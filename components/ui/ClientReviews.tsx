'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

const reviews = [
    {
        id: 1,
        name: "Elena V.",
        role: "CTO",
        company: "Nebula Finance",
        content: "SeraNex didn't just build our platform; they architected a financial ecosystem. The transaction latency dropped by 40% within weeks of deployment. Their 'AI-Native' approach isn't a buzzword—it's a competitive advantage.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    {
        id: 2,
        name: "Marcus Chen",
        role: "Founder",
        company: "Orbit Retail",
        content: "We needed a mobile app that felt like a native OS extension. The 60FPS precision SeraNex delivered is unmatched. Our user retention doubled because the interface is simply addictive to use.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
    },
    {
        id: 3,
        name: "Sarah Jenkins",
        role: "VP of Product",
        company: "LogiChain Global",
        content: "Migrating legacy logistics data was our nightmare until SeraNex took over. Their automated matching engine effectively saved us hundreds of man-hours per month. Absolute engineering mastery.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
    }
];

export function ClientReviews() {
    return (
        <section className="py-24 px-6 relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black font-syne uppercase tracking-tighter mb-4">
                        Client <span className="text-blue-500">Voices.</span>
                    </h2>
                    <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
                        Real outcomes from partners who demanded the impossible.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, i) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative bg-zinc-900/40 backdrop-blur-xl border border-white/5 p-8 rounded-3xl hover:bg-zinc-900/60 hover:border-white/10 transition-all duration-300 flex flex-col"
                        >
                            <div className="absolute -top-4 -right-4 text-blue-500/10 group-hover:text-blue-500/20 transition-colors">
                                <Quote size={80} />
                            </div>

                            <div className="flex items-center gap-1 mb-6 text-amber-500">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} fill="currentColor" />
                                ))}
                            </div>

                            <p className="text-zinc-300 leading-relaxed mb-8 flex-1 relative z-10">
                                &quot;{review.content}&quot;
                            </p>

                            <div className="flex items-center gap-4 border-t border-white/5 pt-6 mt-auto">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 group-hover:border-blue-500/50 transition-colors">
                                    <Image
                                        src={review.avatar}
                                        alt={review.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-sm">{review.name}</h4>
                                    <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
                                        {review.role}, {review.company}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
