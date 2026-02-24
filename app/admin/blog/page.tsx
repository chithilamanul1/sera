import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Edit, Eye, CheckCircle2, XCircle } from 'lucide-react';
import Image from 'next/image';

// Force dynamic to always fetch the latest posts
export const dynamic = 'force-dynamic';

export default async function AdminBlogPage() {
    const posts = await prisma.blogPost.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-clash uppercase tracking-widest text-white">Blog Manager</h1>
                    <p className="text-zinc-500 mt-2">Manage your technical articles, SEO metadata, and dynamic content.</p>
                </div>
                <Link
                    href="/admin/blog/new"
                    className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-3 rounded-xl transition-all"
                >
                    <Plus className="w-5 h-5" />
                    New Post
                </Link>
            </div>

            <div className="bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden">
                <table className="w-full text-left bg-zinc-950/50 backdrop-blur-md">
                    <thead className="border-b border-zinc-900 bg-zinc-900/40 text-xs uppercase tracking-widest font-bold font-mono text-zinc-500">
                        <tr>
                            <th className="p-6">Post Details</th>
                            <th className="p-6">Category</th>
                            <th className="p-6">Status</th>
                            <th className="p-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900/50">
                        {posts.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="p-12 text-center text-zinc-500">
                                    No posts found. Run the /api/setup endpoint or create a new one.
                                </td>
                            </tr>
                        ) : (
                            posts.map((post) => (
                                <tr key={post.id} className="hover:bg-zinc-900/20 transition-colors">
                                    <td className="p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-16 h-12 rounded-lg bg-zinc-900 relative overflow-hidden flex-shrink-0 border border-zinc-800">
                                                <Image src={post.coverImage || "/placeholder.jpg"} alt={post.title} fill className="object-cover" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-white line-clamp-1 mb-1">{post.title}</div>
                                                <div className="text-xs text-zinc-500 font-mono">{post.slug}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-bold text-zinc-300">
                                            {post.category}
                                        </span>
                                    </td>
                                    <td className="p-6">
                                        {post.published ? (
                                            <span className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
                                                <CheckCircle2 className="w-4 h-4" /> Published
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2 text-zinc-500 text-sm font-bold">
                                                <XCircle className="w-4 h-4" /> Draft
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            <Link
                                                href={`/blog/${post.slug}`}
                                                target="_blank"
                                                className="p-2 text-zinc-500 hover:text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-all"
                                                title="View Live"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Link>
                                            <Link
                                                href={`/admin/blog/edit/${post.id}`}
                                                className="p-2 text-cyan-500 hover:text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 rounded-lg transition-all"
                                                title="Edit Post"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
