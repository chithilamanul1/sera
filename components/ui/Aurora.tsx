'use client';

import { useEffect, useRef } from 'react';

interface AuroraProps {
    colorStops: string[];
    amplitude?: number;
    blend?: number;
    speed?: number;
}

export function Aurora({
    colorStops = ["#5227FF", "#007bff", "#a690fe"],
    amplitude = 1,
    blend = 0.5,
    speed = 0.5
}: AuroraProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let time = 0;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        const animate = () => {
            time += 0.005 * speed;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Simple wave simulation for "Aurora" effect
            // We use multiple gradients moving in sine waves

            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

            // Map colors to stops with some movement
            colorStops.forEach((color, i) => {
                const offset = (i / (colorStops.length - 1));
                // Add some wave movement to the stops
                const stop = Math.max(0, Math.min(1, offset + Math.sin(time + i) * 0.1 * amplitude));
                gradient.addColorStop(stop, color);
            });

            ctx.fillStyle = gradient;
            ctx.filter = `blur(${60 * blend}px)`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.filter = 'none';

            // Add some "ribbons"
            ctx.globalCompositeOperation = 'lighter';
            for (let i = 0; i < 3; i++) {
                ctx.beginPath();
                ctx.moveTo(0, canvas.height / 2 + Math.sin(time * 2 + i) * 100 * amplitude);
                for (let x = 0; x < canvas.width; x += 50) {
                    ctx.lineTo(x, canvas.height / 2 + Math.sin(time * 2 + i + x * 0.002) * 100 * amplitude);
                }
                ctx.lineTo(canvas.width, canvas.height);
                ctx.lineTo(0, canvas.height);
                ctx.fillStyle = `${colorStops[i % colorStops.length]}33`; // low opacity
                ctx.fill();
            }
            ctx.globalCompositeOperation = 'source-over';

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [colorStops, amplitude, blend, speed]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ mixBlendMode: 'screen' }}
        />
    );
}
