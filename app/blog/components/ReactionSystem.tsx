
'use client';

import { useState } from 'react';
import { Heart, ThumbsUp, Sparkles, Share2 } from 'lucide-react';

export function ReactionSystem() {
    const [claps, setClaps] = useState(0);
    const [hasClapped, setHasClapped] = useState(false);
    const [reactions, setReactions] = useState({ love: 12, insight: 24, cool: 18 });

    const handleClap = () => {
        setClaps(prev => prev + 1);
        setHasClapped(true);
    };

    return (
        <div className="flex flex-col gap-8 py-12 border-y border-white/5 my-20">
            <div className="flex flex-wrap items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                    <button
                        onClick={handleClap}
                        className={`group relative flex items-center gap-3 px-6 py-3 rounded-full border transition-all ${hasClapped ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400' : 'bg-zinc-900 border-white/10 text-zinc-400 hover:border-white/20'
                            }`}
                    >
                        <ThumbsUp className={`w-5 h-5 transition-transform ${hasClapped ? 'scale-110' : 'group-hover:scale-110'}`} />
                        <span className="font-bold tabular-nums">{154 + claps}</span>
                        {hasClapped && (
                            <span className="absolute -top-12 left-1/2 -translate-x-1/2 text-cyan-400 font-bold animate-bounce">
                                +{claps}
                            </span>
                        )}
                    </button>

                    <div className="flex items-center gap-2">
                        <button className="p-3 rounded-full bg-zinc-900 border border-white/5 text-zinc-500 hover:text-red-400 hover:border-red-400/30 transition-all flex items-center gap-2">
                            <Heart className="w-4 h-4" /> <span className="text-xs font-bold">{reactions.love}</span>
                        </button>
                        <button className="p-3 rounded-full bg-zinc-900 border border-white/5 text-zinc-500 hover:text-cyan-400 hover:border-cyan-400/30 transition-all flex items-center gap-2">
                            <Sparkles className="w-4 h-4" /> <span className="text-xs font-bold">{reactions.insight}</span>
                        </button>
                    </div>
                </div>

                <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold hover:scale-105 active:scale-95 transition-all">
                    <Share2 className="w-4 h-4" /> Share Article
                </button>
            </div>

            <p className="text-center text-xs text-zinc-600 font-bold uppercase tracking-[0.3em]">
                Interact to refine Sera's content algorithm
            </p>
        </div>
    );
}
