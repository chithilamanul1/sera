'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { motion } from 'framer-motion';
import { CreditCard, Download, CheckCircle, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getClientProjects } from '@/lib/firestore';

export default function PaymentsPage() {
    const { user } = useAuth();
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            if (!user?.uid) {
                setLoading(false);
                return;
            }

            try {
                const data = await getClientProjects(user.uid).catch(() => []);
                setProjects(data || []);
            } catch (error) {
                console.error('Error loading payments:', error);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [user]);

    const totalSpent = projects.reduce((sum, p) => sum + (p.paidAmount || 0), 0);
    const totalPending = projects.reduce((sum, p) => sum + ((p.totalAmount || 0) - (p.paidAmount || 0)), 0);

    if (loading) {
        return (
            <ProtectedRoute allowedRoles={['client']}>
                <DashboardLayout>
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="text-center">
                            <div className="w-16 h-16 border-4 border-glow-silver/20 border-t-glow-silver rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-silver/70">Loading payments...</p>
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
                    <div>
                        <h1 className="text-4xl font-heading font-bold glow-text mb-2">
                            Payments
                        </h1>
                        <p className="text-silver/70">
                            Track your payments and invoices
                        </p>
                    </div>

                    {/* Payment Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="glass p-6 rounded-2xl">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center">
                                    <CheckCircle className="w-6 h-6 text-green-500" />
                                </div>
                                <div>
                                    <p className="text-silver/70 text-sm">Total Paid</p>
                                    <p className="text-3xl font-heading font-bold text-white">
                                        LKR {totalSpent.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="glass p-6 rounded-2xl">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 flex items-center justify-center">
                                    <Clock className="w-6 h-6 text-yellow-500" />
                                </div>
                                <div>
                                    <p className="text-silver/70 text-sm">Pending Payments</p>
                                    <p className="text-3xl font-heading font-bold text-white">
                                        LKR {totalPending.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment History */}
                    <div>
                        <h2 className="text-2xl font-heading font-bold text-white mb-4">
                            Payment History
                        </h2>

                        {projects.length > 0 ? (
                            <div className="glass rounded-2xl overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-surface/50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-silver/90">Project</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-silver/90">Total Amount</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-silver/90">Paid</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-silver/90">Remaining</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-silver/90">Status</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-silver/90">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-silver/10">
                                        {projects.map((project) => {
                                            const remaining = (project.totalAmount || 0) - (project.paidAmount || 0);
                                            const isPaid = remaining <= 0;

                                            return (
                                                <tr key={project.id} className="hover:bg-surface/30 transition-colors">
                                                    <td className="px-6 py-4 text-white font-medium">{project.name}</td>
                                                    <td className="px-6 py-4 text-silver/90">LKR {(project.totalAmount || 0).toLocaleString()}</td>
                                                    <td className="px-6 py-4 text-green-500 font-medium">LKR {(project.paidAmount || 0).toLocaleString()}</td>
                                                    <td className="px-6 py-4 text-silver/90">LKR {remaining.toLocaleString()}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${isPaid
                                                                ? 'bg-green-500/20 text-green-500'
                                                                : 'bg-yellow-500/20 text-yellow-500'
                                                            }`}>
                                                            {isPaid ? 'Paid' : 'Pending'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <button className="text-glow-silver hover:underline text-sm font-medium flex items-center gap-1">
                                                            <Download className="w-4 h-4" />
                                                            Invoice
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="glass p-12 rounded-2xl text-center">
                                <CreditCard className="w-16 h-16 mx-auto mb-4 text-silver/30" />
                                <h3 className="text-xl font-heading font-bold text-white mb-2">
                                    No Payment History
                                </h3>
                                <p className="text-silver/70">
                                    You don't have any payment records yet.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </DashboardLayout>
        </ProtectedRoute>
    );
}
