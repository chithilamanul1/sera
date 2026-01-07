'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: '',
        budget: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate form submission
        setTimeout(() => {
            toast.success('Quote request received! We\'ll send you a custom quote within 24 hours.');
            setFormData({ name: '', email: '', phone: '', company: '', projectType: '', budget: '', message: '' });
            setLoading(false);
        }, 1500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const whatsappNumber = '+94728382638';
    const whatsappMessage = 'Hi! I would like to discuss a project with Seranex.';
    const whatsappLink = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <section id="contact" className="min-h-screen py-20 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-heading font-bold glow-text mb-4">
                        Get In Touch
                    </h2>
                    <p className="text-silver/80 text-lg max-w-2xl mx-auto mb-4">
                        Have a project in mind? Let's discuss how we can help you grow
                    </p>
                    <p className="text-silver/60 text-sm">
                        Prefer to talk? Click the WhatsApp button below for instant chat!
                    </p>
                </motion.div>

                {/* WhatsApp CTA - Prominent */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                    >
                        <motion.div
                            whileHover={{ scale: 1.02, y: -4 }}
                            whileTap={{ scale: 0.98 }}
                            className="glass p-6 rounded-2xl border-2 border-green-500/30 hover:border-green-500/60 transition-all cursor-pointer"
                            style={{
                                background: 'linear-gradient(135deg, rgba(37, 211, 102, 0.1), rgba(37, 211, 102, 0.05))',
                            }}
                        >
                            <div className="flex items-center justify-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                                    <MessageCircle className="w-8 h-8 text-green-500" />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-2xl font-heading font-bold text-white mb-1">
                                        Chat on WhatsApp
                                    </h3>
                                    <p className="text-silver/70 text-sm">
                                        Get instant responses from our team
                                    </p>
                                    <p className="text-green-500 font-semibold mt-1">
                                        {whatsappNumber}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </a>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info - More Prominent */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="text-2xl font-heading font-bold text-white mb-6">
                                Contact Information
                            </h3>
                            <p className="text-silver/70 mb-8">
                                We're here to help! Reach out through any of these channels.
                            </p>
                        </div>

                        {/* Contact Details - Larger & Clickable */}
                        <div className="space-y-6">
                            {[
                                {
                                    icon: MessageCircle,
                                    label: 'WhatsApp',
                                    value: whatsappNumber,
                                    link: whatsappLink,
                                    color: '#25D366',
                                },
                                {
                                    icon: Phone,
                                    label: 'Phone',
                                    value: '+94 72 838 2638',
                                    link: 'tel:+94728382638',
                                    color: '#FFFFFF',
                                },
                                {
                                    icon: Mail,
                                    label: 'Email',
                                    value: 'info@seranex.org',
                                    link: 'mailto:info@seranex.org',
                                    color: '#FFFFFF',
                                },
                                {
                                    icon: MapPin,
                                    label: 'Location',
                                    value: 'Colombo, Sri Lanka',
                                    link: null,
                                    color: '#FFFFFF',
                                },
                            ].map((item, index) => {
                                const Icon = item.icon;
                                const content = (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        whileHover={item.link ? { x: 4 } : {}}
                                        className={`flex items-start gap-4 p-4 rounded-xl ${item.link ? 'glass cursor-pointer hover:border-glow-silver/30' : ''}`}
                                    >
                                        <div
                                            className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                                            style={{
                                                backgroundColor: `${item.color}20`,
                                                border: `1px solid ${item.color}30`,
                                            }}
                                        >
                                            <Icon className="w-6 h-6" style={{ color: item.color }} />
                                        </div>
                                        <div>
                                            <p className="text-silver/60 text-sm mb-1">{item.label}</p>
                                            <p className="text-white font-semibold text-lg">{item.value}</p>
                                            {item.link && (
                                                <p className="text-glow-silver text-xs mt-1">Click to {item.label === 'WhatsApp' ? 'chat' : item.label === 'Phone' ? 'call' : 'email'} →</p>
                                            )}
                                        </div>
                                    </motion.div>
                                );

                                return item.link ? (
                                    <a
                                        key={item.label}
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {content}
                                    </a>
                                ) : (
                                    <div key={item.label}>{content}</div>
                                );
                            })}
                        </div>

                        {/* Office Hours */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="glass p-6 rounded-xl"
                        >
                            <h4 className="text-white font-heading font-semibold mb-3">
                                Office Hours
                            </h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-silver/70">Monday - Friday</span>
                                    <span className="text-white font-medium">9:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-silver/70">Saturday</span>
                                    <span className="text-white font-medium">10:00 AM - 4:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-silver/70">Sunday</span>
                                    <span className="text-silver/60">Closed</span>
                                </div>
                            </div>
                            <p className="text-green-500 text-xs mt-4">
                                💬 WhatsApp available 24/7 for urgent inquiries
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl space-y-6">
                            <div className="mb-4">
                                <h3 className="text-xl font-heading font-bold text-white mb-2">
                                    Or Send a Quote Request
                                </h3>
                                <p className="text-silver/60 text-sm">
                                    Fill out the form and we'll get back to you within 24 hours
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-silver/80 text-sm mb-2">
                                        Your Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg bg-surface border border-silver/10 text-white placeholder-silver/40 focus:border-glow-silver/40 focus:outline-none transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-silver/80 text-sm mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg bg-surface border border-silver/10 text-white placeholder-silver/40 focus:border-glow-silver/40 focus:outline-none transition-colors"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="phone" className="block text-silver/80 text-sm mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg bg-surface border border-silver/10 text-white placeholder-silver/40 focus:border-glow-silver/40 focus:outline-none transition-colors"
                                        placeholder="+94 72 838 2638"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="company" className="block text-silver/80 text-sm mb-2">
                                        Company (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg bg-surface border border-silver/10 text-white placeholder-silver/40 focus:border-glow-silver/40 focus:outline-none transition-colors"
                                        placeholder="Your Company"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="projectType" className="block text-silver/80 text-sm mb-2">
                                        Project Type *
                                    </label>
                                    <select
                                        id="projectType"
                                        name="projectType"
                                        value={formData.projectType}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg bg-surface border border-silver/10 text-white focus:border-glow-silver/40 focus:outline-none transition-colors"
                                    >
                                        <option value="">Select type</option>
                                        <option value="website">Website</option>
                                        <option value="mobile">Mobile App</option>
                                        <option value="design">UI/UX Design</option>
                                        <option value="software">Desktop Software</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="budget" className="block text-silver/80 text-sm mb-2">
                                        Budget Range
                                    </label>
                                    <select
                                        id="budget"
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg bg-surface border border-silver/10 text-white focus:border-glow-silver/40 focus:outline-none transition-colors"
                                    >
                                        <option value="">Select range</option>
                                        <option value="under-50k">Under LKR 50,000</option>
                                        <option value="50k-100k">LKR 50,000 - 100,000</option>
                                        <option value="100k-200k">LKR 100,000 - 200,000</option>
                                        <option value="200k-500k">LKR 200,000 - 500,000</option>
                                        <option value="500k+">LKR 500,000+</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-silver/80 text-sm mb-2">
                                    Project Details *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-lg bg-surface border border-silver/10 text-white placeholder-silver/40 focus:border-glow-silver/40 focus:outline-none transition-colors resize-none"
                                    placeholder="Tell us about your project requirements, timeline, and any specific features you need..."
                                />
                            </div>

                            <motion.button
                                type="submit"
                                disabled={loading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full px-8 py-4 rounded-full bg-gradient-to-r from-silver via-white to-platinum text-void font-heading font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Sending...' : 'Send Quote Request'}
                                <Send className="w-4 h-4" />
                            </motion.button>

                            <p className="text-silver/60 text-xs text-center">
                                We'll review your request and send you a custom quote within 24 hours
                            </p>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
