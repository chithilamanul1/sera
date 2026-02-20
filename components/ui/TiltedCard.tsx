'use client';

import { useRef, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TiltedCardProps {
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
    axis?: 'x' | 'y' | 'both';
    scale?: number;
}

export function TiltedCard({
    children,
    className = '',
    containerClassName = '',
    axis = 'both',
    scale = 1.02,
}: TiltedCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

    const handleMouseMove = (e: MouseEvent) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={cn(
                'relative h-full w-full transition-all duration-200 ease-out',
                containerClassName
            )}
            style={{
                transformStyle: 'preserve-3d',
                rotateX: axis === 'x' || axis === 'both' ? rotateX : 0,
                rotateY: axis === 'y' || axis === 'both' ? rotateY : 0,
            }}
            whileHover={{ scale }}
        >
            <div
                className={cn('h-full w-full', className)}
                style={{ transform: 'translateZ(50px)', transformStyle: 'preserve-3d' }}
            >
                {children}
            </div>
        </motion.div>
    );
}
