'use client';

import { useRef, useMemo, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ─────────── CONFIG ─────────── */
const IS_LOW_END = typeof window !== 'undefined' && (window.innerWidth < 768 || navigator.hardwareConcurrency < 4);
const PARTICLE_COUNT = IS_LOW_END ? 1500 : 3500; // Reduced from 6000
const SPHERE_RADIUS = 1.8;

/* ─── Utility: generate uniformly distributed points inside a sphere ─── */
function generateSpherePoints(count: number, radius: number) {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const colorPalette = [
        new THREE.Color('#3b82f6'),
        new THREE.Color('#6366f1'),
        new THREE.Color('#ffffff'),
    ];

    for (let i = 0; i < count; i++) {
        const r = radius * Math.cbrt(Math.random());
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);

        const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;

        sizes[i] = Math.random() * 2 + 0.5;
    }
    return { positions, colors, sizes };
}

/* ─────────── PARTICLES (raw points) ─────────── */
function Particles() {
    const ref = useRef<THREE.Points>(null);

    const { positions, colors, sizes } = useMemo(
        () => generateSpherePoints(PARTICLE_COUNT, SPHERE_RADIUS),
        []
    );

    useFrame((_state, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.02; // Slower for stability
            ref.current.rotation.x += delta * 0.01;
        }
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                <bufferAttribute attach="attributes-color" args={[colors, 3]} />
                <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
            </bufferGeometry>
            <pointsMaterial
                vertexColors
                transparent
                opacity={IS_LOW_END ? 0.6 : 0.85}
                size={0.004}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

/* ─────────── WIREFRAME SPHERE (holographic accent) ─────────── */
function CyberSphere() {
    const ref = useRef<THREE.Mesh>(null);

    useFrame((_state, delta) => {
        if (ref.current) {
            ref.current.rotation.y -= delta * 0.08;
            ref.current.rotation.z += delta * 0.04;
        }
    });

    return (
        <mesh ref={ref}>
            <icosahedronGeometry args={[0.9, 1]} />
            <meshBasicMaterial
                color="#3b82f6"
                wireframe
                transparent
                opacity={0.08}
            />
        </mesh>
    );
}

/* ─────────── INNER RING (pulsing torus) ─────────── */
function InnerRing() {
    const ref = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.x = Math.PI / 2;
            ref.current.rotation.z = state.clock.elapsedTime * 0.15;
            const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
            ref.current.scale.setScalar(scale);
        }
    });

    return (
        <mesh ref={ref}>
            <torusGeometry args={[0.6, 0.003, 16, 100]} />
            <meshBasicMaterial
                color="#6366f1"
                transparent
                opacity={0.2}
            />
        </mesh>
    );
}

/* ─────────── MOUSE-REACTIVE CONTAINER ─────────── */
function MouseParallax({ children }: { children: React.ReactNode }) {
    const groupRef = useRef<THREE.Group>(null);
    const { viewport } = useThree();
    const target = useRef({ x: 0, y: 0 });

    const handlePointerMove = useCallback(
        (e: THREE.Event & { point: THREE.Vector3 }) => {
            target.current.x = (e.point.x / viewport.width) * 0.3;
            target.current.y = (e.point.y / viewport.height) * 0.3;
        },
        [viewport]
    );

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += (target.current.x - groupRef.current.rotation.y) * 0.05;
            groupRef.current.rotation.x += (target.current.y - groupRef.current.rotation.x) * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Invisible plane to capture pointer */}
            <mesh visible={false} onPointerMove={handlePointerMove}>
                <planeGeometry args={[50, 50]} />
                <meshBasicMaterial />
            </mesh>
            {children}
        </group>
    );
}

/* ─────────── MAIN EXPORT ─────────── */
export function StarField3D() {
    return (
        <>
            {/* Ambient light for minimal visibility */}
            <ambientLight intensity={0.1} />
            <MouseParallax>
                <Particles />
                <CyberSphere />
                <InnerRing />
            </MouseParallax>
        </>
    );
}
