'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, ShoppingCart, Calendar, User, DollarSign, Mail } from 'lucide-react';

interface Order {
    id: string;
    userId: string | null;
    serviceType: string;
    price: number;
    status: string;
    createdAt: string;
    user: {
        name: string | null;
        email: string | null;
    } | null;
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch('/api/admin/orders');
            if (res.ok) {
                const data = await res.json();
                setOrders(data.orders || []);
            }
        } catch (err) {
            console.error('Error fetching orders:', err);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            const res = await fetch(`/api/admin/orders/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (res.ok) {
                setOrders(orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));
            }
        } catch (err) {
            console.error('Error updating order:', err);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center py-24">
                <Loader2 className="animate-spin text-blue-500 w-12 h-12" />
            </div>
        );
    }

    return (
        <div className="relative">
            <div className="mb-10">
                <h1 className="text-3xl font-bold font-syne mb-2 tracking-tight text-white">Orders</h1>
                <p className="text-zinc-500 text-sm">View and manage service orders and quotes.</p>
            </div>

            {orders.length === 0 ? (
                <div className="text-center py-20 bg-zinc-900/30 border border-white/5 rounded-3xl">
                    <ShoppingCart className="mx-auto mb-4 text-zinc-700" size={40} />
                    <p className="text-zinc-500 text-sm">No orders yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-5">
                    {orders.map((order, idx) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-zinc-950 border border-white/5 rounded-2xl p-6 hover:border-blue-500/20 transition-all"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                                        <ShoppingCart className="text-blue-400" size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-white">{order.serviceType}</h3>
                                        <p className="text-xs text-zinc-500 mt-0.5">Order #{order.id.slice(-8).toUpperCase()}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <select
                                        value={order.status}
                                        onChange={(e) => updateStatus(order.id, e.target.value)}
                                        className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer outline-none ${order.status === 'ESTIMATED'
                                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                            : order.status === 'PAID'
                                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                : order.status === 'CANCELLED'
                                                    ? 'bg-red-500/10 text-red-400 border-red-500/20'
                                                    : 'bg-zinc-900 text-zinc-400 border-white/5'
                                            }`}
                                    >
                                        <option value="ESTIMATED">Estimated</option>
                                        <option value="PENDING">Processing</option>
                                        <option value="PAID">Paid</option>
                                        <option value="CANCELLED">Cancelled</option>
                                    </select>
                                    <p className="text-2xl font-bold font-syne text-white tracking-tight">LKR {order.price.toLocaleString()}</p>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-zinc-900 rounded-lg border border-white/5">
                                        <User size={14} className="text-zinc-500" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-zinc-600 uppercase tracking-wider mb-0.5">Customer</p>
                                        <p className="text-xs font-medium text-white">{order.user?.name || 'Guest'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-zinc-900 rounded-lg border border-white/5">
                                        <Calendar size={14} className="text-zinc-500" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-zinc-600 uppercase tracking-wider mb-0.5">Date</p>
                                        <p className="text-xs font-medium text-white">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-zinc-900 rounded-lg border border-white/5">
                                        <Mail size={14} className="text-zinc-500" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-zinc-600 uppercase tracking-wider mb-0.5">Email</p>
                                        <p className="text-xs font-medium text-blue-400 truncate max-w-[180px]">{order.user?.email || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
