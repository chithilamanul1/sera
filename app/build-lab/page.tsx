'use client';

import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Hammer, Laptop, Globe, ShoppingCart } from 'lucide-react';
import PayHereButton from '@/components/ui/PayHereButton';

const showcaseProjects = [
    {
        id: "proj_001",
        title: "Mobile Hub",
        category: "E-commerce & Retail",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=1200",
        desc: "A premium mobile device marketplace with real-time inventory and modern dark/light UI.",
        link: "https://mobile-gub-git-master-chithilas-projects-59d3e554.vercel.app",
        price: 95000
    },
    {
        id: "proj_002",
        title: "Velocity CRM",
        category: "Enterprise Software",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        desc: "A custom logistics management system for Sri Lankan transport fleets.",
        price: 150000
    },
    {
        id: "proj_003",
        title: "Zenith Retail",
        category: "E-commerce",
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800",
        desc: "High-throughput online storefront with integrated inventory sync.",
        price: 85000
    },
    {
        id: "proj_004",
        title: "Nexus AI",
        category: "Automation",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        desc: "Machine learning layer for automated customer support in Colombo.",
        price: 120000
    }
];

export default function BuildLab() {
    // Mock customer info for demonstration
    const mockCustomer = {
        first_name: "Sera",
        last_name: "Nex",
        email: "hello@seranex.lk",
        phone: "0771234567",
        address: "Colombo, Sri Lanka",
        city: "Colombo",
        country: "Sri Lanka"
    };

    return (
        <main className="min-h-screen bg-background text-foreground relative">
            <Navbar />

            <section className="pt-40 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                        <div className="max-w-2xl">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2 text-blue-500 font-bold mb-4"
                            >
                                <Hammer size={20} />
                                The Construction Site
                            </motion.div>
                            <h1 className="text-7xl md:text-9xl font-bold font-syne italic tracking-tighter leading-[0.8]">
                                Build <span className="text-zinc-700">Lab.</span>
                            </h1>
                        </div>
                        <p className="text-zinc-500 text-xl max-w-sm mb-4">
                            Where blueprints become high-performance digital reality. Our latest experimental and production grade builds.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {showcaseProjects.map((project, i) => (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`relative group overflow-hidden rounded-[3rem] bg-zinc-900/50 border border-zinc-800 flex flex-col ${i === 0 ? 'lg:col-span-2' : ''
                                    }`}
                            >
                                <div className="aspect-[21/9] relative overflow-hidden">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                                </div>

                                <div className="p-8 md:p-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-blue-500 font-bold uppercase tracking-widest text-xs">{project.category}</span>
                                            <span className="px-2 py-0.5 bg-zinc-800 text-zinc-400 text-[10px] rounded-full">LKR {project.price.toLocaleString()}</span>
                                        </div>
                                        <h2 className="text-4xl md:text-5xl font-bold font-syne italic tracking-tighter text-white">{project.title}</h2>
                                        <p className="text-zinc-400 mt-4 max-w-md">{project.desc}</p>
                                    </div>

                                    <div className="flex flex-col gap-3 w-full md:w-auto">
                                        <PayHereButton
                                            orderId={project.id}
                                            items={`Purchase Build: ${project.title}`}
                                            amount={project.price}
                                            customerInfo={mockCustomer}
                                            label="Purchase Build"
                                            className="w-full md:w-auto px-8"
                                            onCompleted={() => alert("Payment Successful!")}
                                        />
                                        <a href={project.link || "#"} target={project.link ? "_blank" : "_self"} rel="noreferrer" className="w-full">
                                            <button className="w-full md:w-16 md:h-16 rounded-xl md:rounded-full bg-zinc-800 text-white flex items-center justify-center hover:bg-zinc-700 transition-colors cursor-pointer group/btn">
                                                <ExternalLink size={20} className="md:group-hover-btn:scale-110 transition-transform" />
                                                <span className="md:hidden ml-2 font-bold">View Demo</span>
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center justify-between border-t border-zinc-800 pt-32">
                    <div className="space-y-6">
                        <h2 className="text-5xl font-bold font-syne italic tracking-tighter">Ready to Build?</h2>
                        <p className="text-zinc-500 text-xl">Let&apos;s prototype your enterprise vision in the next 24 hours.</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-all">Start Project</button>
                        <button className="px-8 py-4 bg-zinc-900 text-white font-bold rounded-full border border-zinc-800 hover:bg-zinc-800 transition-all">View Github</button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
