'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

interface MagicBentoProps {
    children?: React.ReactNode;
    width?: string | number;
    height?: string | number;
    className?: string;
    textAutoHide?: boolean;
    enableStars?: boolean;
    enableSpotlight?: boolean;
    enableBorderGlow?: boolean;
    enableTilt?: boolean;
    enableMagnetism?: boolean;
    clickEffect?: boolean;
    spotlightRadius?: number;
    particleCount?: number;
    glowColor?: string; // e.g., "132, 0, 255"
    disableAnimations?: boolean;
    title?: string;
    subtitle?: string;
}

export default function MagicBento({
    children,
    width = '100%',
    height = '100%',
    className = '',
    textAutoHide = false,
    enableStars = false,
    enableSpotlight = false,
    enableBorderGlow = false,
    enableTilt = false,
    enableMagnetism = false,
    clickEffect = false,
    spotlightRadius = 400,
    particleCount = 12,
    glowColor = "132, 0, 255",
    disableAnimations = false,
    title,
    subtitle
}: MagicBentoProps) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    // Tilt State
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 30 });
    const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 30 });

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        if (disableAnimations) return;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();

        // Spotlight & Glow
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);

        // Tilt & Magnetism
        if (enableTilt || enableMagnetism) {
            const centerX = left + width / 2;
            const centerY = top + height / 2;
            const offsetX = clientX - centerX;
            const offsetY = clientY - centerY;

            if (enableTilt) {
                rotateX.set((offsetY / height) * -20); // Max tilt deg
                rotateY.set((offsetX / width) * 20);
            }
            if (enableMagnetism) {
                x.set(offsetX * 0.1);
                y.set(offsetY * 0.1);
            }
        }
        setIsHovered(true);
    }

    function handleMouseLeave() {
        if (disableAnimations) return;
        setIsHovered(false);
        rotateX.set(0);
        rotateY.set(0);
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            style={{
                width,
                height,
                perspective: 1000,
                x: enableMagnetism ? x : 0,
                y: enableMagnetism ? y : 0,
            }}
            className={`relative group ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                style={{
                    rotateX: enableTilt ? rotateX : 0,
                    rotateY: enableTilt ? rotateY : 0,
                    transformStyle: "preserve-3d",
                }}
                className="relative w-full h-full bg-white dark:bg-zinc-900/40 backdrop-blur-xl border border-zinc-200 dark:border-white/10 rounded-3xl overflow-hidden transition-colors duration-500"
                whileTap={clickEffect ? { scale: 0.98 } : {}}
            >
                {/* Border Glow */}
                {enableBorderGlow && (
                    <motion.div
                        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                        style={{
                            background: useMotionTemplate`
                                radial-gradient(
                                    600px circle at ${mouseX}px ${mouseY}px,
                                    rgba(${glowColor}, 0.15),
                                    transparent 80%
                                )
                            `,
                        }}
                    />
                )}

                {/* Spotlight */}
                {enableSpotlight && (
                    <div
                        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                        style={{
                            background: `radial-gradient(${spotlightRadius}px circle at var(--mouse-x) var(--mouse-y), rgba(${glowColor}, 0.06), transparent 80%)`,
                        }}
                    >
                        {/* Motion Template fix for style prop */}
                        <motion.div
                            className="absolute inset-0"
                            style={{
                                background: useMotionTemplate`
                                    radial-gradient(
                                        ${spotlightRadius}px circle at ${mouseX}px ${mouseY}px,
                                        rgba(${glowColor}, 0.06),
                                        transparent 80%
                                    )
                                `
                            }}
                        />
                    </div>
                )}

                {/* Stars / Particles */}
                {enableStars && !disableAnimations && (
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[...Array(particleCount)].map((_, i) => (
                            <Star key={i} mouseX={mouseX} mouseY={mouseY} isHovered={isHovered} />
                        ))}
                    </div>
                )}

                {/* Content */}
                <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                    <div>{children}</div>

                    {(title || subtitle) && (
                        <div className={`mt-4 transition-all duration-300 ${textAutoHide ? (isHovered ? 'opacity-100 translate-y-0' : 'opacity-70 translate-y-2') : ''}`}>
                            {title && <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-1 uppercase italic">{title}</h3>}
                            {subtitle && <p className="text-sm text-zinc-800 dark:text-zinc-300 font-medium">{subtitle}</p>}
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

// Helper Component for Stars
import { MotionValue } from 'framer-motion';

// ... existing imports ...

// Helper Component for Stars
function Star({ mouseX, mouseY, isHovered }: { mouseX: MotionValue<number>, mouseY: MotionValue<number>, isHovered: boolean }) {
    const [randomValues, setRandomValues] = useState({ x: 0, y: 0, size: 0, delay: 0, duration: 0 });

    useEffect(() => {
        setRandomValues({
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            delay: Math.random() * 2,
            duration: 2 + Math.random() * 3
        });
    }, []);

    // ... rest of component


    return (
        <motion.div
            className="absolute bg-white rounded-full opacity-20"
            style={{
                left: `${randomValues.x}%`,
                top: `${randomValues.y}%`,
                width: randomValues.size,
                height: randomValues.size,
            }}
            animate={{
                opacity: isHovered ? [0.2, 0.8, 0.2] : 0.2,
                scale: isHovered ? [1, 1.5, 1] : 1,
            }}
            transition={{
                duration: randomValues.duration,
                repeat: Infinity,
                delay: randomValues.delay,
            }}
        />
    );
}
