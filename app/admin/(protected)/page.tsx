'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, FileText, Settings, ShieldCheck, Loader2 } from 'lucide-react';

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
        <div className="flex min-h-screen bg-[#050505] text-white font-sans">
            {/* Sidebar */}
            <aside className="w-64 border-r border-zinc-800 p-6 hidden md:flex flex-col">
                <div className="flex items-center gap-3 mb-12 px-2">
                    <ShieldCheck className="text-blue-500" />
                    <span className="font-syne font-bold text-xl tracking-tighter italic">Seranex.</span>
                </div>

                <nav className="flex-1 space-y-2">
                    <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" active />
                    <NavItem icon={<Users size={18} />} label="Leads & Orders" />
                    <NavItem icon={<FileText size={18} />} label="CMS" />
                    <NavItem icon={<Settings size={18} />} label="Settings" />
                </nav>

                <div className="pt-6 border-t border-zinc-800">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-8 h-8 rounded-full bg-blue-600" />
                        <span className="text-sm font-medium">Admin Agent</span>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-12">
                <div className="max-w-6xl mx-auto">
                    <header className="mb-12">
                        <h1 className="text-4xl font-bold font-syne mb-2 italic">Control Center</h1>
                        <p className="text-zinc-500">Manage your digital architecture and incoming requests.</p>
                    </header>

                    {loading ? (
                        <div className="flex justify-center py-24"><Loader2 className="animate-spin text-blue-500 w-12 h-12" /></div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                                <StatCard label="Total Leads" value={stats.totalLeads.toString()} trend="+4%" />
                                <StatCard label="Total Orders" value={stats.totalOrders.toString()} trend="Active" />
                                <StatCard label="Total Users" value={stats.totalUsers.toString()} />
                            </div>

                            <div className="bg-zinc-900/50 border border-zinc-800 rounded-[2rem] p-8">
                                <h2 className="text-xl font-bold font-syne mb-6 italic">Recent Orders & Requests</h2>
                                <div className="space-y-4">
                                    {recentOrders.length > 0 ? recentOrders.map((order: any) => (
                                        <div key={order.id} className="flex items-center justify-between p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-xs">
                                                    {order.user?.name?.slice(0, 2).toUpperCase() || 'OR'}
                                                </div>
                                                <div>
                                                    <p className="font-medium">{order.serviceType}</p>
                                                    <p className="text-xs text-zinc-500">by {order.user?.name || 'Guest'} • {new Date(order.createdAt).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="text-xs font-bold text-zinc-400">LKR {order.price.toLocaleString()}</span>
                                                <button className="text-xs font-bold text-blue-500 hover:underline">Manage</button>
                                            </div>
                                        </div>
                                    )) : (
                                        <p className="text-center text-zinc-600 py-6">No recent orders found.</p>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}

function NavItem({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
    return (
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer ${active ? 'bg-white text-black font-bold shadow-lg' : 'text-zinc-400 hover:bg-zinc-900 border border-transparent hover:border-zinc-800'
            }`}>
            {icon}
            <span className="text-sm font-medium">{label}</span>
        </div>
    );
}

function StatCard({ label, value, trend }: { label: string, value: string, trend?: string }) {
    return (
        <div className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-3xl">
            <p className="text-zinc-500 text-sm font-medium mb-2 uppercase tracking-widest">{label}</p>
            <div className="flex items-end gap-3">
                <span className="text-4xl font-bold font-syne italic">{value}</span>
                {trend && <span className="text-xs font-bold text-emerald-500 pb-1">{trend}</span>}
            </div>
        </div>
    );
}
