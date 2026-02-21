'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Plus, ArrowRight, Zap, FileText, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
    const [stats, setStats] = useState<any>({ totalLeads: 0, totalOrders: 0, totalUsers: 0 });
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
        <div className="max-w-6xl mx-auto relative">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

            <header className="mb-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-px w-8 bg-blue-500" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-500">Admin Panel</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold font-syne mb-2 tracking-tight text-white">Welcome Back.</h1>
                    <p className="text-zinc-500 max-w-xl">Manage your projects, leads, orders, and site content from here.</p>
                </motion.div>
            </header>

            {loading ? (
                <div className="flex justify-center py-24"><Loader2 className="animate-spin text-blue-500 w-12 h-12" /></div>
            ) : (
                <>
                    {/* Quick Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                    >
                        <QuickActionCard
                            href="/admin/projects/new"
                            label="New Project"
                            desc="Add a project to your portfolio"
                            icon={<Zap className="text-blue-500" />}
                            bg="bg-blue-500/5"
                            border="border-blue-500/20"
                        />
                        <QuickActionCard
                            href="/admin/blog/new"
                            label="New Blog Post"
                            desc="Write and publish a blog article"
                            icon={<FileText className="text-purple-500" />}
                            bg="bg-purple-500/5"
                            border="border-purple-500/20"
                        />
                        <QuickActionCard
                            href="/admin/gallery"
                            label="Upload Media"
                            desc="Add images to your gallery"
                            icon={<ImageIcon className="text-emerald-500" />}
                            bg="bg-emerald-500/5"
                            border="border-emerald-500/20"
                        />
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                    >
                        <StatCard label="Total Leads" value={stats.totalLeads.toString()} />
                        <StatCard label="Total Orders" value={stats.totalOrders.toString()} />
                        <StatCard label="Registered Users" value={stats.totalUsers.toString()} />
                    </motion.div>

                    {/* Recent Orders */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-zinc-900/30 backdrop-blur-xl border border-white/5 rounded-3xl p-8 overflow-hidden"
                    >
                        <h2 className="text-xl font-bold font-syne mb-6 text-white">Recent Orders</h2>
                        <div className="space-y-3">
                            {recentOrders.length > 0 ? (
                                recentOrders.map((order: any, idx: number) => (
                                    <motion.div
                                        key={order.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + (idx * 0.05) }}
                                        className="flex items-center justify-between p-5 bg-zinc-950/50 rounded-2xl border border-white/5 hover:border-blue-500/20 transition-all"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-xs text-blue-400">
                                                {order.user?.name?.slice(0, 2).toUpperCase() || 'OR'}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-white">{order.serviceType}</p>
                                                <p className="text-xs text-zinc-500">{order.user?.name || 'Guest'} · {new Date(order.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-sm font-bold text-zinc-400 font-mono">LKR {order.price.toLocaleString()}</span>
                                            <Link href={`/admin/orders/${order.id}`} className="px-4 py-2 bg-white text-black text-xs font-semibold rounded-full hover:scale-105 active:scale-95 transition-all">View</Link>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <p className="text-center text-zinc-600 py-8 text-sm">No recent orders yet.</p>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </div>
    );
}

function QuickActionCard({ href, label, desc, icon, bg, border }: { href: string, label: string, desc: string, icon: any, bg: string, border: string }) {
    return (
        <Link href={href} className={`flex items-start gap-4 p-6 ${bg} border ${border} rounded-2xl hover:scale-[1.02] active:scale-95 transition-all group`}>
            <div className="w-10 h-10 rounded-xl bg-black/50 flex items-center justify-center border border-white/5">
                {icon}
            </div>
            <div>
                <p className="text-sm font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">{label}</p>
                <p className="text-xs text-zinc-500 leading-tight">{desc}</p>
            </div>
        </Link>
    );
}

function StatCard({ label, value }: { label: string, value: string }) {
    return (
        <div className="p-8 bg-zinc-950 border border-white/5 rounded-3xl hover:border-blue-500/20 transition-all">
            <p className="text-zinc-500 text-xs font-medium mb-3 uppercase tracking-wider">{label}</p>
            <span className="text-4xl font-bold font-syne tracking-tight text-white">{value}</span>
        </div>
    );
}
