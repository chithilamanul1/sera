'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Code2,
    Database,
    Globe,
    Cpu,
    Smartphone,
    Cloud,
    Shield,
    Zap
} from 'lucide-react';


export function FloatingTechStack() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
            {/* Inner Orbit */}
            <OrbitingIcon Icon={Code2} radius={140} duration={30} delay={0} initialAngle={0} />
            <OrbitingIcon Icon={Database} radius={140} duration={30} delay={0} initialAngle={120} />
            <OrbitingIcon Icon={Cpu} radius={140} duration={30} delay={0} initialAngle={240} />

            {/* Middle Orbit */}
            <OrbitingIcon Icon={Globe} radius={240} duration={45} delay={0} initialAngle={60} reverse />
            <OrbitingIcon Icon={Smartphone} radius={240} duration={45} delay={0} initialAngle={180} reverse />
            <OrbitingIcon Icon={Cloud} radius={240} duration={45} delay={0} initialAngle={300} reverse />

            {/* Outer Orbit */}
            <OrbitingIcon Icon={Shield} radius={340} duration={60} delay={0} initialAngle={0} />
            <OrbitingIcon Icon={Zap} radius={340} duration={60} delay={0} initialAngle={120} />

            {/* Decorative Rings */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] dark:opacity-10 pointer-events-none">
                <div className="w-[280px] h-[280px] rounded-full border border-zinc-900 dark:border-white" />
                <div className="w-[480px] h-[480px] rounded-full border border-zinc-900 dark:border-white" />
                <div className="w-[680px] h-[680px] rounded-full border border-zinc-900 dark:border-white" />
            </div>
        </div>
    );
}

function OrbitingIcon({
    Icon,
    radius,
    duration,
    delay,
    initialAngle,
    reverse = false
}: {
    Icon: React.ComponentType<{ className?: string }>,
    radius: number,
    duration: number,
    delay: number,
    initialAngle: number,
    reverse?: boolean
}) {
    return (
        <motion.div
            className="absolute left-1/2 top-1/2"
            animate={{ rotate: reverse ? -360 : 360 }}
            initial={{ rotate: initialAngle }}
            transition={{ duration, repeat: Infinity, ease: "linear", delay }}
            style={{ width: radius * 2, height: radius * 2, x: '-50%', y: '-50%' }}
        >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                    className="w-12 h-12 md:w-16 md:h-16 bg-white/40 dark:bg-black/40 backdrop-blur-md border border-zinc-200 dark:border-white/10 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.1)] dark:shadow-[0_0_30px_rgba(59,130,246,0.2)] group hover:bg-white/10 transition-colors"
                    animate={{ rotate: reverse ? 360 : -360 }}
                    initial={{ rotate: -initialAngle }}
                    transition={{ duration, repeat: Infinity, ease: "linear", delay }}
                >
                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-zinc-900/70 dark:text-white/70 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
                </motion.div>
            </div>
        </motion.div>
    );
}
