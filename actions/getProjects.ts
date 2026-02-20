'use server';

export async function getProjects() {
    // try {
    //     console.log("[getProjects] Fetching from DB...");
    //     const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
    //     return JSON.parse(JSON.stringify(projects));
    // } catch (error) {
    //     console.error("[getProjects] Failed:", error);
    //     return [];
    // }

    // Fallback Static Data (Restored from History)
    return [
        {
            id: 'taxi-admin',
            title: "Airport Taxis Dashboard",
            slug: "taxi-admin",
            role: "Logistics Admin Panel",
            vision: "A centralized command center for managing airport transfers, drivers, and bookings in Sri Lanka.",
            businessImpact: "Streamlined dispatch operations and reduced booking errors by 40%.",
            content: "A high-performance dashboard for Airport Taxis (Pvt) Ltd, managing fleet, drivers, and reservations.",
            techStack: ["Next.js", "Tailwind CSS", "Vercel"],
            features: ["Real-time Dispatch", "Driver Management", "Booking Analytics"],
            imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop",
            galleryImages: [],
            executiveSummary: "Comprehensive admin dashboard for managing airport transfer logistics.",
            category: "Operations/Admin",
            createdAt: new Date().toISOString()
        },
        {
            id: 'chithila-transport',
            title: "Lorry Lanka",
            slug: "lorry-lanka",
            role: "Logistics Platform",
            vision: "The premier logistics solution for freight transport across Sri Lanka.",
            businessImpact: "Optimized route planning and fleet capability for Island-wide transport.",
            content: "Lorry Lanka (Chithila Transport) connects businesses with reliable goods transport services.",
            techStack: ["React", "Tailwind", "Vercel"],
            features: ["GPS Tracked Fleet", "Verified Handling", "Dynamic Pricing"],
            imageUrl: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop",
            galleryImages: [],
            executiveSummary: "Digital platform for Chithila Transport, modernizing lorry hire in Sri Lanka.",
            category: "Logistics/Transport",
            createdAt: new Date().toISOString()
        },
        {
            id: 'jayantha-motors',
            title: "Jayantha Motors",
            slug: "jayantha-motors",
            role: "Service Center Web",
            vision: "Bringing expert bike repair services in Seeduwa to the digital age.",
            businessImpact: "Increased service appointments and improved customer trust through digital presence.",
            content: "Official website for Jayantha Motors, showcasing expert bike repair services and packages.",
            techStack: ["Web", "SEO", "Responsive Design"],
            features: ["Service Packages", "Appointment Booking", "Service Gallery"],
            imageUrl: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop",
            galleryImages: [],
            executiveSummary: "Digital presence for a premier bike repair center in Seeduwa.",
            category: "Automotive/Service",
            createdAt: new Date().toISOString()
        },
        {
            id: 'novalink-main',
            title: "NovaLink Solutions",
            slug: "novalink",
            role: "ISP & Digital Services",
            vision: "Empowering digital journeys with affordable, high-speed connectivity solutions.",
            businessImpact: "expanded market reach for V2Ray and digital connectivity plans.",
            content: "Consumer-facing platform for NovaLink, offering unlimited data plans and high security.",
            techStack: ["Vite", "React", "Tailwind"],
            features: ["Plan Selection", "User Portal", "Secure Connectivity"],
            imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
            galleryImages: [],
            executiveSummary: "Marketing and sales platform for NovaLink's digital connectivity solutions.",
            category: "Telecom/Service",
            createdAt: new Date().toISOString()
        },
        {
            id: 'novalink-dash',
            title: "NovaLink Dashboard",
            slug: "novalink-dash",
            role: "Client Portal",
            vision: "Self-service control center for NovaLink subscribers.",
            businessImpact: "Reduced support tickets by enabling user self-service for plan management.",
            content: "Secure dashboard for managing NovaLink subscriptions and account settings.",
            techStack: ["Next.js", "Auth.js", "ControlX"],
            features: ["Plan Management", "Usage Analytics", "Subscription Renewal"],
            imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
            galleryImages: [],
            executiveSummary: "Customer control panel for managing digital subscriptions.",
            category: "SaaS/Dashboard",
            createdAt: new Date().toISOString()
        },
        {
            id: 'chithila-portfolio',
            title: "Chithila Manul",
            slug: "chithila-manul",
            role: "Personal Brand",
            vision: "Showcasing the work of a full-stack developer crafting digital storms.",
            businessImpact: "Personal branding and lead generation for freelance projects.",
            content: "Personal portfolio of Chithila Manul, highlighting expertise in Next.js and full-stack dev.",
            techStack: ["Next.js", "TypeScript", "Personal Brand"],
            features: ["Project Showcase", "Blog Integration", "Contact Funnel"],
            imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2155&auto=format&fit=crop",
            galleryImages: [],
            executiveSummary: "Personal portfolio website for Full Stack Developer Chithila Manul.",
            category: "Portfolio/Personal",
            createdAt: new Date().toISOString()
        }
    ];
}
