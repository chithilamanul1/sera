'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import QuoteCard from '@/components/dashboard/QuoteCard';
import { motion } from 'framer-motion';
import { FileText, Filter } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getClientQuotes, updateQuoteStatus } from '@/lib/firestore';
import toast from 'react-hot-toast';

export default function QuotesPage() {
    const { user } = useAuth();
    const [quotes, setQuotes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');

    useEffect(() => {
        async function loadQuotes() {
            if (!user?.uid) {
                setLoading(false);
                return;
            }

            try {
                const data = await getClientQuotes(user.uid).catch(() => []);
                setQuotes(data || []);
            } catch (error) {
                console.error('Error loading quotes:', error);
            } finally {
                setLoading(false);
            }
        }

        loadQuotes();
    }, [user]);

    const handleAccept = async (id: string) => {
        try {
            await updateQuoteStatus(id, 'accepted');
            toast.success('Quote accepted! Our team will contact you shortly.');
            setQuotes(quotes.map(q => q.id === id ? { ...q, status: 'accepted' } : q));
        } catch (error) {
            toast.error('Failed to accept quote');
        }
    };

    const handleReject = async (id: string) => {
        try {
            await updateQuoteStatus(id, 'rejected');
            toast.error('Quote rejected.');
            setQuotes(quotes.map(q => q.id === id ? { ...q, status: 'rejected' } : q));
        } catch (error) {
            toast.error('Failed to reject quote');
        }
    };

    const filteredQuotes = filter === 'all'
        ? quotes
        : quotes.filter(q => q.status === filter);

    if (loading) {
        return (
            <ProtectedRoute allowedRoles={['client']}>
                <DashboardLayout>
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="text-center">
                            <div className="w-16 h-16 border-4 border-glow-silver/20 border-t-glow-silver rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-silver/70">Loading quotes...</p>
                        </div>
                    </div>
                </DashboardLayout>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute allowedRoles={['client']}>
            <DashboardLayout>
                <div className="space-y-8">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-4xl font-heading font-bold glow-text mb-2">
                                Quotes
                            </h1>
                            <p className="text-silver/70">
                                View and manage your project quotes
                            </p>
                        </div>

                        {/* Filter */}
                        <div className="flex items-center gap-2">
                            <Filter className="w-5 h-5 text-silver/70" />
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value as any)}
                                className="px-4 py-2 rounded-lg bg-surface border border-silver/10 text-white focus:border-glow-silver/40 focus:outline-none"
                            >
                                <option value="all">All Quotes</option>
                                <option value="pending">Pending</option>
                                <option value="accepted">Accepted</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                    </div>

                    {/* Quotes Grid */}
                    {filteredQuotes.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {filteredQuotes.map((quote) => (
                                <QuoteCard
                                    key={quote.id}
                                    quote={quote}
                                    onAccept={handleAccept}
                                    onReject={handleReject}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="glass p-12 rounded-2xl text-center">
                            <FileText className="w-16 h-16 mx-auto mb-4 text-silver/30" />
                            <h3 className="text-xl font-heading font-bold text-white mb-2">
                                {filter === 'all' ? 'No Quotes Yet' : `No ${filter} Quotes`}
                            </h3>
                            <p className="text-silver/70">
                                {filter === 'all'
                                    ? "You don't have any quotes yet."
                                    : `You don't have any ${filter} quotes at the moment.`
                                }
                            </p>
                        </div>
                    )}
                </div>
            </DashboardLayout>
        </ProtectedRoute>
    );
}
