'use client';

import { useRef, useState, useMemo, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Canvas = dynamic(
    () => import('@react-three/fiber').then((mod) => mod.Canvas),
    { ssr: false }
);

/* ═══════════════════════════════════════════════════
   SHARED: Texture-mapped Screen
   ═══════════════════════════════════════════════════ */

function ScreenPlane({
    imageUrl,
    width,
    height,
    position = [0, 0, 0],
    rotation = [0, 0, 0]
}: {
    imageUrl: string;
    width: number;
    height: number;
    position?: [number, number, number];
    rotation?: [number, number, number];
}) {
    const texture = useMemo(() => {
        const loader = new THREE.TextureLoader();
        const tex = loader.load(imageUrl);
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        return tex;
    }, [imageUrl]);

    return (
        <mesh position={position} rotation={rotation}>
            <planeGeometry args={[width, height]} />
            <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
    );
}

/* ═══════════════════════════════════════════════════
   LAPTOP MODEL
   ═══════════════════════════════════════════════════ */

function LaptopModel({ imageUrl }: { imageUrl: string }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            // Gentle floating
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.03;
        }
    });

    const bodyColor = '#111111';
    const accentColor = '#1a1a1a';

    return (
        <group ref={groupRef} rotation={[0.15, -0.3, 0]}>
            {/* === LID (Screen Panel) === */}
            <group position={[0, 0.45, -0.02]} rotation={[-0.15, 0, 0]}>
                {/* Lid back shell */}
                <mesh position={[0, 0, -0.015]}>
                    <boxGeometry args={[1.6, 1.05, 0.025]} />
                    <meshStandardMaterial color={bodyColor} metalness={0.8} roughness={0.3} />
                </mesh>
                {/* Screen bezel */}
                <mesh position={[0, 0, 0.001]}>
                    <boxGeometry args={[1.52, 0.97, 0.005]} />
                    <meshStandardMaterial color="#050505" metalness={0.5} roughness={0.8} />
                </mesh>
                {/* Screen content (project image) */}
                <ScreenPlane
                    imageUrl={imageUrl}
                    width={1.42}
                    height={0.88}
                    position={[0, 0, 0.005]}
                />
                {/* Screen glow */}
                <mesh position={[0, 0, -0.02]}>
                    <planeGeometry args={[1.8, 1.2]} />
                    <meshBasicMaterial color="#3b82f6" transparent opacity={0.03} />
                </mesh>
            </group>

            {/* === BASE (Keyboard) === */}
            <group position={[0, -0.08, 0.35]}>
                {/* Base body */}
                <mesh>
                    <boxGeometry args={[1.6, 0.06, 0.95]} />
                    <meshStandardMaterial color={bodyColor} metalness={0.8} roughness={0.3} />
                </mesh>
                {/* Keyboard area */}
                <mesh position={[0, 0.032, -0.05]}>
                    <boxGeometry args={[1.3, 0.004, 0.55]} />
                    <meshStandardMaterial color={accentColor} metalness={0.3} roughness={0.9} />
                </mesh>
                {/* Trackpad */}
                <mesh position={[0, 0.032, 0.28]}>
                    <boxGeometry args={[0.5, 0.003, 0.3]} />
                    <meshStandardMaterial color="#1e1e1e" metalness={0.4} roughness={0.7} />
                </mesh>
                {/* Keyboard grid lines */}
                {Array.from({ length: 4 }).map((_, row) =>
                    Array.from({ length: 12 }).map((_, col) => (
                        <mesh
                            key={`key-${row}-${col}`}
                            position={[
                                -0.57 + col * 0.098,
                                0.034,
                                -0.27 + row * 0.12,
                            ]}
                        >
                            <boxGeometry args={[0.08, 0.002, 0.09]} />
                            <meshStandardMaterial color="#222" metalness={0.2} roughness={0.9} />
                        </mesh>
                    ))
                )}
            </group>

            {/* === HINGE === */}
            <mesh position={[0, -0.05, -0.12]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.025, 0.025, 1.5, 16]} />
                <meshStandardMaterial color="#222" metalness={0.9} roughness={0.2} />
            </mesh>
        </group>
    );
}

/* ═══════════════════════════════════════════════════
   DESKTOP MONITOR MODEL
   ═══════════════════════════════════════════════════ */

function MonitorModel({ imageUrl }: { imageUrl: string }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6 + 1) * 0.03;
        }
    });

    return (
        <group ref={groupRef} rotation={[0.05, -0.2, 0]}>
            {/* === MONITOR PANEL === */}
            <group position={[0, 0.3, 0]}>
                {/* Back shell */}
                <mesh position={[0, 0, -0.03]}>
                    <boxGeometry args={[1.8, 1.15, 0.05]} />
                    <meshStandardMaterial color="#111" metalness={0.8} roughness={0.3} />
                </mesh>
                {/* Bezel */}
                <mesh position={[0, 0, -0.003]}>
                    <boxGeometry args={[1.72, 1.07, 0.01]} />
                    <meshStandardMaterial color="#050505" metalness={0.5} roughness={0.8} />
                </mesh>
                {/* Screen content */}
                <ScreenPlane
                    imageUrl={imageUrl}
                    width={1.62}
                    height={0.97}
                    position={[0, 0, 0.003]}
                />
                {/* Screen glow */}
                <mesh position={[0, 0, -0.04]}>
                    <planeGeometry args={[2.0, 1.4]} />
                    <meshBasicMaterial color="#6366f1" transparent opacity={0.03} />
                </mesh>
            </group>

            {/* === STAND NECK === */}
            <mesh position={[0, -0.22, 0.05]}>
                <boxGeometry args={[0.12, 0.45, 0.06]} />
                <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
            </mesh>

            {/* === STAND BASE === */}
            <mesh position={[0, -0.45, 0.15]} rotation={[-0.1, 0, 0]}>
                <boxGeometry args={[0.7, 0.02, 0.35]} />
                <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.3} />
            </mesh>
        </group>
    );
}

/* ═══════════════════════════════════════════════════
   PHONE MODEL
   ═══════════════════════════════════════════════════ */

function PhoneModel({ imageUrl }: { imageUrl: string }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.7 + 2) * 0.04;
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1 - 0.2;
        }
    });

    return (
        <group ref={groupRef} rotation={[0.1, -0.2, 0]}>
            {/* === PHONE BODY === */}
            <mesh>
                <boxGeometry args={[0.55, 1.1, 0.04]} />
                <meshStandardMaterial color="#111" metalness={0.8} roughness={0.3} />
            </mesh>

            {/* === SCREEN BEZEL === */}
            <mesh position={[0, 0, 0.018]}>
                <boxGeometry args={[0.5, 1.03, 0.006]} />
                <meshStandardMaterial color="#050505" metalness={0.5} roughness={0.8} />
            </mesh>

            {/* Screen content */}
            <ScreenPlane
                imageUrl={imageUrl}
                width={0.46}
                height={0.95}
                position={[0, 0, 0.022]}
            />

            {/* === NOTCH === */}
            <mesh position={[0, 0.48, 0.022]}>
                <boxGeometry args={[0.18, 0.025, 0.005]} />
                <meshStandardMaterial color="#000" />
            </mesh>

            {/* === CAMERA BUMP === */}
            <mesh position={[-0.15, 0.4, -0.025]}>
                <boxGeometry args={[0.12, 0.18, 0.015]} />
                <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.3} />
            </mesh>
            {/* Camera lenses */}
            <mesh position={[-0.15, 0.44, -0.033]}>
                <cylinderGeometry args={[0.025, 0.025, 0.005, 16]} />
                <meshStandardMaterial color="#222" metalness={0.95} roughness={0.1} />
            </mesh>
            <mesh position={[-0.15, 0.36, -0.033]}>
                <cylinderGeometry args={[0.025, 0.025, 0.005, 16]} />
                <meshStandardMaterial color="#222" metalness={0.95} roughness={0.1} />
            </mesh>

            {/* Screen glow */}
            <mesh position={[0, 0, -0.03]}>
                <planeGeometry args={[0.8, 1.4]} />
                <meshBasicMaterial color="#06b6d4" transparent opacity={0.04} />
            </mesh>
        </group>
    );
}

/* ═══════════════════════════════════════════════════
   INTERACTIVE WRAPPER (tilt on hover)
   ═══════════════════════════════════════════════════ */

function InteractiveDevice({ children }: { children: React.ReactNode }) {
    const groupRef = useRef<THREE.Group>(null);
    const { viewport } = useThree();
    const mouse = useRef({ x: 0, y: 0 });

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += (mouse.current.x * 0.3 - groupRef.current.rotation.y) * 0.05;
            groupRef.current.rotation.x += (mouse.current.y * 0.15 - groupRef.current.rotation.x) * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Invisible plane for pointer tracking */}
            <mesh
                visible={false}
                onPointerMove={(e) => {
                    mouse.current.x = (e.point.x / viewport.width) * 2;
                    mouse.current.y = (e.point.y / viewport.height) * 2;
                }}
                onPointerLeave={() => {
                    mouse.current.x = 0;
                    mouse.current.y = 0;
                }}
            >
                <planeGeometry args={[20, 20]} />
                <meshBasicMaterial />
            </mesh>
            {children}
        </group>
    );
}

/* ═══════════════════════════════════════════════════
   SCENE LIGHTING
   ═══════════════════════════════════════════════════ */

function SceneLighting() {
    return (
        <>
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 5, 5]} intensity={0.6} color="#ffffff" />
            <directionalLight position={[-3, 2, -2]} intensity={0.2} color="#3b82f6" />
            <pointLight position={[0, -2, 3]} intensity={0.3} color="#6366f1" distance={10} />
        </>
    );
}

/* ═══════════════════════════════════════════════════
   MAIN EXPORT: DeviceShowcase3D
   ═══════════════════════════════════════════════════ */

export type DeviceType = 'laptop' | 'desktop' | 'phone';

interface DeviceShowcase3DProps {
    title: string;
    category: string;
    desc: string;
    imageUrl: string;
    link: string;
    tags: string[];
    device: DeviceType;
}

export function DeviceShowcase3D({
    title,
    category,
    desc,
    imageUrl,
    link,
    tags,
    device,
}: DeviceShowcase3DProps) {
    const [hovered, setHovered] = useState(false);

    const cameraZ = device === 'phone' ? 1.6 : 2.2;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative group"
        >
            <div
                className={`relative w-full rounded-3xl overflow-hidden border transition-all duration-500 ${hovered
                        ? 'border-blue-500/40 shadow-[0_0_60px_rgba(59,130,246,0.15)]'
                        : 'border-white/5 shadow-2xl'
                    }`}
                style={{ aspectRatio: device === 'phone' ? '3/4' : '16/10' }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {/* 3D Canvas */}
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-zinc-950 via-black to-zinc-900">
                    <Canvas
                        camera={{ position: [0, 0, cameraZ], fov: 45 }}
                        dpr={[1, 1.5]}
                        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                    >
                        <Suspense fallback={null}>
                            <SceneLighting />
                            <InteractiveDevice>
                                {device === 'laptop' && <LaptopModel imageUrl={imageUrl} />}
                                {device === 'desktop' && <MonitorModel imageUrl={imageUrl} />}
                                {device === 'phone' && <PhoneModel imageUrl={imageUrl} />}
                            </InteractiveDevice>
                        </Suspense>
                    </Canvas>
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                {/* Content overlay */}
                <div className="absolute inset-0 z-[2] p-6 md:p-8 flex flex-col justify-between pointer-events-none">
                    {/* Top: Category badge */}
                    <div className="flex justify-between items-start">
                        <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md border transition-all duration-500 ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                            } ${device === 'laptop'
                                ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                                : device === 'desktop'
                                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                                    : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                            }`}>
                            {category}
                        </span>
                        <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center backdrop-blur-md transition-all duration-500 ${hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                            }`}>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white">
                                <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>

                    {/* Bottom: Title + Desc + Tags */}
                    <div className={`transition-all duration-500 ${hovered ? 'translate-y-0' : 'translate-y-4'}`}>
                        <h3 className="text-2xl md:text-3xl font-black uppercase text-white mb-2 tracking-tight drop-shadow-lg">
                            {title}
                        </h3>
                        <p className={`text-zinc-300 text-sm max-w-md mb-4 leading-relaxed font-medium transition-opacity duration-500 ${hovered ? 'opacity-100' : 'opacity-0'
                            }`}>
                            {desc}
                        </p>
                        <div className={`flex flex-wrap gap-2 transition-all duration-500 delay-100 ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                            }`}>
                            {tags.map((t) => (
                                <span
                                    key={t}
                                    className="px-2.5 py-1 bg-white/5 backdrop-blur-md rounded-md text-[10px] font-mono uppercase text-white/70 border border-white/10"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Link */}
                <Link
                    href={link}
                    target={link.startsWith('http') ? '_blank' : undefined}
                    rel={link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="absolute inset-0 z-[3]"
                    aria-label={`View ${title}`}
                />
            </div>
        </motion.div>
    );
}
