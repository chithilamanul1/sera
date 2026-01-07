'use client';

import { motion } from 'framer-motion';
import { FileText, Download, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';

interface Quote {
    id: string;
    services: string[];
    totalAmount: number;
    status: 'pending' | 'accepted' | 'rejected';
    createdAt: string;
    validUntil: string;
}

interface QuoteCardProps {
    quote: Quote;
    onAccept?: (id: string) => void;
    onReject?: (id: string) => void;
}

export default function QuoteCard({ quote, onAccept, onReject }: QuoteCardProps) {
    const statusColors = {
        pending: '#FFD700',
        accepted: '#00FF41',
        rejected: '#FF0040',
    };

    const statusIcons = {
        pending: Clock,
        accepted: CheckCircle,
        rejected: XCircle,
    };

    const StatusIcon = statusIcons[quote.status];
    const statusColor = statusColors[quote.status];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            className="glass p-6 rounded-2xl relative group"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-glow-silver/20 to-glow-silver/5 flex items-center justify-center">
                        <FileText className="w-6 h-6 text-glow-silver" />
                    </div>
                    <div>
                        <h3 className="text-lg font-heading font-bold text-white">
                            Quote #{quote.id}
                        </h3>
                        <p className="text-silver/60 text-sm">Created {quote.createdAt}</p>
                    </div>
                </div>

                <div
                    className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
                    style={{
                        backgroundColor: `${statusColor}20`,
                        color: statusColor,
                        border: `1px solid ${statusColor}40`,
                    }}
                >
                    <StatusIcon className="w-3 h-3" />
                    {quote.status.toUpperCase()}
                </div>
            </div>

            {/* Services */}
            <div className="mb-4">
                <p className="text-silver/70 text-sm mb-2">Services</p>
                <div className="flex flex-wrap gap-2">
                    {quote.services.map((service, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 rounded-full bg-surface text-silver/90 text-xs"
                        >
                            {service}
                        </span>
                    ))}
                </div>
            </div>

            {/* Amount */}
            <div className="mb-4 p-4 rounded-lg bg-surface/50">
                <p className="text-silver/60 text-sm mb-1">Total Amount</p>
                <p className="text-3xl font-heading font-bold glow-text">
                    LKR {quote.totalAmount.toLocaleString()}
                </p>
            </div>

            {/* Valid Until */}
            <div className="mb-4">
                <p className="text-silver/60 text-xs">
                    Valid until: <span className="text-white font-medium">{quote.validUntil}</span>
                </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-4 py-2 rounded-lg bg-surface hover:bg-surface/80 text-silver/90 font-medium text-sm flex items-center justify-center gap-2 transition-colors"
                >
                    <Eye className="w-4 h-4" />
                    View
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-4 py-2 rounded-lg bg-surface hover:bg-surface/80 text-silver/90 font-medium text-sm flex items-center justify-center gap-2 transition-colors"
                >
                    <Download className="w-4 h-4" />
                    Download
                </motion.button>
            </div>

            {/* Accept/Reject Buttons (only for pending) */}
            {quote.status === 'pending' && (
                <div className="flex gap-2 mt-3">
                    <motion.button
                        onClick={() => onAccept?.(quote.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 px-4 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold text-sm transition-colors"
                    >
                        Accept Quote
                    </motion.button>

                    <motion.button
                        onClick={() => onReject?.(quote.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 px-4 py-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-500 font-semibold text-sm transition-colors border border-red-500/40"
                    >
                        Reject
                    </motion.button>
                </div>
            )}

            {/* Hover Glow */}
            <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-xl"
                style={{
                    background: `radial-gradient(circle at center, ${statusColor}15, transparent 70%)`,
                }}
            />
        </motion.div>
    );
}
