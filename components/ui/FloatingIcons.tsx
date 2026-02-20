'use client';

import { motion } from 'framer-motion';
import {
    SiReact, SiNextdotjs, SiTypescript, SiTailwindcss,
    SiPrisma, SiMongodb, SiPostgresql, SiDocker,
    SiAmazon, SiGooglecloud, SiOpenai, SiPython
} from 'react-icons/si';
import { useEffect, useState } from 'react';

const icons = [
    { Icon: SiReact, color: '#61DAFB' },
    { Icon: SiNextdotjs, color: '#ffffff' },
    { Icon: SiTypescript, color: '#3178C6' },
    { Icon: SiTailwindcss, color: '#38B2AC' },
    { Icon: SiPrisma, color: '#ffffff' },
    { Icon: SiMongodb, color: '#47A248' },
    { Icon: SiPostgresql, color: '#336791' },
    { Icon: SiDocker, color: '#2496ED' },
    { Icon: SiAmazon, color: '#FF9900' },
    { Icon: SiGooglecloud, color: '#4285F4' },
    { Icon: SiOpenai, color: '#ffffff' },
    { Icon: SiPython, color: '#3776AB' },
];

export function FloatingIcons() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {icons.map((item, i) => (
                <FloatingIcon key={i} Icon={item.Icon} color={item.color} />
            ))}
        </div>
    );
}

function FloatingIcon({ Icon, color }: { Icon: any, color: string }) {
    const [randomValues, setRandomValues] = useState<{ x: number, delay: number, duration: number } | null>(null);

    useEffect(() => {
        setRandomValues({
            x: Math.random() * 100,
            delay: Math.random() * 5,
            duration: 10 + Math.random() * 10
        });
    }, []);

    if (!randomValues) return null;

    return (
        <motion.div
            initial={{ y: '110vh', x: `${randomValues.x}vw`, opacity: 0, scale: 0.5 }}
            animate={{
                y: '-10vh',
                opacity: [0, 1, 1, 0],
                rotate: [0, 360]
            }}
            transition={{
                duration: randomValues.duration,
                repeat: Infinity,
                delay: randomValues.delay,
                ease: 'linear'
            }}
            className="absolute"
        >
            <Icon className="text-4xl md:text-6xl opacity-20" style={{ color }} />
        </motion.div>
    );
}
