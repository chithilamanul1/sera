'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Image as ImageIcon, Trash2, CheckCircle2, Copy, Loader2 } from 'lucide-react';

export default function AdminGallery() {
    const [images, setImages] = useState<any[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadUrl, setUploadUrl] = useState('');
    const [selectedCategory, setSelectedCategory] = useState("Websites");

    const CATEGORIES = ["Websites", "Mobile Apps", "UI Designs", "Assets"];

    return (
        <div className="flex-1 text-white font-sans">
            <div className="max-w-6xl mx-auto">
                <header className="flex justify-between items-end mb-10">
                    <div>
                        <h1 className="text-3xl font-bold font-syne mb-2 tracking-tight">Gallery</h1>
                        <p className="text-zinc-500 text-sm">Manage images and assets for your portfolio.</p>
                    </div>
                    <button
                        onClick={() => setIsUploading(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold hover:scale-105 active:scale-95 transition-all text-sm"
                    >
                        <Upload size={18} /> Upload Image
                    </button>
                </header>

                {/* Filters */}
                <div className="flex gap-2 mb-8 bg-zinc-950 p-1.5 rounded-xl border border-white/5 w-fit">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-5 py-2.5 rounded-lg text-xs font-semibold transition-all ${selectedCategory === cat ? 'bg-white text-black' : 'text-zinc-500 hover:text-zinc-300'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
                    {/* Upload State */}
                    <AnimatePresence>
                        {isUploading && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="aspect-square rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center gap-4 bg-zinc-900/30 backdrop-blur-sm"
                            >
                                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                                    <Upload className="text-zinc-400" size={20} />
                                </div>
                                <div className="text-center px-4 w-full">
                                    <input
                                        type="text"
                                        placeholder="Paste image URL"
                                        className="bg-transparent border-b border-white/10 text-center text-xs pb-1 focus:outline-none focus:border-blue-500 w-full mb-3 text-white placeholder-zinc-700"
                                        value={uploadUrl}
                                        onChange={(e) => setUploadUrl(e.target.value)}
                                        autoFocus
                                    />
                                    <div className="flex flex-col gap-2">
                                        <button className="text-[10px] font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-wider">Confirm</button>
                                        <button
                                            onClick={() => setIsUploading(false)}
                                            className="text-[10px] font-bold text-zinc-650 hover:text-zinc-400 transition-colors uppercase tracking-wider"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Placeholder Images */}
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="group relative aspect-square rounded-2xl bg-zinc-950 border border-white/5 overflow-hidden hover:border-blue-500/20 transition-all">
                            <div className="absolute inset-0 flex items-center justify-center text-zinc-800 font-syne font-bold text-2xl opacity-20">
                                Image {i}
                            </div>
                            <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                <button className="p-3 bg-white text-black rounded-full hover:scale-110 active:scale-90 transition-all shadow-xl">
                                    <Copy size={18} />
                                </button>
                                <button className="p-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-full hover:bg-red-500 hover:text-white transition-all">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
