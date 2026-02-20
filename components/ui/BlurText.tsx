'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';

interface BlurTextProps {
    text?: string;
    delay?: number;
    className?: string;
    animateBy?: 'words' | 'letters';
    direction?: 'top' | 'bottom';
    threshold?: number;
    rootMargin?: string;
}

export default function BlurText({
    text = '',
    delay = 50,
    className = '',
    animateBy = 'words', // 'words' or 'letters'
    direction = 'top', // 'top' or 'bottom'
    threshold = 0.1,
    rootMargin = '0px',
}: BlurTextProps) {
    const elements = animateBy === 'words' ? text.split(' ') : text.split('');

    const container: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: delay / 1000 },
        },
    };

    const item: Variants = {
        hidden: {
            filter: 'blur(10px)',
            opacity: 0,
            y: direction === 'top' ? -20 : 20,
        },
        visible: {
            filter: 'blur(0px)',
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.2, 0.65, 0.3, 0.9],
            },
        },
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: rootMargin }}
            variants={container}
            className={`${className} flex flex-wrap`}
        >
            {elements.map((el, index) => (
                <motion.span
                    key={index}
                    variants={item}
                    className="inline-block"
                >
                    {el === ' ' ? '\u00A0' : el}
                    {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
                </motion.span>
            ))}
        </motion.div>
    );
}
