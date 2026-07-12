import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProjectForm from "../../ProjectForm";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const project = await prisma.project.findUnique({
    where: { id }
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <ProjectForm initialData={project} projectId={project.id} />
    </div>
  );
}
