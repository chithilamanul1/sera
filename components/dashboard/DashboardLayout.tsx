'use client';

import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    FolderKanban,
    FileText,
    CreditCard,
    MessageSquare,
    User,
    LogOut,
    Menu,
    X
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { signOut } from '@/lib/auth';
import toast from 'react-hot-toast';

const clientNavItems = [
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
    { icon: FolderKanban, label: 'Projects', href: '/dashboard/projects' },
    { icon: FileText, label: 'Quotes', href: '/dashboard/quotes' },
    { icon: CreditCard, label: 'Payments', href: '/dashboard/payments' },
    { icon: MessageSquare, label: 'Messages', href: '/dashboard/messages' },
    { icon: User, label: 'Profile', href: '/dashboard/profile' },
];

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { user } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleSignOut = async () => {
        try {
            await signOut();
            toast.success('Signed out successfully');
            router.push('/');
        } catch (error) {
            toast.error('Failed to sign out');
        }
    };

    return (
        <div className="min-h-screen bg-void flex">
            {/* Sidebar */}
            <motion.aside
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                className={`fixed lg:sticky top-0 left-0 h-screen w-64 glass border-r border-silver/10 flex flex-col z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    } transition-transform`}
            >
                {/* Logo */}
                <div className="p-6 border-b border-silver/10">
                    <Link href="/">
                        <h1 className="text-2xl font-heading font-bold glow-text">Seranex</h1>
                    </Link>
                    <p className="text-silver/60 text-sm mt-1">Client Portal</p>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {clientNavItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link key={item.href} href={item.href}>
                                <motion.div
                                    whileHover={{ x: 4 }}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? 'bg-glow-silver/10 text-glow-silver border border-glow-silver/20'
                                        : 'text-silver/70 hover:bg-surface hover:text-white'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="font-medium">{item.label}</span>
                                </motion.div>
                            </Link>
                        );
                    })}
                </nav>

                {/* User Section */}
                <div className="p-4 border-t border-silver/10">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-glow-silver/20 to-glow-silver/5 flex items-center justify-center">
                            <span className="text-lg font-heading font-bold text-glow-silver">
                                {user?.displayName?.charAt(0) || 'U'}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white font-medium text-sm truncate">{user?.name}</p>
                            <p className="text-silver/60 text-xs truncate">{user?.email}</p>
                        </div>
                    </div>

                    <motion.button
                        onClick={handleSignOut}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-4 py-2 rounded-lg bg-surface hover:bg-surface/80 text-silver/70 hover:text-white flex items-center justify-center gap-2 transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm font-medium">Sign Out</span>
                    </motion.button>
                </div>

                {/* Close button for mobile */}
                <button
                    onClick={() => setSidebarOpen(false)}
                    className="lg:hidden absolute top-4 right-4 text-silver/60 hover:text-white"
                >
                    <X className="w-6 h-6" />
                </button>
            </motion.aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Top Bar */}
                <header className="sticky top-0 z-40 glass border-b border-silver/10 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden text-silver/70 hover:text-white"
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-white font-medium text-sm">{user?.displayName}</p>
                                <p className="text-silver/60 text-xs capitalize">{user?.role}</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="lg:hidden fixed inset-0 bg-void/80 backdrop-blur-sm z-40"
                />
            )}
        </div>
    );
}
