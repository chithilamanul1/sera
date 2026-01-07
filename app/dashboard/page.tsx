'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import ProjectCard from '@/components/dashboard/ProjectCard';
import QuoteCard from '@/components/dashboard/QuoteCard';
import { motion } from 'framer-motion';
import { FolderKanban, FileText, CreditCard, TrendingUp, Calendar, Bell, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getClientProjects, getClientQuotes, updateQuoteStatus } from '@/lib/firestore';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function DashboardPage() {
    const { user } = useAuth();
    const [projects, setProjects] = useState<any[]>([]);
    const [quotes, setQuotes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            if (!user?.uid) {
                setLoading(false);
                return;
            }

            try {
                const [projectsData, quotesData] = await Promise.all([
                    getClientProjects(user.uid).catch(err => {
                        console.error('Error loading projects:', err);
                        return [];
                    }),
                    getClientQuotes(user.uid).catch(err => {
                        console.error('Error loading quotes:', err);
                        return [];
                    }),
                ]);

                setProjects(projectsData || []);
                setQuotes(quotesData || []);
            } catch (error) {
                console.error('Error loading dashboard data:', error);
                // Don't show error toast, just use empty data
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [user]);

    const handleAcceptQuote = async (id: string) => {
        try {
            await updateQuoteStatus(id, 'accepted');
            toast.success('Quote accepted! Our team will contact you shortly.');
            setQuotes(quotes.map(q => q.id === id ? { ...q, status: 'accepted' } : q));
        } catch (error) {
            toast.error('Failed to accept quote');
        }
    };

    const handleRejectQuote = async (id: string) => {
        try {
            await updateQuoteStatus(id, 'rejected');
            toast.error('Quote rejected.');
            setQuotes(quotes.map(q => q.id === id ? { ...q, status: 'rejected' } : q));
        } catch (error) {
            toast.error('Failed to reject quote');
        }
    };

    const activeProjects = projects.filter(p => p.status === 'active');
    const pendingQuotes = quotes.filter(q => q.status === 'pending');
    const totalSpent = projects.reduce((sum, p) => sum + (p.paidAmount || 0), 0);
    const completedProjects = projects.filter(p => p.status === 'completed').length;
    const completionRate = projects.length > 0
        ? Math.round((completedProjects / projects.length) * 100)
        : 0;

    if (loading) {
        return (
            <ProtectedRoute allowedRoles={['client']}>
                <DashboardLayout>
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="text-center">
                            <div className="w-16 h-16 border-4 border-glow-silver/20 border-t-glow-silver rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-silver/70">Loading your dashboard...</p>
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
                    {/* Page Header */}
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-4xl font-heading font-bold glow-text mb-2">
                                Dashboard
                            </h1>
                            <p className="text-silver/70">
                                Welcome back! Here's an overview of your projects and activity.
                            </p>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex gap-2">
                            <Link href="/contact">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-silver via-white to-platinum text-void font-heading font-semibold text-sm flex items-center gap-2"
                                >
                                    <Plus className="w-4 h-4" />
                                    Request Quote
                                </motion.button>
                            </Link>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatsCard
                            icon={FolderKanban}
                            value={activeProjects.length}
                            label="Active Projects"
                            color="#00FF41"
                        />
                        <StatsCard
                            icon={FileText}
                            value={pendingQuotes.length}
                            label="Pending Quotes"
                            color="#FFD700"
                        />
                        <StatsCard
                            icon={CreditCard}
                            value={totalSpent > 0 ? `LKR ${(totalSpent / 1000).toFixed(0)}K` : 'LKR 0'}
                            label="Total Spent"
                            color="#E5E4E2"
                        />
                        <StatsCard
                            icon={TrendingUp}
                            value={`${completionRate}%`}
                            label="Completion Rate"
                            color="#00FF41"
                        />
                    </div>

                    {/* Active Projects */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-heading font-bold text-white">
                                Active Projects
                            </h2>
                            {activeProjects.length > 0 && (
                                <span className="text-glow-silver text-sm font-medium">
                                    {activeProjects.length} active
                                </span>
                            )}
                        </div>

                        {activeProjects.length > 0 ? (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {activeProjects.map((project) => (
                                    <ProjectCard key={project.id} project={project} />
                                ))}
                            </div>
                        ) : (
                            <div className="glass p-12 rounded-2xl text-center">
                                <FolderKanban className="w-16 h-16 mx-auto mb-4 text-silver/30" />
                                <h3 className="text-xl font-heading font-bold text-white mb-2">
                                    No Active Projects
                                </h3>
                                <p className="text-silver/70 mb-6">
                                    You don't have any active projects yet. Request a quote to get started!
                                </p>
                                <Link href="/contact">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-6 py-3 rounded-lg bg-gradient-to-r from-silver via-white to-platinum text-void font-heading font-semibold"
                                    >
                                        Request a Quote
                                    </motion.button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Pending Quotes */}
                    {pendingQuotes.length > 0 && (
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-heading font-bold text-white">
                                    Pending Quotes
                                </h2>
                                <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-500 text-xs font-semibold">
                                    {pendingQuotes.length} Awaiting Response
                                </span>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {pendingQuotes.map((quote) => (
                                    <QuoteCard
                                        key={quote.id}
                                        quote={quote}
                                        onAccept={handleAcceptQuote}
                                        onReject={handleRejectQuote}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* All Projects (if any completed) */}
                    {projects.length > activeProjects.length && (
                        <div>
                            <h2 className="text-2xl font-heading font-bold text-white mb-4">
                                All Projects
                            </h2>
                            <div className="glass p-6 rounded-2xl">
                                <div className="space-y-3">
                                    {projects.map((project) => (
                                        <div
                                            key={project.id}
                                            className="flex items-center justify-between p-4 rounded-lg bg-surface/50 hover:bg-surface transition-colors"
                                        >
                                            <div>
                                                <p className="text-white font-medium">{project.name}</p>
                                                <p className="text-silver/60 text-sm">{project.type}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${project.status === 'completed' ? 'bg-green-500/20 text-green-500' :
                                                project.status === 'active' ? 'bg-blue-500/20 text-blue-500' :
                                                    'bg-yellow-500/20 text-yellow-500'
                                                }`}>
                                                {project.status.toUpperCase()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </DashboardLayout>
        </ProtectedRoute>
    );
}
