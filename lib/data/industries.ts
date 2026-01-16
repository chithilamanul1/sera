
import { Building2, Utensils, ShoppingBag, Globe, Plane, Calculator } from 'lucide-react';

export interface IndustryData {
    id: string; // url slug: /website-for-[id]
    title: string;
    description: string;
    icon: any;
    problem: string;
    solution: string;
    benefits: string[];
    price: string;
    demoUrl?: string;
    heroImage: string;
}

export const industries: IndustryData[] = [
    {
        id: 'hotels',
        title: 'Premium Websites for Hotels & Villas',
        description: 'Increase direct bookings and reduce OTA commissions with a stunning hotel website.',
        icon: Building2,
        problem: 'Are you losing 15-20% of your revenue to Booking.com and Airbnb commissions?',
        solution: 'Get a direct-booking engine built into a luxury website that showcases your property\'s true value.',
        benefits: [
            'Zero Commission Bookings',
            'Integrated Payment Gateway',
            'Availability Calendar',
            'Luxury Photo Gallery'
        ],
        price: 'Starting at LKR 35,000',
        heroImage: '/images/hero-hotel.jpg'
    },
    {
        id: 'restaurants',
        title: 'Digital Menu & Ordering for Restaurants',
        description: 'Turn hungry visitors into loyal customers with a mouth-watering restaurant website.',
        icon: Utensils,
        problem: 'Is your menu hard to find? Are you relying solely on UberEats and PickMe?',
        solution: 'Own your customer data with a custom ordering system and QR code digital menu.',
        benefits: [
            'Online Table Reservation',
            'Digital QR Menu',
            'Delivery Management System',
            'Customer Loyalty Program'
        ],
        price: 'Starting at LKR 25,000',
        heroImage: '/images/hero-restaurant.jpg'
    },
    {
        id: 'online-sellers',
        title: 'High-Converting E-commerce Stores',
        description: 'Stop selling just on Facebook. Build your own brand with a professional online store.',
        icon: ShoppingBag,
        problem: 'Is managing orders via DMs becoming a nightmare? Are you limited by social media algorithms?',
        solution: 'Automate sales, inventory, and payments with a robust E-commerce platform.',
        benefits: [
            'Automated Checkout',
            'Island-wide Delivery Integration',
            'Inventory Management',
            'Facebook/Instagram Shop Sync'
        ],
        price: 'Starting at LKR 45,000',
        heroImage: '/images/hero-shop.jpg'
    },
    {
        id: 'tours',
        title: 'Travel Agency & Tour Booking Websites',
        description: 'Showcase the beauty of Sri Lanka and get bookings from international tourists.',
        icon: Plane,
        problem: 'Are tourists struggling to trust your agency or book tours online?',
        solution: 'A trustworthy, multilingual travel portal with itinerary builders and secure payments.',
        benefits: [
            'Itinerary Builder',
            'Review Integration (TripAdvisor)',
            'Multi-currency Support',
            'SEO for "Sri Lanka Travel"'
        ],
        price: 'Starting at LKR 40,000',
        heroImage: '/images/hero-travel.jpg'
    },
    {
        id: 'tutors',
        title: 'LMS Websites for Tutors & Classes',
        description: 'Scale your tuition classes with an online learning management system.',
        icon: Calculator,
        problem: 'Struggling to manage fees, Zoom links, and student materials manually?',
        solution: 'Automate content delivery, quizzes, and fee collection with a custom LMS.',
        benefits: [
            'Automated Video Hosting',
            'Student Progress Tracking',
            'Secure Fee Payments',
            'Zoom/Teams Integration'
        ],
        price: 'Starting at LKR 50,000',
        heroImage: '/images/hero-tutor.jpg'
    }
];
