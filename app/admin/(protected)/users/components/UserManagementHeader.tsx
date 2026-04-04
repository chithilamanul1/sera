'use client';

import { useState } from 'react';
import { Users, ShieldCheck, UserPlus } from 'lucide-react';
import { CreateAdminModal } from './CreateAdminModal';

export function UserManagementHeader({ isOwner, totalAdmins }: { isOwner: boolean, totalAdmins: number }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-4xl font-black uppercase tracking-tighter text-white mb-2 flex items-center gap-3">
                    <Users className="text-blue-500" />
                    Executive <span className="text-zinc-500">Access</span>
                </h1>
                <p className="text-zinc-500 text-sm font-medium">Manage corporate roles and administrative privileges.</p>
            </div>
            
            <div className="flex items-center gap-4">
                <div className="px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center gap-3">
                    <ShieldCheck className="text-blue-500 w-5 h-5" />
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 leading-none">Total Admins</p>
                        <p className="text-xl font-black text-white">{totalAdmins}</p>
                    </div>
                </div>

                {isOwner && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-white text-black px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-xl active:scale-95"
                    >
                        <UserPlus size={16} />
                        Authorize Executive
                    </button>
                )}
            </div>

            <CreateAdminModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}
