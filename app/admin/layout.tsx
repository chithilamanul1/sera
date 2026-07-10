import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FolderGit2, Home, LogOut, Settings } from "lucide-react";
import { Navbar } from "@/components/ui/Navbar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const userRole = (session?.user as any)?.role;

  if (!session || (userRole !== "ADMIN" && userRole !== "OWNER")) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col md:flex-row pt-24">
        {/* Sidebar */}
        <aside className="w-full md:w-64 border-r border-zinc-800/50 bg-black/50 p-6 flex flex-col gap-2">
          <div className="mb-8">
            <h2 className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em]">
              Admin Panel
            </h2>
          </div>
          <Link
            href="/admin"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Home size={18} /> Dashboard
          </Link>
          <Link
            href="/admin/projects"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-blue-400 bg-blue-500/10 border border-blue-500/20"
          >
            <FolderGit2 size={18} /> Portfolio Projects
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Settings size={18} /> Settings
          </Link>
          <div className="mt-auto pt-8">
            <Link
              href="/api/auth/signout"
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
            >
              <LogOut size={18} /> Sign Out
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-12 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
