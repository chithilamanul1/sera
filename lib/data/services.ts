import { Code, Smartphone, Palette, Rocket, Zap, Shield } from 'lucide-react';

export const services = [
    {
        id: 'web-development',
        title: 'Web Development',
        icon: Code,
        shortDescription: 'Custom websites and web applications built with cutting-edge technologies.',
        fullDescription: 'We build high-performance, scalable, and secure web applications tailored to your business needs. From simple landing pages to complex enterprise solutions, our team uses the latest technologies to deliver exceptional results.',
        features: [
            'Next.js 15 & React Server Components',
            'Responsive & Mobile-First Design',
            'SEO Optimization & Schema Markup',
            'Progressive Web App (PWA) Capabilities',
            'CMS Integration (Sanity, WordPress, etc.)'
        ],
        technologies: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Node.js', 'Supabase'],
        startingPrice: 'LKR 15,000',
        pricingPackages: [
            {
                name: 'Starter',
                price: 'LKR 15,000',
                features: ['One Page Website', 'Mobile Responsive', 'Basic SEO', 'Contact Form']
            },
            {
                name: 'Business',
                price: 'LKR 45,000',
                features: ['5-10 Pages', 'CMS Integration', 'Advanced SEO', 'Google Analytics', 'Social Media Integration']
            },
            {
                name: 'Enterprise',
                price: 'Custom',
                features: ['Custom Web App', 'Database Integration', 'User Authentication', 'API Development', 'Priority Support']
            }
        ]
    },
    {
        id: 'mobile-apps',
        title: 'Mobile Apps',
        icon: Smartphone,
        shortDescription: 'Native and cross-platform mobile applications for iOS and Android.',
        fullDescription: 'Turn your ideas into powerful mobile applications. We specialize in building cross-platform apps that work seamlessly on both iOS and Android using a single codebase, saving you time and money without compromising on quality.',
        features: [
            'Cross-Platform Development (Flutter/React Native)',
            'Native Performance & Feel',
            'Offline Functionality',
            'Push Notifications Integration',
            'App Store & Play Store Deployment'
        ],
        technologies: ['React Native', 'Flutter', 'Expo', 'Firebase', 'Supabase'],
        startingPrice: 'LKR 45,000',
        pricingPackages: [
            {
                name: 'MVP',
                price: 'LKR 45,000',
                features: ['Basic Core Features', 'Android Support', 'Basic UI/UX', '1 Month Support']
            },
            {
                name: 'Pro',
                price: 'LKR 120,000',
                features: ['iOS & Android', 'Advanced Features', 'Custom Animations', 'Push Notifications', 'API Integration']
            },
            {
                name: 'Scale',
                price: 'Custom',
                features: ['Complex Backend', 'Real-time Features', 'Custom Admin Panel', 'Maintenance Plan']
            }
        ]
    },
    {
        id: 'ui-ux-design',
        title: 'UI/UX Design',
        icon: Palette,
        shortDescription: 'Beautiful, intuitive interfaces that users love to interact with.',
        fullDescription: 'Good design is good business. We create user-centric designs that are not only visually stunning but also intuitive and easy to use. Our design process focuses on understanding your users and solving their problems.',
        features: [
            'User Research & Personas',
            'Wireframing & Prototyping',
            'High-Fidelity UI Design',
            'Interactive Prototypes',
            'Design Systems & Style Guides'
        ],
        technologies: ['Figma', 'Adobe XD', 'Sketch', 'Principle'],
        startingPrice: 'LKR 8,000',
        pricingPackages: [
            {
                name: 'Landing Page',
                price: 'LKR 8,000',
                features: ['Single Page Design', 'Mobile & Desktop', 'Source Files']
            },
            {
                name: 'Full Site',
                price: 'LKR 25,000',
                features: ['Up to 10 Screens', 'Interactive Prototype', 'Design System', 'Asset Export']
            }
        ]
    },
    {
        id: 'digital-strategy',
        title: 'Digital Strategy',
        icon: Rocket,
        shortDescription: 'Comprehensive digital solutions to grow your business online.',
        fullDescription: 'Navigate the digital landscape with confidence. We help you define your digital goals, identify your target audience, and create a roadmap for success. From brand positioning to growth marketing, we\'ve got you covered.',
        features: [
            'Market & Competitor Analysis',
            'Brand Positioning & Identity',
            'Content Strategy',
            'Social Media Roadmap',
            'Conversion Rate Optimization (CRO)'
        ],
        technologies: ['Google Analytics', 'SEMrush', 'Ahrefs', 'Meta Business Suite'],
        startingPrice: 'LKR 10,000',
        pricingPackages: [
            {
                name: 'Audit',
                price: 'LKR 10,000',
                features: ['Website Audit', 'Competitor Analysis', 'Basic Recommendations']
            },
            {
                name: 'Growth',
                price: 'LKR 35,000',
                features: ['Full Strategy Document', 'Content Calendar', 'SMM Setup', 'Monthly Report']
            }
        ]
    },
    {
        id: 'performance',
        title: 'Performance',
        icon: Zap,
        shortDescription: 'Lightning-fast applications optimized for speed and efficiency.',
        fullDescription: 'Speed matters. A slow website costs you customers and hurts your Google rankings. We optimize your web applications for maximum speed, efficiency, and Core Web Vitals compliance.',
        features: [
            'Code Splitting & Optimization',
            'Image Optimization & Lazy Loading',
            'Server-Side Rendering (SSR)',
            'CDN Integration',
            'Database Indexing & Caching'
        ],
        technologies: ['Vercel', 'Cloudflare', 'Redis', 'Lighthouse'],
        startingPrice: 'LKR 5,000',
        pricingPackages: [
            {
                name: 'Speed Boost',
                price: 'LKR 5,000',
                features: ['Basic Image Opt', 'Cache Setup', 'Minification', 'Report']
            },
            {
                name: 'Deep Clean',
                price: 'LKR 15,000',
                features: ['Code Refactoring', 'Database Op', 'Core Web Vitals Fix', 'CDN Setup']
            }
        ]
    },
    {
        id: 'security',
        title: 'Security',
        icon: Shield,
        shortDescription: 'Enterprise-grade security to protect your data and users.',
        fullDescription: 'Protect your business from cyber threats. We implement robust security measures to safeguard your applications and user data, ensuring compliance with global security standards.',
        features: [
            'SSL/TLS Implementation',
            'DDoS Protection',
            'Secure Authentication (Auth0/NextAuth)',
            'Data Encryption (At Rest & In Transit)',
            'Regular Security Audits'
        ],
        technologies: ['Cloudflare', 'NextAuth', 'Supabase Auth', 'WAF'],
        startingPrice: 'LKR 10,000',
        pricingPackages: [
            {
                name: 'Basic',
                price: 'LKR 10,000',
                features: ['SSL Setup', 'Basic Firewall', 'Security Headers']
            },
            {
                name: 'Advanced',
                price: 'LKR 30,000',
                features: ['Penetration Testing', 'Database Encryption', 'Advanced WAF', 'Audit Logs']
            }
        ]
    },
];
