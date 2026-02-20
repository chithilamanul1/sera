'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Mail, Calendar, DollarSign } from 'lucide-react';
import AdminLayout from '../../layout';

interface Lead {
    id: string;
    clientName: string;
    email: string;
    services: string[];
    totalPrice: number;
    status: string;
    createdAt: string;
}

export default function LeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            const res = await fetch('/api/admin/leads');
            if (res.ok) {
                const data = await res.json();
                setLeads(data.leads || []);
            }
        } catch (err) {
            console.error('Error fetching leads:', err);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            const res = await fetch(`/api/admin/leads/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (res.ok) {
                setLeads(leads.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
            }
        } catch (err) {
            console.error('Error updating lead:', err);
        }
    };

    return (
        <AdminLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold font-syne italic mb-2">Leads</h1>
                <p className="text-zinc-500">Manage incoming client inquiries</p>
            </div>

            {loading ? (
                <div className="flex justify-center py-24">
                    <Loader2 className="animate-spin text-blue-500 w-12 h-12" />
                </div>
            ) : leads.length === 0 ? (
                <div className="text-center py-24">
                    <p className="text-zinc-500">No leads yet</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {leads.map((lead) => (
                        <motion.div
                            key={lead.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="font-bold text-lg mb-1">{lead.clientName}</h3>
                                    <p className="text-zinc-400 text-sm flex items-center gap-2">
                                        <Mail size={14} />
                                        {lead.email}
                                    </p>
                                </div>
                                <select
                                    value={lead.status}
                                    onChange={(e) => updateStatus(lead.id, e.target.value)}
                                    className={`px-3 py-1 rounded-lg text-xs font-bold border ${lead.status === 'PENDING'
                                            ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                                            : lead.status === 'CONTACTED'
                                                ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                                                : 'bg-green-500/10 text-green-400 border-green-500/30'
                                        }`}
                                >
                                    <option value="PENDING">Pending</option>
                                    <option value="CONTACTED">Contacted</option>
                                    <option value="CLOSED">Closed</option>
                                </select>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {lead.services.map((service, i) => (
                                    <span
                                        key={i}
                                        className="text-xs px-2 py-1 bg-zinc-800 rounded-lg text-zinc-400"
                                    >
                                        {service}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-4 text-xs text-zinc-500 pt-4 border-t border-zinc-800">
                                <span className="flex items-center gap-1">
                                    <Calendar size={12} />
                                    {new Date(lead.createdAt).toLocaleDateString()}
                                </span>
                                <span className="flex items-center gap-1">
                                    <DollarSign size={12} />
                                    LKR {lead.totalPrice.toLocaleString()}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}
