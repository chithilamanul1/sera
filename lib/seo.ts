export const SEO_KEYWORDS = {
    tier1: [
        // Standard Enterprise & SaaS
        "Custom AI & Agentic Software", "Autonomous AI agent development", "Enterprise agentic workflows",
        "Bespoke AI software solutions", "Multi-agent system architecture", "AI agent security frameworks",
        "Generative AI for enterprise", "Custom LLM fine-tuning services", "Autonomous digital employees",
        "AI-driven business process automation", "Goal-oriented AI agents", "AI agent pilot-to-production",
        "Scalable agentic commerce", "Agentic orchestration mesh", "Enterprise AI strategy consulting",
        "Custom AI chatbot for high-end retail", "AI-led legacy modernization", "Predictive maintenance AI agents",
        "AI-native software architecture", "Autonomous customer concierge", "B2B sales automation agents",
        "AI agent knowledge base grounding", "Secure AI implementation", "Global AI-powered data analytics dashboards",
        "Cognitive automation services", "Advanced RAG implementation",

        // Next-Gen Mobile & Web
        "Next.js 16 enterprise development", "React Native New Architecture migration", "High-performance cross-platform apps",
        "Fabric renderer optimization", "TurboModules implementation", "Next.js PPR for e-commerce",
        "Server-side rendering mobile apps", "React Native JSI C++ development", "Universal app engineering",
        "Zero-bridge React Native apps", "Scalable SaaS dashboard", "Next.js Enterprise mobile security standards",
        "Custom visionOS spatial apps", "Next.js Turbopack build optimization", "React Native shadow tree optimization",
        "Multi-tenant SaaS architecture", "Next.js 16 developer for hire", "Performance-first mobile engineering",
        "Progressive Web Apps enterprise", "Cloud-native mobile backends",

        // Custom Software & Outsourcing
        "Custom software development 2026", "Offshore AI engineering team", "Global Capability Center as a Service",
        "Build-Operate-Transfer software model", "Bespoke ERP development", "Digital sovereignty cloud solutions",
        "Intelligent process automation", "Custom CRM for regulated industries", "Legacy system digital transformation",
        "Outcome-based software contracts", "Software staff augmentation AI", "Enterprise-grade low-code integration",
        "Resilient digital architecture", "Agile software development global", "Full-stack engineering services",
        "Cloud migration for enterprise", "API-first software development", "Dedicated software development team",
        "Custom fintech software solutions", "Microservices architecture design"
    ],
    tier2: [
        // Local Business & AI Automation
        "Business automation software Sri Lanka", "AI solutions for Sri Lankan corporates", "Enterprise AI company Colombo",
        "Custom AI software development Sri Lanka", "Sera Auto business automation", "SME digital transformation Sri Lanka",
        "AI for Sri Lankan banking and finance", "Digital modernization services Colombo", "AI-powered customer support Sri Lanka",
        "Automated accounting software Sri Lanka", "Data-driven decision making tools SL", "Sri Lanka AI strategy partners",
        "Top ICT company in Sri Lanka", "AI for Sri Lankan manufacturing sector", "Corporate AI training and implementation",

        // Local Mobile & Software Development
        "Mobile app development Sri Lanka", "Best mobile app company Colombo", "Android and iOS developers Sri Lanka",
        "React Native app development Colombo", "Next.js developer Sri Lanka", "Custom software company Sri Lanka",
        "Enterprise mobile apps Colombo", "E-commerce app development Sri Lanka", "Mobile banking app security SL",
        "Fintech app developers Sri Lanka", "Custom CRM software Sri Lanka", "HR management system Sri Lanka",
        "Payroll software Sri Lanka", "ERP system development Sri Lanka", "Inventory management software SL",
        "Web application development Colombo", "Software outsourcing Sri Lanka", "IT consulting services Colombo",
        "PDPA compliant software development SL", "Cloud migration services Sri Lanka"
    ],
    authority: [
        // International SEO & Authority
        "Generative Engine Optimization services", "Optimize website for AI Overviews", "AI citation authority branding",
        "Rank in ChatGPT search 2026", "Structured data for AI agent crawling", "AI-first content marketing",
        "Voice search optimization enterprise", "Technical SEO for agentic discovery", "Conversational keyword research",
        "Brand presence in AI search", "LLM citation and referral optimization", "Semantic mapping for search",
        "GEO strategy for software firms", "Predictive SEO analytics", "Automated SEO audit AI agents"
    ],
    // Placeholder for AI generated keywords to reach ~1000 total if needed dynamically
    generated: [
        "AI-powered logistics optimization", "Neural network consulting", "Deep learning for healthcare",
        "Computer vision systems integration", "Natural language processing for legal tech", "AI ethics compliance auditing",
        "Automated code generation tools", "Self-healing infrastructure automation", "AI-driven supply chain resilience",
        "Hyper-personalized marketing AI", "Robotic Process Automation (RPA) 2.0", "Edge AI implementation services",
        "Federated learning solutions", "Explainable AI (XAI) consulting", "AI model governance frameworks",
        "Synthetic data generation for training", "Digital twin development services", "Smart city AI infrastructure",
        "Precision agriculture AI solutions", "AI-enhanced cybersecurity defense", "Quantum-resistant cryptography integration",
        "Blockchain-AI convergence solutions", "Decentralized AI marketplaces", "Web3 autonomous organizations (DAOs)",
        "Metaverse enterprise solutions", "Immersive commerce experiences", "Haptic technology integration",
        "Brain-computer interface (BCI) apps", "Neuromorphic computing software", "Bioinformatics data pipelines",
        "Genomic analysis platforms", "AI for drug discovery", "Telemedicine platform development",
        "Remote patient monitoring systems", "Healthtech interoperability standards", "FHIR compliance solutions",
        "EdTech AI personalization", "Adaptive learning platforms", "Gamified corporate training",
        "Virtual classroom infrastructure", "AI-proctored examination systems", "Fintech fraud detection AI",
        "Algorithmic trading bot development", "RegTech compliance automation", "InsurTech claims processing AI",
        "Wealth management robo-advisors", "PropTech dynamic pricing models", "Smart building management systems",
        "Energy grid optimization AI", "Renewable energy forecasting tools", "Carbon footprint tracking software",
        "ESG reporting automation", "Sustainable supply chain verification", "Circular economy digital platforms",
        "Non-profit impact measurement", "NGO fundraising AI optimization", "Government digital service delivery",
        "Civic tech engagement platforms", "Smart simplified visa systems", "Digital identity verification (eKYC)",
        "Border control AI augmentation", "Disaster response coordination tools", "Humanitarian aid logistics AI",
        "Space tech data analysis", "Satellite imagery processing", "Maritime logistics optimization",
        "Autonomous vehicle software stack", "Drone fleet management systems", "Smart traffic control AI"
    ]
};

export const SITE_METADATA = {
    title: "Seranex | Enterprise AI & Agentic Software Architecture",
    description: "Seranex architects autonomous AI agents, next-gen mobile apps, and scalable SaaS platforms for global enterprises. Bridging the gap between high-end design and technical singularity.",
    siteUrl: "https://seranex.org", // Replace with actual domain
    twitterHandle: "@seranex_ai",
    ogImage: "/images/og-image.jpg", // Needs to be created
    keywords: [
        ...SEO_KEYWORDS.tier1,
        ...SEO_KEYWORDS.tier2,
        ...SEO_KEYWORDS.authority,
        ...SEO_KEYWORDS.generated
    ].join(", ")
};
