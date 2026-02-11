'use client';

import { motion } from 'framer-motion';

interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
}

export function SplitText({ text, className = '', delay = 0 }: SplitTextProps) {
    const words = text.split(' ');

    return (
        <h2 className={`overflow-hidden flex flex-wrap gap-2 ${className}`}>
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden">
                    <motion.span
                        initial={{ y: '100%' }}
                        whileInView={{ y: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: delay + i * 0.1,
                            ease: [0.33, 1, 0.68, 1],
                        }}
                        viewport={{ once: true }}
                        className="inline-block"
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </h2>
    );
}
