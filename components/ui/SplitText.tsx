'use client';

import { motion } from 'framer-motion';

interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
    animationFrom?: any;
    animationTo?: any;
}

export function SplitText({
    text,
    className = '',
    delay = 0,
    animationFrom = { opacity: 0, y: 20 },
    animationTo = { opacity: 1, y: 0 }
}: SplitTextProps) {
    const words = text.split(' ');

    return (
        <span className={`inline-flex flex-wrap ${className}`}>
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden py-1 mr-[0.4em] last:mr-0">
                    <motion.span
                        initial={animationFrom}
                        whileInView={animationTo}
                        transition={{
                            duration: 0.8,
                            delay: (delay / 1000) + i * 0.05,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        viewport={{ once: true }}
                        className="inline-block"
                    >
                        {word.replace(/ /g, "\u00A0")}
                    </motion.span>
                </span>
            ))}
        </span>
    );
}
