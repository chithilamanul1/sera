'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export function WhatsAppCTA() {
    const handleContact = () => {
        window.open('https://wa.me/94728382638', '_blank');
    };

    return (
        <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleContact}
            className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-[0_10px_40px_-10px_rgba(16,185,129,0.5)] border-4 border-white/20 backdrop-blur-md group"
            aria-label="Contact us on WhatsApp"
        >
            <div className="absolute -top-12 right-0 bg-white text-black px-4 py-2 rounded-xl text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
                Chat with local experts! 💬
            </div>
            <MessageCircle size={32} />
        </motion.button>
    );
}
