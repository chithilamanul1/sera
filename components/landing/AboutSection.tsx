'use client';

import { motion } from 'framer-motion';

export default function AboutSection() {
    return (
        <section id="about" className="min-h-screen py-20 px-4 flex items-center">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <h2 className="text-5xl md:text-6xl font-heading font-bold glow-text">
                            About Seranex
                        </h2>

                        <p className="text-silver/80 text-lg leading-relaxed">
                            We are a next-generation digital agency specializing in creating
                            cutting-edge web and mobile solutions that help businesses scale
                            and succeed in the digital world.
                        </p>

                        <p className="text-silver/70 leading-relaxed">
                            With a team of passionate developers, designers, and strategists,
                            we transform ideas into reality. Our mission is to deliver
                            exceptional digital experiences that not only meet but exceed
                            our clients' expectations.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 pt-8">
                            {[
                                { number: '50+', label: 'Projects' },
                                { number: '30+', label: 'Clients' },
                                { number: '5+', label: 'Years' },
                            ].map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="text-4xl font-heading font-bold glow-text mb-2">
                                        {stat.number}
                                    </div>
                                    <div className="text-silver/60 text-sm">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Visual Element */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="glass p-8 rounded-3xl">
                            <div className="space-y-4">
                                {['Innovation', 'Quality', 'Reliability', 'Excellence'].map((value, index) => (
                                    <motion.div
                                        key={value}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                                        className="flex items-center gap-4"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-glow-silver" />
                                        <span className="text-silver font-heading text-xl">{value}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                            className="absolute -top-10 -right-10 w-32 h-32 border border-glow-silver/20 rounded-full"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                            className="absolute -bottom-10 -left-10 w-24 h-24 border border-glow-silver/20 rounded-full"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
