import prisma from '@/lib/prisma';
import { UserRolesList } from './components/UserRolesList';
import { Users, ShieldCheck, Mail, Calendar, UserPlus } from 'lucide-react';
import { auth } from '@/auth';
import { UserManagementHeader } from './components/UserManagementHeader';

export default async function UserManagementPage() {
    const session = await auth();
    const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' }
    });

    const isOwner = session?.user?.role === 'OWNER';

    return (
        <div className="space-y-8 p-8">
            <UserManagementHeader isOwner={isOwner} totalAdmins={users.filter(u => u.role === 'ADMIN').length} />

            <div className="grid grid-cols-1 gap-6">
                <div className="bg-zinc-950/50 border border-zinc-900 rounded-[2.5rem] overflow-hidden backdrop-blur-3xl p-8">
                    <UserRolesList initialUsers={users as any} />
                </div>
            </div>
        </div>
    );
}
