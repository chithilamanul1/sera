'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Image as ImageIcon, Trash2, CheckCircle2, Copy } from 'lucide-react';

export default function AdminGallery() {
    const [images, setImages] = useState<any[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadUrl, setUploadUrl] = useState('');
    const [selectedCategory, setSelectedCategory] = useState("UI_DESIGN");

    // Mock images for now - would fetch from API in production
    const CATEGORIES = ["UI_DESIGN", "PROJECT_ASSETS", "MARKETING"];

    return (
        <div className="flex-1 p-12 bg-[#050505] min-h-screen text-white font-sans">
            <div className="max-w-6xl mx-auto">
                <header className="flex justify-between items-end mb-12">
                    <div>
                        <h1 className="text-4xl font-bold font-syne mb-2 italic">Media Gallery</h1>
                        <p className="text-zinc-500">Manage assets for the Master Portfolio.</p>
                    </div>
                    <button
                        onClick={() => setIsUploading(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-xl font-bold hover:bg-blue-500 transition-colors"
                    >
                        <Upload size={18} /> Upload Asset
                    </button>
                </header>

                {/* Filters */}
                <div className="flex gap-4 mb-8 border-b border-zinc-800 pb-4">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${selectedCategory === cat ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'
                                }`}
                        >
                            {cat.replace('_', ' ')}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {/* Placeholder for Upload State */}
                    {isUploading && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="aspect-square rounded-2xl border-2 border-dashed border-zinc-700 flex flex-col items-center justify-center gap-4 bg-zinc-900/20"
                        >
                            <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                                <Upload className="text-zinc-400" />
                            </div>
                            <div className="text-center px-4">
                                <input
                                    type="text"
                                    placeholder="Paste Image URL"
                                    className="bg-transparent border-b border-zinc-700 text-center text-sm focus:outline-none focus:border-blue-500 w-full mb-2"
                                    value={uploadUrl}
                                    onChange={(e) => setUploadUrl(e.target.value)}
                                />
                                <button className="text-xs font-bold text-blue-500">Confirm Upload</button>
                            </div>
                        </motion.div>
                    )}

                    {/* Empty State Mock */}
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="group relative aspect-square rounded-2xl bg-zinc-900 overflow-hidden border border-zinc-800">
                            <div className="absolute inset-0 flex items-center justify-center text-zinc-700 font-syne font-bold text-4xl opacity-20">
                                IMG_0{i}
                            </div>
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                                <button className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform">
                                    <Copy size={18} />
                                </button>
                                <button className="p-3 bg-red-500/10 text-red-500 border border-red-500/50 rounded-full hover:bg-red-500 hover:text-white transition-colors">
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
