// Portfolio data for Seranex Digital Lanka

export interface PortfolioItem {
    id: string;
    title: string;
    category: string;
    image: string;
    description: string;
    techStack: string[];
    link: string | null;
    github: string | null;
    featured: boolean;
    status: 'Live' | 'In Development' | 'Internal Tool';
}

export const portfolioData: PortfolioItem[] = [
    {
        id: "seranex-v2",
        title: "Seranex Digital (Agency)",
        category: "Agency Platform",
        image: "/projects/seranex-v2.png",
        description: "The flagship digital experience for Seranex Digital Lanka. A high-performance agency site featuring a custom 'Dark Matter' design system, WebGL particle integrations, and a client-facing dashboard for real-time project tracking. Built to establish a unique digital identity in the Sri Lankan tech space.",
        techStack: ["Next.js 15", "React Three Fiber", "Tailwind CSS", "Firebase Auth"],
        link: "https://seranex.org",
        github: null,
        featured: true,
        status: "Live"
    },
    {
        id: "jayantha-motors",
        title: "Jayantha Motors",
        category: "Automotive & Corporate",
        image: "/projects/jayantha-motors.png",
        description: "A comprehensive digital presence for Jayantha Motors (Seeduwa), a trusted motorcycle repair service since 1980. The platform highlights their 40+ years of experience, service offerings from routine maintenance to engine rebuilds, and their commitment to customer satisfaction.",
        techStack: ["Next.js", "React", "Responsive Design"],
        link: "https://jayanthamortors.site/",
        github: null,
        featured: true,
        status: "Live"
    },
    {
        id: "mobile-hub",
        title: "Mobile Hub Market",
        category: "E-Commerce",
        image: "/projects/mobile-hub.png",
        description: "A modern multi-vendor marketplace for pre-owned and brand-new mobile devices. Features include dynamic category filtering, a real-time search engine, and a secure checkout flow. Designed to simplify the buying and selling of electronics in local markets.",
        techStack: ["Next.js", "Commerce.js", "Stripe Integration", "Tailwind CSS"],
        link: "https://mobile-gub-git-master-chithilas-projects-59d3e554.vercel.app/shop?category=Pre-owned",
        github: "https://github.com/chithilamanul1/mobile-gub",
        featured: true,
        status: "Live"
    },
    {
        id: "chithila-transport",
        title: "Chithila Transport Systems",
        category: "Logistics & Enterprise",
        image: "/assets/portfolio/transport-system.jpg",
        description: "An internal fleet management system designed for heavy logistics operations (14.5ft & 16.5ft lorries). The application handles vehicle scheduling, driver assignment, and trip route optimization to maximize fuel efficiency for large-scale cargo transport.",
        techStack: ["React Dashboard", "Google Maps API", "Firebase Realtime DB"],
        link: "https://chithila-transport.seranex.org",
        github: null,
        featured: false,
        status: "Internal Tool"
    },
    {
        id: "road-house-restro",
        title: "Road House Restro",
        category: "Hospitality",
        image: "/projects/roadhouse.png",
        description: "A premium digital menu and reservation system for Road House Seeduwa. The platform includes a Kitchen Display System (KDS) concept to streamline order flow from the table to the kitchen, replacing traditional paper ticketing.",
        techStack: ["Next.js", "Framer Motion", "Supabase", "QR Code API"],
        link: null,
        github: null,
        featured: false,
        status: "In Development"
    }
];

export const projectCategories = [
    "All",
    "Agency Platform",
    "E-Commerce",
    "Automotive & Corporate",
    "Logistics & Enterprise",
    "Hospitality"
];
