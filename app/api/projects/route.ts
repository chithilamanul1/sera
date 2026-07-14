import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(projects);
  } catch (error: any) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const userRole = (session?.user as any)?.role;
    
    if (!session || (userRole !== "ADMIN" && userRole !== "OWNER")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    
    // Ensure basic required fields exist
    if (!data.title || !data.slug || !data.role || !data.content || !data.imageUrl || !data.category) {
       return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const project = await prisma.project.create({
      data: {
        title: data.title,
        slug: data.slug,
        role: data.role,
        vision: data.vision || null,
        businessImpact: data.businessImpact || null,
        content: data.content,
        techStack: data.techStack || [],
        features: data.features || [],
        imageUrl: data.imageUrl,
        galleryImages: data.galleryImages || [],
        executiveSummary: data.executiveSummary || null,
        caseStudy: data.caseStudy || null,
        category: data.category,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    console.error("Failed to create project:", error);
    // Unique constraint on slug check
    if (error.code === 'P2002' && error.meta?.target?.includes('slug')) {
       return NextResponse.json(
        { error: "A project with this slug already exists." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
