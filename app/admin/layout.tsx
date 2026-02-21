'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    FolderKanban,
    FileText,
    Image,
    Users,
    ShoppingCart,
    Settings,
    LogOut,
    ShieldCheck,
} from 'lucide-react';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/cms', label: 'Content Manager', icon: LayoutDashboard },
    { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
    { href: '/admin/blog', label: 'Blog', icon: FileText },
    { href: '/admin/gallery', label: 'Gallery', icon: Image },
    { href: '/admin/leads', label: 'Leads', icon: Users },
    { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
    const pathname = usePathname();

    return (
        <div className="flex min-h-screen bg-[#050505] text-white font-sans">
            {/* Sidebar */}
            <aside className="w-64 border-r border-zinc-800 p-6 hidden md:flex flex-col fixed h-screen">
                <Link href="/admin" className="flex items-center gap-3 mb-12 px-2">
                    <ShieldCheck className="text-blue-500" size={24} />
                    <span className="font-syne font-bold text-xl tracking-tighter italic">
                        Seranex.
                    </span>
                </Link>

                <nav className="flex-1 space-y-2 overflow-y-auto">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href));

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer ${isActive
                                    ? 'bg-white text-black font-bold shadow-lg'
                                    : 'text-zinc-400 hover:bg-zinc-900 border border-transparent hover:border-zinc-800'
                                    }`}
                            >
                                <Icon size={18} />
                                <span className="text-sm font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="pt-6 border-t border-zinc-800">
                    <form action="/api/auth/signout" method="POST">
                        <button
                            type="submit"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-all w-full"
                        >
                            <LogOut size={18} />
                            <span className="text-sm font-medium">Logout</span>
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64">
                <div className="p-8 md:p-12">{children}</div>
            </main>
        </div>
    );
}
