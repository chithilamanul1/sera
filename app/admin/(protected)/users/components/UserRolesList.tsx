'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, User, Trash2, CheckCircle, X, ChevronDown, MoreVertical, Loader2 } from 'lucide-react';
import { updateUserRole, deleteUser } from '../actions';
import { useRouter } from 'next/navigation';

export function UserRolesList({ initialUsers }: { initialUsers: any[] }) {
    const router = useRouter();
    const [users, setUsers] = useState(initialUsers);
    const [loadingId, setLoadingId] = useState<string | null>(null);

    const handleRoleChange = async (userId: string, newRole: string) => {
        setLoadingId(userId);
        try {
            const res = await updateUserRole(userId, newRole);
            if (res.success) {
                setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingId(null);
        }
    };

    const handleDelete = async (userId: string) => {
        if (!confirm('Are you sure you want to remove this executive account?')) return;
        
        setLoadingId(userId);
        try {
            const res = await deleteUser(userId);
            if (res.success) {
                setUsers(users.filter(u => u.id !== userId));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <div className="w-full">
            <table className="w-full text-left border-separate border-spacing-y-4">
                <thead>
                    <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">
                        <th className="px-6 py-2">Executive Info</th>
                        <th className="px-6 py-2 text-center">Current Role</th>
                        <th className="px-6 py-2 text-center">Status</th>
                        <th className="px-6 py-2 text-right">Corporate Controls</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, idx) => (
                        <motion.tr
                            key={user.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="group bg-black/40 border border-zinc-900 rounded-2xl overflow-hidden hover:bg-zinc-900/40 transition-all"
                        >
                            <td className="px-6 py-5 rounded-l-2xl border-y border-l border-zinc-900 overflow-hidden">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden">
                                        {user.image ? (
                                            <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="text-zinc-600 w-5 h-5" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white tracking-tight">{user.name || 'Anonymous Executive'}</p>
                                        <p className="text-xs text-zinc-600 font-medium">{user.email}</p>
                                    </div>
                                </div>
                            </td>
                            
                            <td className="px-6 py-5 text-center border-y border-zinc-900">
                                <div className="relative inline-block group/role">
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                        disabled={loadingId === user.id}
                                        className="appearance-none bg-zinc-900 border border-zinc-800 text-[10px] font-black uppercase tracking-widest text-zinc-400 px-6 py-2 rounded-full cursor-pointer hover:border-blue-500/50 hover:text-white transition-all outline-none"
                                    >
                                        <option value="USER">Standard User</option>
                                        <option value="EDITOR">Content Editor</option>
                                        <option value="ADMIN">Lead Admin</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-600 pointer-events-none" />
                                </div>
                            </td>

                            <td className="px-6 py-5 text-center border-y border-zinc-900">
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Active</span>
                                </div>
                            </td>

                            <td className="px-6 py-5 text-right rounded-r-2xl border-y border-r border-zinc-900">
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    disabled={loadingId === user.id}
                                    className="p-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                                >
                                    {loadingId === user.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                </button>
                            </td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
