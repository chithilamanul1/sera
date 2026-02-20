'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

/* Dynamically import Canvas to avoid SSR issues with Three.js */
const Canvas = dynamic(
    () => import('@react-three/fiber').then((mod) => mod.Canvas),
    { ssr: false }
);

interface Scene3DProps {
    children: React.ReactNode;
    className?: string;
}

export function Scene3D({ children, className }: Scene3DProps) {
    return (
        <div className={`relative w-full h-full ${className ?? ''}`}>
            <Canvas
                camera={{ position: [0, 0, 1.5], fov: 75 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                style={{ background: 'transparent' }}
            >
                <Suspense fallback={null}>
                    {children}
                </Suspense>
            </Canvas>
        </div>
    );
}
