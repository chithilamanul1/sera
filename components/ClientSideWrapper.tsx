'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const FloatingLines = dynamic(() => import('@/components/ui/FloatingLines').then(mod => mod.FloatingLines), { ssr: false });
const SeraGlobalChat = dynamic(() => import('@/components/sidebar/SeraGlobalChat').then(mod => mod.SeraGlobalChat), { ssr: false });

export function ClientSideWrapper({ children }: { children: React.ReactNode }) {
    return (
        <>
            <FloatingLines
                linesGradient={["#000000", "#808080", "#f3f0ff"]}
                animationSpeed={1}
                interactive
                bendRadius={5}
                bendStrength={-0.5}
                mouseDamping={0.05}
                parallax
                parallaxStrength={0.45}
            />
            {children}
            <SeraGlobalChat />
        </>
    );
}
