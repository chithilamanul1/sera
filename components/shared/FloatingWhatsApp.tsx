'use client';

import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingWhatsApp() {
    const [isOpen, setIsOpen] = useState(false);

    const phoneNumber = '94XXXXXXXXX'; // Replace with actual number
    const message = encodeURIComponent('Hi! I saw your website and I\'m interested in your services.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <>
            {/* Main Button */}
            <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:shadow-[#25D366]/50 transition-all group"
            >
                <MessageCircle className="w-8 h-8 text-white" />

                {/* Pulse animation */}
                <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />

                {/* Tooltip */}
                <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="absolute right-20 bg-void border border-white/10 px-4 py-2 rounded-lg whitespace-nowrap hidden group-hover:block"
                >
                    <span className="text-white text-sm font-medium">Chat on WhatsApp</span>
                </motion.div>
            </motion.a>
        </>
    );
}
