import { LucideIcon, PanelsTopLeft, Smartphone, Sparkles, Terminal, Activity, Zap } from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  description: string;
  slug: string;
  iconName: 'PanelsTopLeft' | 'Smartphone' | 'Sparkles' | 'Terminal' | 'Activity' | 'Zap';
  primaryColor: string; // Hex code
  category: 'Development' | 'AI' | 'Business';
  priority?: number; // 1 = Large, 2 = Medium, 3 = Small
  componentType: 'TiltedCard' | 'SpotlightCard' | 'Silk' | 'StandardCard';
}

export const services: Service[] = [
  // Top Row (The Main Targets)
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'Custom React & Next.js Websites with 3D interactives.',
    slug: 'web-development',
    iconName: 'PanelsTopLeft',
    primaryColor: '#00F2FF',
    category: 'Development',
    priority: 1,
    componentType: 'TiltedCard'
  },
  {
    id: 'app-dev',
    title: 'Mobile Applications',
    description: 'Cross-platform Flutter/React Native apps for iOS & Android.',
    slug: 'mobile-applications',
    iconName: 'Smartphone',
    primaryColor: '#00F2FF',
    category: 'Development',
    priority: 1,
    componentType: 'SpotlightCard'
  },
  // Middle Row (The Specialized Tech)
  {
    id: 'ai-solutions',
    title: 'AI Solutions & Integrated Bots',
    description: 'Custom LLMs & WhatsApp AI Bots for business automation.',
    slug: 'ai-solutions',
    iconName: 'Sparkles',
    primaryColor: '#DC143C',
    category: 'AI',
    priority: 2,
    componentType: 'Silk'
  },
  {
    id: 'custom-software',
    title: 'Custom Software',
    description: 'Tailored software solutions with code-snippet decorations.',
    slug: 'custom-software',
    iconName: 'Terminal',
    primaryColor: '#DC143C',
    category: 'Development',
    priority: 2,
    componentType: 'StandardCard'
  },
  // Bottom Row (The Business Systems)
  {
    id: 'crm-systems',
    title: 'CRM Systems',
    description: 'Inventory & Customer Management solutions.',
    slug: 'crm-systems',
    iconName: 'Activity',
    primaryColor: '#ffffff',
    category: 'Business',
    priority: 3,
    componentType: 'StandardCard'
  },
  {
    id: 'pos-systems',
    title: 'POS Systems',
    description: 'Streamlined Point of Sale technologies.',
    slug: 'pos-systems',
    iconName: 'Zap',
    primaryColor: '#ffffff',
    category: 'Business',
    priority: 3,
    componentType: 'StandardCard'
  }
];

export const iconMap: Record<string, LucideIcon> = {
  PanelsTopLeft,
  Smartphone,
  Sparkles,
  Terminal,
  Activity,
  Zap
};
