'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';

export default function FloatingWhatsApp() {
    const [isOpen, setIsOpen] = useState(false);

    const whatsappNumber = '+94728382638';
    const whatsappMessage = 'Hi! I would like to discuss a project with Seranex.';
    const whatsappLink = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <>
            {/* Floating Button */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 2, duration: 0.5 }}
                className="fixed bottom-6 right-6 z-50"
            >
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.9 }}
                            className="absolute bottom-20 right-0 w-72 glass p-4 rounded-2xl border border-green-500/30 mb-2"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h4 className="text-white font-heading font-semibold text-sm">
                                        Chat with us on WhatsApp
                                    </h4>
                                    <p className="text-silver/70 text-xs mt-1">
                                        Get instant responses from our team
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-silver/60 hover:text-white transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full px-4 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    Start Chat
                                </motion.button>
                            </a>

                            <p className="text-silver/60 text-xs mt-3 text-center">
                                Available 24/7 for urgent inquiries
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                        boxShadow: [
                            '0 0 20px rgba(37, 211, 102, 0.3)',
                            '0 0 40px rgba(37, 211, 102, 0.5)',
                            '0 0 20px rgba(37, 211, 102, 0.3)',
                        ],
                    }}
                    transition={{
                        boxShadow: {
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        },
                    }}
                    className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center shadow-2xl transition-colors"
                >
                    <MessageCircle className="w-8 h-8 text-white" />
                </motion.button>

                {/* Notification Badge */}
                {!isOpen && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
                    >
                        <span className="text-white text-xs font-bold">1</span>
                    </motion.div>
                )}
            </motion.div>
        </>
    );
}
