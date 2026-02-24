import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import Link from 'next/link';
import { LayoutDashboard, FileText, Upload, Settings, LogOut, Key } from 'lucide-react';
import { signOut } from '@/auth';

export default async function AdminLayout({ children }: { children: ReactNode }) {
    const session = await auth();

    // Verify authentication and role
    if (!session?.user) {
        redirect('/login?callbackUrl=/admin');
    }

    if (session.user.role !== 'ADMIN') {
        redirect('/dashboard'); // Non-admins go to standard dashboard
    }

    return (
        <div className="min-h-screen bg-black text-white flex">
            {/* Admin Sidebar */}
            <aside className="w-64 border-r border-zinc-900 bg-zinc-950 flex flex-col hidden md:flex">
                <div className="p-6">
                    <h2 className="text-xl font-bold font-syne tracking-tighter italic text-cyan-400">SERA<span className="text-white">CMS</span></h2>
                </div>
                <nav className="flex-1 px-4 space-y-2 mt-4">
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl transition-all">
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                    </Link>
                    <Link href="/admin/blog" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-white bg-zinc-900 shadow-sm shadow-black rounded-xl border border-zinc-800 transition-all">
                        <FileText className="w-4 h-4 text-cyan-400" />
                        Blog Manager
                    </Link>
                    <Link href="/admin/media" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl transition-all">
                        <Upload className="w-4 h-4" />
                        Media Assets
                    </Link>
                    <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl transition-all">
                        <Settings className="w-4 h-4" />
                        CMS Config
                    </Link>
                </nav>
                <div className="p-4 border-t border-zinc-900">
                    <div className="flex items-center gap-3 px-4 py-3 mb-2 rounded-xl bg-cyan-950/20 border border-cyan-900/40">
                        <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                            <Key className="w-4 h-4 text-cyan-400" />
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-xs font-bold truncate">{session.user.email}</span>
                            <span className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold">Admin Privileges</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-h-screen max-w-full overflow-hidden">
                <header className="h-16 border-b border-zinc-900 bg-zinc-950/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-50">
                    <h3 className="font-semibold text-zinc-200">Content Management System</h3>
                    <div className="flex items-center gap-4">
                        <Link href="/" target="_blank" className="text-xs text-zinc-400 hover:text-white font-medium">View Live Site</Link>
                        <form action={async () => {
                            "use server";
                            await signOut({ redirectTo: "/login" });
                        }}>
                            <button className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 text-xs font-bold rounded-lg border border-red-500/20 hover:bg-red-500/20 transition-all">
                                <LogOut className="w-3 h-3" /> Sign Out
                            </button>
                        </form>
                    </div>
                </header>
                <div className="flex-1 overflow-auto bg-black p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
