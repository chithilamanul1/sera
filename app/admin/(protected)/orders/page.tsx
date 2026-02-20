'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, ShoppingCart, Calendar, User, DollarSign, Tag } from 'lucide-react';
import AdminLayout from '../../layout';

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

    return (
        <AdminLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold font-syne italic mb-2">Service Orders</h1>
                <p className="text-zinc-500">Manage client service requests and estimates</p>
            </div>

            {loading ? (
                <div className="flex justify-center py-24">
                    <Loader2 className="animate-spin text-blue-500 w-12 h-12" />
                </div>
            ) : orders.length === 0 ? (
                <div className="text-center py-24">
                    <ShoppingCart className="mx-auto text-zinc-800 mb-4" size={48} />
                    <p className="text-zinc-500">No orders found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {orders.map((order) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center border border-zinc-700">
                                        <ShoppingCart className="text-blue-500" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{order.serviceType}</h3>
                                        <p className="text-xs text-zinc-500 uppercase tracking-widest">Order #{order.id.slice(-6).toUpperCase()}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <select
                                        value={order.status}
                                        onChange={(e) => updateStatus(order.id, e.target.value)}
                                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${order.status === 'ESTIMATED'
                                                ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                                                : order.status === 'PAID'
                                                    ? 'bg-green-500/10 text-green-400 border-green-500/30'
                                                    : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                                            }`}
                                    >
                                        <option value="ESTIMATED">Estimated</option>
                                        <option value="PENDING">Pending</option>
                                        <option value="PAID">Paid</option>
                                        <option value="CANCELLED">Cancelled</option>
                                    </select>
                                    <p className="text-xl font-bold font-syne italic">LKR {order.price.toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-zinc-800/50">
                                <div className="flex items-center gap-3">
                                    <User size={16} className="text-zinc-500" />
                                    <div>
                                        <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Client</p>
                                        <p className="text-sm font-medium">{order.user?.name || 'Guest User'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Calendar size={16} className="text-zinc-500" />
                                    <div>
                                        <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Date</p>
                                        <p className="text-sm font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Tag size={16} className="text-zinc-500" />
                                    <div>
                                        <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Contact</p>
                                        <p className="text-sm font-medium">{order.user?.email || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}
