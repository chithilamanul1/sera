'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { motion } from 'framer-motion';
import { MessageSquare, Send } from 'lucide-react';
import { useState } from 'react';

export default function MessagesPage() {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (!message.trim()) return;
        // TODO: Implement message sending
        setMessage('');
    };

    return (
        <ProtectedRoute allowedRoles={['client']}>
            <DashboardLayout>
                <div className="space-y-8">
                    {/* Header */}
                    <div>
                        <h1 className="text-4xl font-heading font-bold glow-text mb-2">
                            Messages
                        </h1>
                        <p className="text-silver/70">
                            Communicate with our team
                        </p>
                    </div>

                    {/* Messages Container */}
                    <div className="glass rounded-2xl overflow-hidden" style={{ height: 'calc(100vh - 300px)' }}>
                        <div className="flex flex-col h-full">
                            {/* Messages Area */}
                            <div className="flex-1 p-6 overflow-y-auto">
                                <div className="flex flex-col items-center justify-center h-full">
                                    <MessageSquare className="w-16 h-16 text-silver/30 mb-4" />
                                    <h3 className="text-xl font-heading font-bold text-white mb-2">
                                        No Messages Yet
                                    </h3>
                                    <p className="text-silver/70 text-center">
                                        Start a conversation with our team
                                    </p>
                                </div>
                            </div>

                            {/* Message Input */}
                            <div className="p-6 border-t border-silver/10 bg-surface/30">
                                <div className="flex gap-3">
                                    <input
                                        type="text"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                        placeholder="Type your message..."
                                        className="flex-1 px-4 py-3 rounded-lg bg-surface border border-silver/10 text-white placeholder-silver/40 focus:border-glow-silver/40 focus:outline-none transition-colors"
                                    />
                                    <motion.button
                                        onClick={handleSend}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-6 py-3 rounded-lg bg-gradient-to-r from-silver via-white to-platinum text-void font-heading font-semibold flex items-center gap-2"
                                    >
                                        <Send className="w-5 h-5" />
                                        Send
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </ProtectedRoute>
    );
}
