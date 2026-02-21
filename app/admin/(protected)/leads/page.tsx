'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Mail, Calendar, DollarSign, Inbox } from 'lucide-react';

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
                <h1 className="text-3xl font-bold font-syne mb-2 tracking-tight text-white">Leads</h1>
                <p className="text-zinc-500 text-sm">Track incoming client inquiries and requests.</p>
            </div>

            {leads.length === 0 ? (
                <div className="text-center py-20 bg-zinc-900/30 border border-white/5 rounded-3xl">
                    <Inbox className="mx-auto mb-4 text-zinc-700" size={40} />
                    <p className="text-zinc-500 text-sm">No leads yet. They&apos;ll appear here when clients submit inquiries.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {leads.map((lead, idx) => (
                        <motion.div
                            key={lead.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-zinc-950 border border-white/5 rounded-2xl p-6 hover:border-blue-500/20 transition-all"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-sm text-blue-400">
                                        {lead.clientName.slice(0, 2).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-white">{lead.clientName}</h3>
                                        <p className="text-zinc-500 text-xs flex items-center gap-1.5 mt-0.5">
                                            <Mail size={12} className="text-zinc-600" />
                                            {lead.email}
                                        </p>
                                    </div>
                                </div>
                                <select
                                    value={lead.status}
                                    onChange={(e) => updateStatus(lead.id, e.target.value)}
                                    className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer outline-none ${lead.status === 'PENDING'
                                        ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                        : lead.status === 'CONTACTED'
                                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                        }`}
                                >
                                    <option value="PENDING">Pending</option>
                                    <option value="CONTACTED">Contacted</option>
                                    <option value="CLOSED">Closed</option>
                                </select>
                            </div>

                            {/* Services */}
                            <div className="flex flex-wrap gap-1.5 mb-4">
                                {lead.services.map((service, i) => (
                                    <span
                                        key={i}
                                        className="text-[10px] font-medium px-3 py-1 bg-zinc-900 border border-white/5 rounded-full text-zinc-400"
                                    >
                                        {service}
                                    </span>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="flex items-center gap-6 pt-4 border-t border-white/5 text-xs text-zinc-500">
                                <span className="flex items-center gap-1.5">
                                    <Calendar size={12} className="text-zinc-600" />
                                    {new Date(lead.createdAt).toLocaleDateString()}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <DollarSign size={12} className="text-zinc-600" />
                                    LKR {lead.totalPrice.toLocaleString()}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
