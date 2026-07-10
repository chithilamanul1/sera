import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit2, Trash2 } from "lucide-react";
import DeleteProjectButton from "./DeleteProjectButton";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold font-syne tracking-tight mb-2">Portfolio Projects</h1>
          <p className="text-zinc-500 text-sm">Manage the projects displayed in the public portfolio.</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all"
        >
          <Plus size={18} /> Add Project
        </Link>
      </div>

      <div className="bg-black border border-zinc-800/50 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-zinc-400 uppercase bg-zinc-900/50 border-b border-zinc-800/50">
              <tr>
                <th className="px-6 py-4 font-bold tracking-widest">Project</th>
                <th className="px-6 py-4 font-bold tracking-widest">Category</th>
                <th className="px-6 py-4 font-bold tracking-widest">Role</th>
                <th className="px-6 py-4 font-bold tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-zinc-500">
                    No projects found. Click "Add Project" to create one.
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project.id} className="border-b border-zinc-800/30 hover:bg-zinc-900/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {project.imageUrl ? (
                           <img src={project.imageUrl} alt={project.title} className="w-12 h-12 rounded-lg object-cover bg-zinc-900" />
                        ) : (
                           <div className="w-12 h-12 rounded-lg bg-zinc-900" />
                        )}
                        <div>
                          <div className="font-bold text-white mb-0.5">{project.title}</div>
                          <div className="text-xs text-zinc-500">/{project.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-400">
                      {project.category}
                    </td>
                    <td className="px-6 py-4 text-zinc-400">
                      {project.role}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/projects/${project.id}/edit`}
                          className="p-2 text-zinc-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                        >
                          <Edit2 size={16} />
                        </Link>
                        <DeleteProjectButton projectId={project.id} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
