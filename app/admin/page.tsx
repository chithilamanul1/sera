'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import { motion } from 'framer-motion';
import {
    Users,
    FolderKanban,
    FileText,
    DollarSign,
    CheckCircle,
    AlertCircle,
    Clock,
    Plus
} from 'lucide-react';
import { useState, useEffect } from 'react';
import {
    getAllProjects,
    getPendingQuoteRequests,
    getClientCount,
    getMonthlyRevenue,
    getActiveProjectsCount,
    getPendingQuotesCount
} from '@/lib/firestore';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function AdminPage() {
    const [stats, setStats] = useState({
        clients: 0,
        activeProjects: 0,
        pendingQuotes: 0,
        revenue: 0,
    });
    const [quoteRequests, setQuoteRequests] = useState<any[]>([]);
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const [
                    clientCount,
                    activeCount,
                    pendingCount,
                    revenue,
                    requests,
                    allProjects,
                ] = await Promise.all([
                    getClientCount().catch(() => 0),
                    getActiveProjectsCount().catch(() => 0),
                    getPendingQuotesCount().catch(() => 0),
                    getMonthlyRevenue().catch(() => 0),
                    getPendingQuoteRequests().catch(() => []),
                    getAllProjects().catch(() => []),
                ]);

                setStats({
                    clients: clientCount,
                    activeProjects: activeCount,
                    pendingQuotes: pendingCount,
                    revenue: revenue,
                });
                setQuoteRequests(requests || []);
                setProjects(allProjects || []);
            } catch (error) {
                console.error('Error loading admin data:', error);
                // Don't show error toast, just use empty data
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    const onTrackProjects = projects.filter(p => p.status === 'active' && p.progress >= 50).length;
    const atRiskProjects = projects.filter(p => p.status === 'active' && p.progress < 50 && p.progress > 0).length;
    const delayedProjects = projects.filter(p => p.status === 'on-hold').length;

    if (loading) {
        return (
            <ProtectedRoute allowedRoles={['admin', 'owner']}>
                <DashboardLayout>
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="text-center">
                            <div className="w-16 h-16 border-4 border-glow-silver/20 border-t-glow-silver rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-silver/70">Loading admin panel...</p>
                        </div>
                    </div>
                </DashboardLayout>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute allowedRoles={['admin', 'owner']}>
            <DashboardLayout>
                <div className="space-y-8">
                    {/* Page Header */}
                    <div>
                        <h1 className="text-4xl font-heading font-bold glow-text mb-2">
                            Admin Panel
                        </h1>
                        <p className="text-silver/70">
                            Manage all projects, clients, and quote requests
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatsCard
                            icon={Users}
                            value={stats.clients}
                            label="Total Clients"
                            color="#00FF41"
                        />
                        <StatsCard
                            icon={FolderKanban}
                            value={stats.activeProjects}
                            label="Active Projects"
                            color="#E5E4E2"
                        />
                        <StatsCard
                            icon={FileText}
                            value={stats.pendingQuotes}
                            label="Pending Quotes"
                            color="#FFD700"
                        />
                        <StatsCard
                            icon={DollarSign}
                            value={stats.revenue > 0 ? `LKR ${(stats.revenue / 1000).toFixed(0)}K` : 'LKR 0'}
                            label="Revenue (MTD)"
                            color="#00FF41"
                        />
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <motion.button
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="glass p-6 rounded-2xl text-left group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center mb-4">
                                <FileText className="w-6 h-6 text-green-500" />
                            </div>
                            <h3 className="text-lg font-heading font-bold text-white mb-1">
                                Create Quote
                            </h3>
                            <p className="text-silver/70 text-sm">
                                Generate a new quote for a client
                            </p>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="glass p-6 rounded-2xl text-left group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 flex items-center justify-center mb-4">
                                <FolderKanban className="w-6 h-6 text-blue-500" />
                            </div>
                            <h3 className="text-lg font-heading font-bold text-white mb-1">
                                New Project
                            </h3>
                            <p className="text-silver/70 text-sm">
                                Start a new project for a client
                            </p>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="glass p-6 rounded-2xl text-left group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 flex items-center justify-center mb-4">
                                <Users className="w-6 h-6 text-purple-500" />
                            </div>
                            <h3 className="text-lg font-heading font-bold text-white mb-1">
                                Add Client
                            </h3>
                            <p className="text-silver/70 text-sm">
                                Register a new client account
                            </p>
                        </motion.button>
                    </div>

                    {/* Recent Quote Requests */}
                    <div>
                        <h2 className="text-2xl font-heading font-bold text-white mb-4">
                            Recent Quote Requests
                        </h2>
                        {quoteRequests.length > 0 ? (
                            <div className="glass rounded-2xl overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-surface/50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-silver/90">Name</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-silver/90">Email</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-silver/90">Service</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-silver/90">Budget</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-silver/90">Date</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-silver/90">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-silver/10">
                                        {quoteRequests.map((request) => (
                                            <tr key={request.id} className="hover:bg-surface/30 transition-colors">
                                                <td className="px-6 py-4 text-white font-medium">{request.name}</td>
                                                <td className="px-6 py-4 text-silver/90">{request.email}</td>
                                                <td className="px-6 py-4 text-silver/90">{request.projectType}</td>
                                                <td className="px-6 py-4 text-silver/90">{request.budget}</td>
                                                <td className="px-6 py-4 text-silver/70 text-sm">
                                                    {request.createdAt?.toDate?.()?.toLocaleDateString() || 'N/A'}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button className="text-glow-silver hover:underline text-sm font-medium">
                                                        View →
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="glass p-12 rounded-2xl text-center">
                                <FileText className="w-16 h-16 mx-auto mb-4 text-silver/30" />
                                <h3 className="text-xl font-heading font-bold text-white mb-2">
                                    No Quote Requests
                                </h3>
                                <p className="text-silver/70">
                                    No pending quote requests at the moment.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Active Projects Overview */}
                    <div>
                        <h2 className="text-2xl font-heading font-bold text-white mb-4">
                            Active Projects Status
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass p-6 rounded-2xl"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center">
                                        <CheckCircle className="w-6 h-6 text-green-500" />
                                    </div>
                                    <div>
                                        <p className="text-3xl font-heading font-bold text-white">{onTrackProjects}</p>
                                        <p className="text-silver/70 text-sm">On Track</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="glass p-6 rounded-2xl"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 flex items-center justify-center">
                                        <AlertCircle className="w-6 h-6 text-yellow-500" />
                                    </div>
                                    <div>
                                        <p className="text-3xl font-heading font-bold text-white">{atRiskProjects}</p>
                                        <p className="text-silver/70 text-sm">At Risk</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="glass p-6 rounded-2xl"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-red-500/5 flex items-center justify-center">
                                        <Clock className="w-6 h-6 text-red-500" />
                                    </div>
                                    <div>
                                        <p className="text-3xl font-heading font-bold text-white">{delayedProjects}</p>
                                        <p className="text-silver/70 text-sm">On Hold</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </ProtectedRoute>
    );
}
