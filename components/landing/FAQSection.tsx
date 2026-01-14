'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
    {
        question: "What's included in the LKR 5,000 website package?",
        answer: "You get a professional, modern website with up to 5 pages, mobile-responsive design, free domain for 1 year (.online, .site, or .tech), 1 month of technical support, and basic SEO setup. Everything you need to get your business online!"
    },
    {
        question: "How long does it take to build my website?",
        answer: "Once you qualify for the campaign, we'll complete your website in 5-7 business days. This includes design, development, testing, and deployment. Rush delivery available for an additional fee."
    },
    {
        question: "Can I see examples of your previous work?",
        answer: "Absolutely! Check out our portfolio page to see 30+ websites we've built for businesses across Sri Lanka. From restaurants to e-commerce stores, we have experience in every industry."
    },
    {
        question: "Do you offer payment plans?",
        answer: "Yes! For projects over LKR 15,000, we offer flexible payment plans. You can pay 50% upfront and the remaining 50% upon completion. For the LKR 5,000 campaign, full payment is required after qualifying."
    },
    {
        question: "What if I need changes after the website is launched?",
        answer: "Your package includes 1 month of free support for minor updates. For major changes or additional features, we offer affordable maintenance packages starting at LKR 3,000/month."
    },
    {
        question: "How do I qualify for the LKR 5,000 offer?",
        answer: "Simple! Join the campaign, share your unique referral link with 3 friends, and once they sign up and verify (by logging in), you qualify for the exclusive LKR 5,000 website package. It's that easy!"
    },
    {
        question: "Can I upgrade my domain from .online to .com?",
        answer: "Yes! You can upgrade to a .com domain for an additional LKR 2,500, .lk for LKR 4,500, or .net for LKR 2,000. Premium domains give your business more credibility and are easier to remember."
    }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-20 px-6 bg-void">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-bold mb-6 uppercase tracking-wide"
                    >
                        Got Questions?
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-heading font-bold text-white mb-4"
                    >
                        Frequently Asked Questions
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-silver/70"
                    >
                        Everything you need to know about our services
                    </motion.p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-surface rounded-2xl border border-white/5 overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                            >
                                <span className="text-lg font-bold text-white pr-8">
                                    {faq.question}
                                </span>
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ChevronDown className="w-6 h-6 text-accent flex-shrink-0" />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-8 pb-6 text-silver/80 leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Still have questions CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <p className="text-silver/70 mb-4">Still have questions?</p>
                    <a
                        href="https://wa.me/94728382638"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-8 py-4 bg-[#25D366] text-white font-bold rounded-full hover:bg-[#25D366]/90 transition-all shadow-lg"
                    >
                        💬 Chat with us on WhatsApp
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
