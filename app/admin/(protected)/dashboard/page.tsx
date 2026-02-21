'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Plus, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import AdminLayout from '../layout';

export default function AdminDashboard() {
    const [stats, setStats] = useState<any>({ totalLeads: 0, totalOrders: 0, totalUsers: 0, totalProjects: 0, totalPosts: 0 });
    const [recentOrders, setRecentOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/admin/stats');
                if (res.ok) {
                    const data = await res.json();
                    setStats(data.stats);
                    setRecentOrders(data.recentOrders);
                }
            } catch (err) {
                console.error("Stats Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <AdminLayout>
            <header className="mb-10">
                <h1 className="text-3xl font-bold font-syne mb-2 tracking-tight text-white">Dashboard</h1>
                <p className="text-zinc-500 text-sm">Overview of your site activity and recent orders.</p>
            </header>

            {loading ? (
                <div className="flex justify-center py-24">
                    <Loader2 className="animate-spin text-blue-500 w-12 h-12" />
                </div>
            ) : (
                <>
                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                        <QuickAction
                            href="/admin/projects/new"
                            label="New Project"
                            icon={<Plus size={18} />}
                            color="blue"
                        />
                        <QuickAction
                            href="/admin/blog/new"
                            label="New Blog Post"
                            icon={<Plus size={18} />}
                            color="purple"
                        />
                        <QuickAction
                            href="/admin/gallery"
                            label="Upload Media"
                            icon={<Plus size={18} />}
                            color="green"
                        />
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
                        <StatCard label="Leads" value={stats.totalLeads.toString()} />
                        <StatCard label="Orders" value={stats.totalOrders.toString()} />
                        <StatCard label="Users" value={stats.totalUsers.toString()} />
                        <StatCard label="Projects" value={stats.totalProjects?.toString() || '0'} />
                        <StatCard label="Blog Posts" value={stats.totalPosts?.toString() || '0'} />
                    </div>

                    {/* Recent Orders */}
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                        <h2 className="text-lg font-bold font-syne mb-5 text-white">Recent Orders</h2>
                        <div className="space-y-3">
                            {recentOrders.length > 0 ? recentOrders.map((order: any) => (
                                <div key={order.id} className="flex items-center justify-between p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center font-bold text-xs text-blue-400">
                                            {order.user?.name?.slice(0, 2).toUpperCase() || 'OR'}
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm text-white">{order.serviceType}</p>
                                            <p className="text-xs text-zinc-500">{order.user?.name || 'Guest'} · {new Date(order.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-bold text-zinc-400">LKR {order.price.toLocaleString()}</span>
                                        <Link href={`/admin/orders/${order.id}`} className="text-xs font-semibold text-blue-400 hover:text-blue-300">
                                            View
                                        </Link>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-center text-zinc-600 py-6 text-sm">No recent orders.</p>
                            )}
                        </div>
                    </div>
                </>
            )}
        </AdminLayout>
    );
}

function QuickAction({ href, label, icon, color }: { href: string; label: string; icon: React.ReactNode; color: string }) {
    const colorMap: Record<string, string> = {
        blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/20',
        purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400 hover:bg-purple-500/20',
        green: 'bg-green-500/10 border-green-500/20 text-green-400 hover:bg-green-500/20',
    };

    return (
        <Link
            href={href}
            className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${colorMap[color]}`}
        >
            {icon}
            <span className="font-medium text-sm">{label}</span>
        </Link>
    );
}

function StatCard({ label, value }: { label: string; value: string }) {
    return (
        <div className="p-5 bg-zinc-900/30 border border-zinc-800 rounded-2xl">
            <p className="text-zinc-500 text-xs font-medium mb-2">{label}</p>
            <span className="text-2xl font-bold font-syne text-white">{value}</span>
        </div>
    );
}
