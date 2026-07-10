"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";

export default function ProjectForm({ initialData, projectId }: { initialData?: any, projectId?: string }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    role: initialData?.role || "",
    vision: initialData?.vision || "",
    businessImpact: initialData?.businessImpact || "",
    content: initialData?.content || "",
    techStack: initialData?.techStack?.join(", ") || "",
    features: initialData?.features?.join(", ") || "",
    imageUrl: initialData?.imageUrl || "",
    galleryImages: initialData?.galleryImages?.join(", ") || "",
    executiveSummary: initialData?.executiveSummary || "",
    caseStudy: initialData?.caseStudy || "",
    category: initialData?.category || "WEB_DEVELOPMENT",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const payload = {
        ...formData,
        techStack: formData.techStack.split(",").map((s) => s.trim()).filter(Boolean),
        features: formData.features.split(",").map((s) => s.trim()).filter(Boolean),
        galleryImages: formData.galleryImages.split(",").map((s) => s.trim()).filter(Boolean),
      };

      const url = projectId ? `/api/projects/${projectId}` : `/api/projects`;
      const method = projectId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save project");
      }

      router.push("/admin/projects");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto space-y-8 pb-24">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/projects" className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-3xl font-bold font-syne tracking-tight">{projectId ? "Edit Project" : "New Project"}</h1>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all disabled:opacity-50"
        >
          {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          Save Project
        </button>
      </div>

      {error && <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-400">Title</label>
          <input required name="title" value={formData.title} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="Project Title" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-400">Slug</label>
          <input required name="slug" value={formData.slug} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="url-friendly-slug" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-400">Category</label>
          <select required name="category" value={formData.category} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors">
            <option value="WEB_DEVELOPMENT">Web Development</option>
            <option value="MOBILE_APP">Mobile App</option>
            <option value="UI_UX_DESIGN">UI/UX Design</option>
            <option value="AI_INTEGRATION">AI Integration</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-400">Role / Scope</label>
          <input required name="role" value={formData.role} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="e.g. Full Stack Development" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-zinc-400">Cover Image URL</label>
        <input required name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="https://..." />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-zinc-400">Main Content / Description</label>
        <textarea required name="content" value={formData.content} onChange={handleChange} rows={5} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="Describe the project..."></textarea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-400">Vision</label>
          <textarea name="vision" value={formData.vision} onChange={handleChange} rows={3} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="Project vision..."></textarea>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-400">Business Impact</label>
          <textarea name="businessImpact" value={formData.businessImpact} onChange={handleChange} rows={3} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="Results achieved..."></textarea>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-400">Tech Stack (Comma Separated)</label>
          <input name="techStack" value={formData.techStack} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="Next.js, Tailwind, Prisma..." />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-400">Features (Comma Separated)</label>
          <input name="features" value={formData.features} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="User Auth, Payment Gateway..." />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-bold text-zinc-400">Gallery Image URLs (Comma Separated)</label>
        <input name="galleryImages" value={formData.galleryImages} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="https://..., https://..." />
      </div>
    </form>
  );
}
