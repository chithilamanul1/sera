export interface Project {
    id: string;
    title: string;
    client: string;
    description: string;
    tags: string[];
    imageUrl: string;
    category: string;
}

export const projects: Project[] = [
    {
        id: 'quantum-ai',
        title: 'Quantum Intelligence Platform',
        client: 'TechNova Corp',
        description: 'Empowering enterprise logistics with real-time AI decision-making architecture.',
        tags: ['AI', 'Next.js', 'PostgreSQL'],
        imageUrl: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1200',
        category: 'AI Automation'
    },
    {
        id: 'seranex-lanka',
        title: 'Lanka Logistics Suite',
        client: 'Seranex Lanka',
        description: 'Complete cross-platform automation for nation-wide logistics and distribution.',
        tags: ['Flutter', 'Node.js', 'Google Maps'],
        imageUrl: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80&w=1200',
        category: 'Mobile & Logistics'
    },
    {
        id: 'cyber-vault',
        title: 'CyberVault FinTech',
        client: 'Nexus Finance',
        description: 'A cutting-edge financial dashboard with 3D interactives and high-security encryption.',
        tags: ['FinTech', 'Three.js', 'Web3'],
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
        category: 'FinTech'
    }
];
