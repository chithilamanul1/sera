'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    DollarSign,
    Users,
    FolderKanban,
    BarChart3,
    Settings,
    Shield,
    Database
} from 'lucide-react';
import Link from 'next/link';

export default function OwnerPage() {
    return (
        <ProtectedRoute allowedRoles={['owner']}>
            <DashboardLayout>
                <div className="space-y-8">
                    {/* Page Header */}
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-4xl font-heading font-bold glow-text mb-2">
                                Owner Dashboard
                            </h1>
                            <p className="text-silver/70">
                                Complete business overview with analytics and settings
                            </p>
                        </div>

                        <Link href="/admin">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 rounded-lg bg-gradient-to-r from-silver via-white to-platinum text-void font-heading font-semibold text-sm"
                            >
                                Go to Admin Panel →
                            </motion.button>
                        </Link>
                    </div>

                    {/* Financial Stats */}
                    <div>
                        <h2 className="text-xl font-heading font-bold text-white mb-4">
                            Financial Overview
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatsCard
                                icon={DollarSign}
                                value="LKR 2.5M"
                                label="Revenue (This Month)"
                                trend={25}
                                color="#00FF41"
                            />
                            <StatsCard
                                icon={TrendingUp}
                                value="LKR 850K"
                                label="Profit (This Month)"
                                trend={18}
                                color="#E5E4E2"
                            />
                            <StatsCard
                                icon={DollarSign}
                                value="LKR 1.2M"
                                label="Pending Payments"
                                trend={-5}
                                color="#FFD700"
                            />
                            <StatsCard
                                icon={BarChart3}
                                value="34%"
                                label="Profit Margin"
                                trend={3}
                                color="#00FF41"
                            />
                        </div>
                    </div>

                    {/* Business Stats */}
                    <div>
                        <h2 className="text-xl font-heading font-bold text-white mb-4">
                            Business Metrics
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatsCard
                                icon={Users}
                                value={24}
                                label="Total Clients"
                                trend={12}
                                color="#00FF41"
                            />
                            <StatsCard
                                icon={FolderKanban}
                                value={15}
                                label="Active Projects"
                                trend={8}
                                color="#E5E4E2"
                            />
                            <StatsCard
                                icon={TrendingUp}
                                value="92%"
                                label="Client Satisfaction"
                                trend={5}
                                color="#00FF41"
                            />
                            <StatsCard
                                icon={BarChart3}
                                value="85%"
                                label="On-Time Delivery"
                                trend={2}
                                color="#FFD700"
                            />
                        </div>
                    </div>

                    {/* Revenue Chart */}
                    <div>
                        <h2 className="text-2xl font-heading font-bold text-white mb-4">
                            Revenue Trend (Last 6 Months)
                        </h2>
                        <div className="glass p-6 rounded-2xl">
                            <div className="h-64 flex items-end justify-between gap-4">
                                {[
                                    { month: 'Aug', value: 60 },
                                    { month: 'Sep', value: 75 },
                                    { month: 'Oct', value: 65 },
                                    { month: 'Nov', value: 85 },
                                    { month: 'Dec', value: 90 },
                                    { month: 'Jan', value: 100 },
                                ].map((data, index) => (
                                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${data.value}%` }}
                                            transition={{ duration: 1, delay: index * 0.1 }}
                                            className="w-full bg-gradient-to-t from-glow-silver to-white rounded-t-lg relative group cursor-pointer"
                                        >
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-surface px-2 py-1 rounded text-xs text-white whitespace-nowrap">
                                                LKR {(data.value * 25000).toLocaleString()}
                                            </div>
                                        </motion.div>
                                        <span className="text-silver/70 text-sm">{data.month}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Owner-Only Features */}
                    <div>
                        <h2 className="text-2xl font-heading font-bold text-white mb-4">
                            Owner Controls
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="glass p-6 rounded-2xl text-left group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 flex items-center justify-center mb-4">
                                    <Settings className="w-6 h-6 text-blue-500" />
                                </div>
                                <h3 className="text-lg font-heading font-bold text-white mb-1">
                                    Settings
                                </h3>
                                <p className="text-silver/70 text-sm">
                                    Company & system settings
                                </p>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="glass p-6 rounded-2xl text-left group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 flex items-center justify-center mb-4">
                                    <Shield className="w-6 h-6 text-purple-500" />
                                </div>
                                <h3 className="text-lg font-heading font-bold text-white mb-1">
                                    User Roles
                                </h3>
                                <p className="text-silver/70 text-sm">
                                    Manage admin & client access
                                </p>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="glass p-6 rounded-2xl text-left group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center mb-4">
                                    <BarChart3 className="w-6 h-6 text-green-500" />
                                </div>
                                <h3 className="text-lg font-heading font-bold text-white mb-1">
                                    Reports
                                </h3>
                                <p className="text-silver/70 text-sm">
                                    Generate business reports
                                </p>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="glass p-6 rounded-2xl text-left group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-red-500/5 flex items-center justify-center mb-4">
                                    <Database className="w-6 h-6 text-red-500" />
                                </div>
                                <h3 className="text-lg font-heading font-bold text-white mb-1">
                                    Backups
                                </h3>
                                <p className="text-silver/70 text-sm">
                                    Database backup & restore
                                </p>
                            </motion.button>
                        </div>
                    </div>

                    {/* Recent Activity Log */}
                    <div>
                        <h2 className="text-2xl font-heading font-bold text-white mb-4">
                            System Activity Log
                        </h2>
                        <div className="glass p-6 rounded-2xl">
                            <div className="space-y-3">
                                {[
                                    { user: 'Admin User', action: 'Created new quote for TechVista Solutions', time: '10 mins ago' },
                                    { user: 'Client (EcoMart)', action: 'Accepted quote Q-2026-045', time: '1 hour ago' },
                                    { user: 'Admin User', action: 'Updated project status to "Completed"', time: '3 hours ago' },
                                    { user: 'System', action: 'Automated backup completed successfully', time: '5 hours ago' },
                                ].map((log, index) => (
                                    <div key={index} className="flex items-start gap-4 p-3 rounded-lg bg-surface/30">
                                        <div className="w-2 h-2 rounded-full bg-glow-silver mt-2" />
                                        <div className="flex-1">
                                            <p className="text-white text-sm">
                                                <span className="font-semibold">{log.user}</span> {log.action}
                                            </p>
                                            <p className="text-silver/60 text-xs mt-1">{log.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </ProtectedRoute>
    );
}
