'use client';

import { useSession, signOut } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Package, Clock, CheckCircle2, Layout, Settings, LogOut, Loader2 } from 'lucide-react';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { useState, useEffect } from 'react';

export default function ClientDashboard() {
    const { data: session } = useSession();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch('/api/orders');
                if (res.ok) {
                    const data = await res.json();
                    setOrders(data);
                }
            } catch (err) {
                console.error("Order Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-blue-500/30">
            <Navbar />

            <div className="pt-32 pb-24 px-6 md:px-12 lg:px-24">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16"
                    >
                        <div>
                            <h1 className="text-4xl md:text-6xl font-bold font-syne italic tracking-tighter mb-4">
                                Welcome, <span className="text-blue-500">{session?.user?.name?.split(' ')[0] || 'Explorer'}</span>.
                            </h1>
                            <p className="text-zinc-500 text-lg">Manage your digital architecture and active projects.</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all">
                                <Settings className="text-zinc-400" size={20} />
                            </button>
                            <button
                                onClick={() => signOut()}
                                className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 font-bold hover:bg-red-500/20 transition-all text-sm"
                            >
                                <LogOut size={18} /> Sign Out
                            </button>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar/Stats links */}
                        <div className="lg:col-span-1 space-y-4">
                            <DashboardTab icon={<Layout size={20} />} label="Overview" active />
                            <DashboardTab icon={<Package size={20} />} label="My Orders" />
                            <DashboardTab icon={<Clock size={20} />} label="Billing" />
                        </div>

                        {/* Main Feed */}
                        <div className="lg:col-span-3 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <StatCard label="Active Projects" value={orders.length.toString()} />
                                <StatCard label="Pending Estimates" value="1" trend="Recent" />
                            </div>

                            <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative">
                                <h3 className="text-2xl font-bold font-syne italic mb-8">Active Orders</h3>

                                <div className="space-y-6">
                                    {loading ? (
                                        <div className="flex justify-center py-12"><Loader2 className="animate-spin text-blue-500" /></div>
                                    ) : orders.length > 0 ? (
                                        orders.map((order: any) => (
                                            <div key={order.id} className="group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-3xl bg-black border border-zinc-800/50 hover:border-blue-500/30 transition-all gap-6">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center">
                                                        <Package className="text-blue-500" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-1">Project #{order.id.slice(-6).toUpperCase()}</p>
                                                        <h4 className="text-xl font-bold">{order.serviceType}</h4>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-8">
                                                    <div className="text-right hidden md:block">
                                                        <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Status</p>
                                                        <div className="flex items-center gap-2 text-emerald-500">
                                                            <CheckCircle2 size={16} />
                                                            <span className="text-sm font-bold capitalize">{order.status.toLowerCase()}</span>
                                                        </div>
                                                    </div>
                                                    <button className="px-6 py-3 bg-white text-black font-bold rounded-2xl text-sm hover:scale-[1.05] transition-transform">
                                                        View Details
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-12">
                                            <p className="text-zinc-600 font-medium">No other projects found. Ready to build?</p>
                                            <button className="mt-4 text-blue-500 font-bold hover:underline">Start a new quote &rarr;</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}

function DashboardTab({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
    return (
        <div className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all cursor-pointer ${active ? 'bg-blue-600/10 border border-blue-600/30 text-blue-400' : 'text-zinc-500 hover:bg-zinc-900 border border-transparent'
            }`}>
            {icon}
            <span className="font-bold text-sm tracking-wide">{label}</span>
        </div>
    );
}

function StatCard({ label, value, trend }: { label: string, value: string, trend?: string }) {
    return (
        <div className="p-8 bg-zinc-900/30 border border-zinc-800/50 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[60px] translate-x-1/2 -translate-y-1/2 group-hover:bg-blue-600/10 transition-all duration-700" />
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">{label}</p>
            <div className="flex items-end gap-3">
                <span className="text-4xl font-bold font-syne italic">{value}</span>
                {trend && <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest px-2 py-0.5 bg-blue-600/10 rounded-full mb-2">{trend}</span>}
            </div>
        </div>
    );
}
