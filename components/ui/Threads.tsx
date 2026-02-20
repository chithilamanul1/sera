'use client';

import { useEffect, useRef } from 'react';

interface ThreadsProps {
    color?: number[]; // [r, g, b] normalized 0-1
    amplitude?: number;
    distance?: number;
    enableMouseInteraction?: boolean;
}

export function Threads({
    color = [0.32, 0.15, 1],
    amplitude = 1,
    distance = 0,
    enableMouseInteraction = true
}: ThreadsProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let time = 0;
        let width = 0;
        let height = 0;

        const resize = () => {
            width = canvas.offsetWidth;
            height = canvas.offsetHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', resize);
        resize();

        const handleMouseMove = (e: MouseEvent) => {
            if (!enableMouseInteraction) return;
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        if (enableMouseInteraction) {
            window.addEventListener('mousemove', handleMouseMove);
        }

        const [r, g, b] = color.map(c => Math.round(c * 255));
        const colorString = `rgb(${r}, ${g}, ${b})`;

        const animate = () => {
            time += 0.01;
            ctx.clearRect(0, 0, width, height);

            // Draw threads
            const gap = distance > 0 ? distance : 5; // Default gap if distance is 0
            const numLines = 50;

            ctx.globalCompositeOperation = 'lighter';

            for (let i = 0; i < numLines; i++) {
                ctx.beginPath();
                const yBase = height * 0.5 + (i - numLines / 2) * gap * 2;

                // Opacity falls off towards edges of the bundle
                const alpha = Math.max(0, 1 - Math.abs(i - numLines / 2) / (numLines / 2));
                ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
                ctx.lineWidth = 1.5;

                for (let x = 0; x < width; x += 10) {
                    // Base wave
                    let y = yBase + Math.sin(x * 0.01 + time + i * 0.1) * 20 * amplitude;

                    // Mouse interaction
                    if (enableMouseInteraction) {
                        const dx = x - mouseRef.current.x;
                        const dy = y - mouseRef.current.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const maxDist = 300;

                        if (dist < maxDist) {
                            const force = (1 - dist / maxDist) * 50;
                            y += (dy / dist) * force;
                        }
                    }

                    if (x === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                ctx.stroke();
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            if (enableMouseInteraction) {
                window.removeEventListener('mousemove', handleMouseMove);
            }
            cancelAnimationFrame(animationFrameId);
        };
    }, [color, amplitude, distance, enableMouseInteraction]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
        />
    );
}
