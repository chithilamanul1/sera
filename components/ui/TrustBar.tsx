
'use client';

import { useEffect, useRef } from 'react';

const logos = [
    "LOGISTICS", "RETAIL", "FINTECH", "HEALTHCARE", "MANUFACTURING", "EDUCATION", "REAL ESTATE"
];

export function TrustBar() {
    return (
        <section className="py-12 overflow-hidden bg-black relative">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 pointer-events-none" />

            <p className="text-center text-[10px] uppercase font-bold tracking-[0.4em] text-zinc-600 mb-8">
                Industry Sovereignty & Strategic Partnerships
            </p>

            <div className="flex whitespace-nowrap overflow-hidden">
                <div className="flex animate-infinite-scroll py-4">
                    {[...logos, ...logos].map((logo, idx) => (
                        <div
                            key={idx}
                            className="mx-12 text-2xl md:text-4xl font-black text-zinc-800 hover:text-white transition-colors cursor-default select-none grayscale opacity-30 hover:opacity-100 font-syne"
                        >
                            {logo}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
