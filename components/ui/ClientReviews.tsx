'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
    {
        id: 1,
        name: "Sakunika Fernando",
        role: "Business Owner",
        company: "Local Business",
        content: "Done a great job by creating our website. Exactly as we expected. Thank you for the superb service and for making our vision a reality.",
        initials: "SF",
        color: "bg-blue-500"
    },
    {
        id: 2,
        name: "Ceylon Xpert",
        role: "Manager",
        company: "Jayantha Motors",
        content: "We are very happy with the website Seranex Lanka built for Jayantha Motors. In the vehicle business, our customers need to see our stock clearly, and the new site makes that so easy. The design is clean and works perfectly on mobile phones.",
        initials: "CX",
        color: "bg-emerald-500"
    },
    {
        id: 3,
        name: "Chithila Transport",
        role: "Director",
        company: "Logistics",
        content: "Big thanks to the Seranex Lanka team for setting up the Chithila Transport site. I’m usually on the road and don’t have time for complicated tech stuff, but these guys made it so simple. The booking system works great on mobile.",
        initials: "CT",
        color: "bg-purple-500"
    }
];

export function ClientReviews() {
    return (
        <section className="py-24 px-6 relative overflow-hidden bg-white dark:bg-black transition-colors duration-500">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_50%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold font-syne tracking-tight mb-4 text-zinc-900 dark:text-white">
                        What Our Clients <span className="text-zinc-400 dark:text-zinc-500">Say.</span>
                    </h2>
                    <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
                        Real feedback from real businesses we&apos;ve worked with.
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
                            className="group relative bg-zinc-50 dark:bg-zinc-900/40 backdrop-blur-xl border border-zinc-200 dark:border-white/5 p-8 rounded-3xl hover:bg-zinc-100 dark:hover:bg-zinc-900/60 transition-all duration-300 flex flex-col"
                        >
                            <div className="absolute -top-4 -right-4 text-blue-500/10 group-hover:text-blue-500/20 transition-colors">
                                <Quote size={80} />
                            </div>

                            <div className="flex items-center gap-1 mb-6 text-amber-500">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} fill="currentColor" />
                                ))}
                            </div>

                            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-8 flex-1 relative z-10">
                                &quot;{review.content}&quot;
                            </p>

                            <div className="flex items-center gap-4 border-t border-zinc-200 dark:border-white/5 pt-6 mt-auto">
                                <div className={`w-12 h-12 rounded-full ${review.color} flex items-center justify-center text-white font-bold text-sm`}>
                                    {review.initials}
                                </div>
                                <div>
                                    <h4 className="font-bold text-zinc-900 dark:text-white text-sm">{review.name}</h4>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
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
