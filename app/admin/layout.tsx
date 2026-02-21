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
    const isLoginPage = pathname === '/admin/login';

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className="flex min-h-screen bg-[#050505] text-white font-sans overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/5 p-6 hidden md:flex flex-col fixed h-screen z-20 bg-black/50 backdrop-blur-3xl">
                <Link href="/admin" className="flex items-center gap-3 mb-12 px-2 hover:opacity-80 transition-opacity">
                    <ShieldCheck className="text-blue-500" size={24} />
                    <span className="font-syne font-bold text-xl tracking-tight">
                        SeraNex
                    </span>
                </Link>

                <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href));

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 cursor-pointer border ${isActive
                                    ? 'bg-white text-black font-black shadow-xl border-white scale-[1.02]'
                                    : 'text-zinc-500 hover:bg-zinc-900 border-transparent hover:border-white/5'
                                    }`}
                            >
                                <Icon size={18} />
                                <span className="text-xs font-semibold">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="pt-6 border-t border-white/5">
                    <form action="/api/auth/signout" method="POST">
                        <button
                            type="submit"
                            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-zinc-650 hover:bg-red-500/10 hover:text-red-500 border border-transparent hover:border-red-500/20 transition-all w-full text-left group"
                        >
                            <LogOut size={18} className="group-hover:rotate-12 transition-transform" />
                            <span className="text-xs font-semibold">Logout</span>
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 relative min-h-screen">
                <div className="p-8 md:p-16 relative z-10">{children}</div>
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            </main>
        </div>
    );
}
