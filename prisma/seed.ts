
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const projects = [
    {
        title: "LorryLink",
        slug: "lorry-link",
        role: "Platform Architecture",
        content: "Automated logistics platform with real-time fleet visualization and pricing engine.",
        techStack: ["Next.js", "TypeScript", "MongoDB", "Mapbox"],
        features: ["GPS Tracking", "Route Optimization", "Driver Dashboard"],
        imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1770&auto=format&fit=crop",
        category: "Web App"
    },
    {
        title: "Antygravity",
        slug: "antygravity-tuition",
        role: "Full Stack Development",
        content: "Managed tuition marketplace with escrow logic and dashboard-first UX.",
        techStack: ["Next.js", "PostgreSQL", "Stripe"],
        features: ["Escrow Payments", "Class Scheduling", "Tutor Verification"],
        imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1832&auto=format&fit=crop",
        category: "Web App"
    },
    {
        title: "Rush Photography",
        slug: "rush-photography",
        role: "Frontend Engineering",
        content: "Minimalist portfolio with masonry grid layout and immersive hero section.",
        techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
        features: ["Masonry Grid", "Lazy Loading", "Sticky Navbar"],
        imageUrl: "https://images.unsplash.com/photo-1554048612-387768052bf7?q=80&w=1935&auto=format&fit=crop",
        category: "Website"
    },
    {
        title: "Sovereign Focus",
        slug: "sovereign-focus",
        role: "Mobile App Dev",
        content: "AI-driven study system with discipline enforcement and progress analysis.",
        techStack: ["React Native", "Expo", "AI Integration"],
        features: ["AI Scheduling", "App Blocking", "Progress Analytics"],
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1770&auto=format&fit=crop",
        category: "Mobile App"
    },
    {
        title: "Sn Ceylon",
        slug: "sn-ceylon",
        role: "Migration & Refactoring",
        content: "E-commerce platform migration from Vite to Next.js for improved performance.",
        techStack: ["Next.js", "Tailwind CSS", "Vite"],
        features: ["SEO Optimization", "Performance Tuning", "Blue/White Theme"],
        imageUrl: "https://images.unsplash.com/photo-1556742046-806e8ac2136d?q=80&w=1770&auto=format&fit=crop",
        category: "Web App"
    },
    {
        title: "Type Money",
        slug: "type-money",
        role: "App Development",
        content: "Financial application for tracking expenses and investments.",
        techStack: ["React Native", "Firebase", "Node.js"],
        features: ["Expense Tracking", "Investment Portfolio", "Dark Mode"],
        imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1771&auto=format&fit=crop",
        category: "Mobile App"
    },
    {
        title: "Studio Vibez",
        slug: "studio-vibez",
        role: "Web Development",
        content: "Dynamic art gallery website with Instagram integration.",
        techStack: ["Next.js", "Instagram API", "Sanity CMS"],
        features: ["Dynamic Gallery", "Social Feed", "Artist Profiles"],
        imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1771&auto=format&fit=crop",
        category: "Website"
    },
    {
        title: "Demandium User App",
        slug: "demandium-user",
        role: "Mobile Refactoring",
        content: "Service booking application with re-branded UI and backend integration.",
        techStack: ["Flutter", "Laravel", "PHP"],
        features: ["Service Booking", "Real-time Status", "Rebranding"],
        imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1770&auto=format&fit=crop",
        category: "Mobile App"
    },
    {
        title: "Dinidu Hall",
        slug: "dinidu-hall",
        role: "UI Implementation",
        content: "Event venue website with booking capabilities and gallery.",
        techStack: ["React", "Vite", "Tailwind CSS"],
        features: ["Venue Showcase", "Booking Inquiry", "Responsive Design"],
        imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1798&auto=format&fit=crop",
        category: "Website"
    },
    {
        title: "Mobile Hub",
        slug: "mobile-hub",
        role: "E-commerce Dev",
        content: "Mobile phone and accessories e-commerce platform.",
        techStack: ["Next.js", "Stripe", "PostgreSQL"],
        features: ["Wishlist", "Product Comparison", "Shopping Cart"],
        imageUrl: "https://images.unsplash.com/photo-1598331668826-20cecc596b86?q=80&w=1770&auto=format&fit=crop",
        category: "Web App"
    },
    {
        title: "Perfex CRM",
        slug: "perfex-crm-custom",
        role: "System Migration",
        content: "Customized CRM migration with 'Cyber Blue' theme integration.",
        techStack: ["PHP", "Next.js", "MySQL"],
        features: ["Custom Theme", "Data Migration", "Dashboard Analytics"],
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1770&auto=format&fit=crop",
        category: "Dashboard"
    },
    {
        title: "Seranex Corporate",
        slug: "seranex-corporate",
        role: "Digital Architecture",
        content: "The official high-performance corporate website for Seranex.",
        techStack: ["Next.js 15", "R3F", "Tailwind v4"],
        features: ["3D Experience", "AI Quoting", "Global SEO"],
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1770&auto=format&fit=crop",
        category: "Website"
    }
];

async function main() {
    console.log(`Start seeding ...`);
    // Clear existing to avoid duplicates in this dev cycle
    try {
        await prisma.project.deleteMany({});
        console.log("Cleared existing projects.");
    } catch (e) {
        console.log("No existing projects to clear or error clearing.");
    }

    for (const p of projects) {
        const project = await prisma.project.upsert({
            where: { slug: p.slug },
            update: p,
            create: p,
        });
        console.log(`Created project: ${project.title}`);
    }
    console.log(`Seeding finished. ${projects.length} projects created.`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
