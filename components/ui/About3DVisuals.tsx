'use client';

import React, { useRef, useMemo, Suspense } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Canvas = dynamic(
    () => import('@react-three/fiber').then((mod) => mod.Canvas),
    { ssr: false }
);

/* ═══════════════════════════════════════════════════
   3D MODELS (ADAPTED FROM DEVICESHOWCASE3D)
   ═══════════════════════════════════════════════════ */

// Premium UI Screen Component - Clean & Refined
function ScreenPlane({ type = "laptop", width, height, position = [0, 0, 0], rotation = [0, 0, 0] }: any) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            // Subtle pulsing glow effect
            const pulse = Math.sin(state.clock.elapsedTime * 1.2) * 0.08 + 0.92;
            (meshRef.current.material as any).emissiveIntensity = pulse * 0.25;
        }
    });

    // Color schemes for each device type
    const colorSchemes: any = {
        laptop: {
            bg: '#0a1929',
            primary: '#2196f3',
            secondary: '#1976d2',
            accent: '#64b5f6',
            glow: '#90caf9'
        },
        monitor: {
            bg: '#1a0f2e',
            primary: '#9c27b0',
            secondary: '#7b1fa2',
            accent: '#ba68c8',
            glow: '#ce93d8'
        },
        phone: {
            bg: '#0d1f12',
            primary: '#4caf50',
            secondary: '#388e3c',
            accent: '#81c784',
            glow: '#a5d6a7'
        }
    };

    const colors = colorSchemes[type] || colorSchemes.laptop;

    return (
        <group position={position} rotation={rotation}>
            {/* Dark background base */}
            <mesh position={[0, 0, -0.001]}>
                <planeGeometry args={[width, height]} />
                <meshStandardMaterial
                    color={colors.bg}
                    metalness={0.2}
                    roughness={0.8}
                />
            </mesh>

            {/* Main glowing screen with gradient effect */}
            <mesh ref={meshRef}>
                <planeGeometry args={[width * 0.96, height * 0.96]} />
                <meshStandardMaterial
                    color={colors.primary}
                    emissive={colors.primary}
                    emissiveIntensity={0.25}
                    metalness={0.1}
                    roughness={0.6}
                    transparent
                    opacity={0.15}
                />
            </mesh>

            {/* Subtle grid - much cleaner */}
            {Array.from({ length: 4 }).map((_, i) => (
                <mesh key={`v-line-${i}`} position={[-width * 0.35 + i * (width * 0.25), 0, 0.001]}>
                    <planeGeometry args={[0.001, height * 0.9]} />
                    <meshBasicMaterial color={colors.accent} opacity={0.08} transparent />
                </mesh>
            ))}
            {Array.from({ length: 3 }).map((_, i) => (
                <mesh key={`h-line-${i}`} position={[0, -height * 0.25 + i * (height * 0.3), 0.001]}>
                    <planeGeometry args={[width * 0.9, 0.001]} />
                    <meshBasicMaterial color={colors.accent} opacity={0.08} transparent />
                </mesh>
            ))}

            {/* Top header bar with glow */}
            <mesh position={[0, height * 0.42, 0.002]}>
                <planeGeometry args={[width * 0.9, height * 0.05]} />
                <meshStandardMaterial
                    color={colors.secondary}
                    emissive={colors.primary}
                    emissiveIntensity={0.3}
                    transparent
                    opacity={0.4}
                />
            </mesh>

            {/* Clean UI Card - Left */}
            <mesh position={[-width * 0.22, height * 0.15, 0.002]}>
                <planeGeometry args={[width * 0.38, height * 0.35]} />
                <meshStandardMaterial
                    color={colors.bg}
                    emissive={colors.primary}
                    emissiveIntensity={0.1}
                    transparent
                    opacity={0.6}
                />
            </mesh>

            {/* Clean UI Card - Right */}
            <mesh position={[width * 0.22, height * 0.15, 0.002]}>
                <planeGeometry args={[width * 0.38, height * 0.35]} />
                <meshStandardMaterial
                    color={colors.bg}
                    emissive={colors.primary}
                    emissiveIntensity={0.1}
                    transparent
                    opacity={0.6}
                />
            </mesh>

            {/* Clean data visualization bars */}
            {Array.from({ length: 6 }).map((_, i) => {
                const barHeight = (Math.sin(i * 1.2 + 0.5) * 0.4 + 0.6) * height * 0.22;
                return (
                    <mesh
                        key={`bar-${i}`}
                        position={[-width * 0.28 + i * (width * 0.11), -height * 0.25 - barHeight / 2, 0.003]}
                    >
                        <planeGeometry args={[width * 0.05, barHeight]} />
                        <meshStandardMaterial
                            color={colors.accent}
                            emissive={colors.glow}
                            emissiveIntensity={0.4}
                            transparent
                            opacity={0.7}
                        />
                    </mesh>
                );
            })}

            {/* Elegant glowing accent line at bottom */}
            <mesh position={[0, -height * 0.44, 0.004]}>
                <planeGeometry args={[width * 0.85, 0.003]} />
                <meshStandardMaterial
                    color={colors.glow}
                    emissive={colors.glow}
                    emissiveIntensity={0.8}
                />
            </mesh>

            {/* Clean status indicators */}
            {[0, 1, 2].map((i) => (
                <mesh key={`indicator-${i}`} position={[-width * 0.4 + i * 0.06, height * 0.42, 0.004]}>
                    <circleGeometry args={[0.012, 16]} />
                    <meshStandardMaterial
                        color={i === 0 ? colors.glow : colors.accent}
                        emissive={i === 0 ? colors.glow : colors.accent}
                        emissiveIntensity={i === 0 ? 0.8 : 0.3}
                        transparent
                        opacity={0.9}
                    />
                </mesh>
            ))}

            {/* Ambient glow around the screen */}
            <mesh position={[0, 0, -0.002]}>
                <planeGeometry args={[width * 1.1, height * 1.1]} />
                <meshBasicMaterial
                    color={colors.primary}
                    transparent
                    opacity={0.05}
                />
            </mesh>
        </group>
    );
}

function Laptop({ scrollRotation }: { scrollRotation: any }) {
    const groupRef = useRef<THREE.Group>(null);
    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y = scrollRotation.get();
        }
    });

    return (
        <group ref={groupRef} position={[0, -0.2, 0]}>
            <group position={[0, 0.45, -0.02]} rotation={[-0.15, 0, 0]}>
                <mesh position={[0, 0, -0.015]}>
                    <boxGeometry args={[1.6, 1.05, 0.025]} />
                    <meshStandardMaterial color="#111" metalness={0.8} roughness={0.3} />
                </mesh>
                <ScreenPlane type="laptop" width={1.42} height={0.88} position={[0, 0, 0.005]} />
            </group>
            <group position={[0, -0.08, 0.35]}>
                <mesh>
                    <boxGeometry args={[1.6, 0.06, 0.95]} />
                    <meshStandardMaterial color="#111" metalness={0.8} roughness={0.3} />
                </mesh>
            </group>
        </group>
    );
}

function Monitor({ scrollRotation }: { scrollRotation: any }) {
    const groupRef = useRef<THREE.Group>(null);
    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y = scrollRotation.get();
        }
    });

    return (
        <group ref={groupRef} position={[0, -0.2, 0]}>
            <group position={[0, 0.3, 0]}>
                <mesh position={[0, 0, -0.03]}>
                    <boxGeometry args={[1.8, 1.15, 0.05]} />
                    <meshStandardMaterial color="#111" metalness={0.8} roughness={0.3} />
                </mesh>
                <ScreenPlane type="monitor" width={1.62} height={0.97} position={[0, 0, 0.003]} />
            </group>
            <mesh position={[0, -0.22, 0.05]}>
                <boxGeometry args={[0.12, 0.45, 0.06]} />
                <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
            </mesh>
            <mesh position={[0, -0.45, 0.15]}>
                <boxGeometry args={[0.7, 0.02, 0.35]} />
                <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.3} />
            </mesh>
        </group>
    );
}

function Phone({ scrollRotation }: { scrollRotation: any }) {
    const groupRef = useRef<THREE.Group>(null);
    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y = scrollRotation.get();
        }
    });

    return (
        <group ref={groupRef} position={[0, 0, 0]}>
            <mesh>
                <boxGeometry args={[0.55, 1.1, 0.04]} />
                <meshStandardMaterial color="#111" metalness={0.8} roughness={0.3} />
            </mesh>
            <ScreenPlane type="phone" width={0.46} height={0.95} position={[0, 0, 0.022]} />
        </group>
    );
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════ */

export function About3DVisuals() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Rotation values for each model based on their specific scroll range
    const laptopRot = useTransform(scrollYProgress, [0, 0.3], [0, Math.PI * 2]);
    const monitorRot = useTransform(scrollYProgress, [0.35, 0.65], [0, Math.PI * 2]);
    const phoneRot = useTransform(scrollYProgress, [0.7, 1], [0, Math.PI * 2]);

    // Opacity/Visibility for models
    const laptopOpacity = useTransform(scrollYProgress, [0, 0.25, 0.35], [1, 1, 0]);
    const monitorOpacity = useTransform(scrollYProgress, [0.3, 0.35, 0.6, 0.7], [0, 1, 1, 0]);
    const phoneOpacity = useTransform(scrollYProgress, [0.65, 0.7, 1], [0, 1, 1]);

    // Text content animations
    const textY = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section ref={containerRef} className="relative h-[400vh] bg-black">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* 3D Scene */}
                <div className="absolute inset-0 z-0">
                    <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[10, 10, 5]} intensity={1} />
                        <pointLight position={[-10, -10, -10]} color="#3b82f6" intensity={0.5} />
                        <Suspense fallback={null}>
                            {/* Models are conditionally rendered or moved based on opacity for performance */}
                            <group>
                                {laptopOpacity.get() > 0 && <Laptop scrollRotation={laptopRot} />}
                                {monitorOpacity.get() > 0 && <Monitor scrollRotation={monitorRot} />}
                                {phoneOpacity.get() > 0 && <Phone scrollRotation={phoneRot} />}
                            </group>
                        </Suspense>
                    </Canvas>
                </div>

                {/* Overlays */}
                <div className="absolute inset-0 z-10 pointer-events-none px-6">
                    <div className="max-w-7xl mx-auto h-full flex flex-col justify-center">

                        {/* Section 1: Engineering */}
                        <motion.div
                            style={{ opacity: useTransform(scrollYProgress, [0, 0.1, 0.25], [1, 1, 0]) }}
                            className="absolute inset-x-6 md:inset-x-0"
                        >
                            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black italic uppercase tracking-tighter mb-4 leading-none">
                                Precision <br /> <span className="text-blue-500">Engineering.</span>
                            </h2>
                            <p className="text-zinc-500 text-lg md:text-xl max-w-md font-medium leading-relaxed">
                                We don't just write code. We architect high-performance digital engines tailored for global scale.
                            </p>
                        </motion.div>

                        {/* Section 2: Scale */}
                        <motion.div
                            style={{ opacity: useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]) }}
                            className="absolute inset-x-6 md:inset-x-0"
                        >
                            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black italic uppercase tracking-tighter mb-4 leading-none">
                                Strategic <br /> <span className="text-purple-500">Architecture.</span>
                            </h2>
                            <p className="text-zinc-500 text-lg md:text-xl max-w-md font-medium leading-relaxed">
                                Our systems are built to handle millions of requests with near-zero latency and bank-grade security.
                            </p>
                        </motion.div>

                        {/* Section 3: Experience */}
                        <motion.div
                            style={{ opacity: useTransform(scrollYProgress, [0.75, 0.85], [0, 1]) }}
                            className="absolute inset-x-6 md:inset-x-0"
                        >
                            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black italic uppercase tracking-tighter mb-4 leading-none">
                                Seamless <br /> <span className="text-emerald-500">Intelligence.</span>
                            </h2>
                            <p className="text-zinc-500 text-lg md:text-xl max-w-md font-medium leading-relaxed">
                                Minimalist design meeting complex AI-driven workflows for a truly premium user experience.
                            </p>
                        </motion.div>

                    </div>
                </div>

                {/* Progress Indicator */}
                <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
                    {[0.1, 0.5, 0.9].map((p, i) => (
                        <motion.div
                            key={i}
                            className={`w-1 h-12 rounded-full border border-white/10 ${scrollYProgress.get() > p - 0.1 && scrollYProgress.get() < p + 0.1 ? 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white/5'}`}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}
