'use client';

import React, { useEffect, useRef } from 'react';

interface FloatingLinesProps {
    linesGradient?: string[];
    animationSpeed?: number;
    interactive?: boolean;
    bendRadius?: number;
    bendStrength?: number;
    mouseDamping?: number;
    parallax?: boolean;
    parallaxStrength?: number;
}

export const FloatingLines: React.FC<FloatingLinesProps> = ({
    linesGradient = ["#00F2FF", "#808080", "#ffffff"],
    animationSpeed = 1,
    interactive = true,
    bendRadius = 5,
    bendStrength = -0.5,
    mouseDamping = 0.05,
    parallax = true,
    parallaxStrength = 0.45,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const onMouseMove = (e: MouseEvent) => {
            targetX = e.clientX;
            targetY = e.clientY;
        };

        window.addEventListener('resize', resize);
        if (interactive) {
            window.addEventListener('mousemove', onMouseMove);
        }

        resize();

        const lines: {
            x: number;
            y: number;
            length: number;
            speed: number;
            opacity: number;
            width: number;
            color: string;
            offset: number;
        }[] = [];
        const lineCount = 40;

        for (let i = 0; i < lineCount; i++) {
            lines.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                length: Math.random() * 200 + 100,
                speed: (Math.random() * 2 + 1) * animationSpeed,
                opacity: Math.random() * 0.5 + 0.1,
                width: Math.random() * 2 + 1,
                color: linesGradient[Math.floor(Math.random() * linesGradient.length)],
                offset: Math.random() * 1000
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            mouseX += (targetX - mouseX) * mouseDamping;
            mouseY += (targetY - mouseY) * mouseDamping;

            lines.forEach(line => {
                line.y -= line.speed;
                if (line.y < -line.length) {
                    line.y = canvas.height + line.length;
                    line.x = Math.random() * canvas.width;
                }

                ctx.beginPath();
                ctx.moveTo(line.x, line.y);

                // Mouse interaction / Bend
                const dx = mouseX - line.x;
                const dy = mouseY - line.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                let drawX = line.x;
                let drawY = line.y;

                if (dist < bendRadius * 100) {
                    const force = (bendRadius * 100 - dist) / (bendRadius * 100);
                    drawX += dx * force * bendStrength;
                    drawY += dy * force * bendStrength;
                }

                // Parallax
                if (parallax) {
                    drawX += (mouseX - canvas.width / 2) * parallaxStrength * (line.opacity);
                    drawY += (mouseY - canvas.height / 2) * parallaxStrength * (line.opacity);
                }

                ctx.strokeStyle = line.color;
                ctx.globalAlpha = line.opacity;
                ctx.lineWidth = line.width;
                ctx.lineTo(drawX, drawY + line.length);
                ctx.stroke();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [linesGradient, animationSpeed, interactive, bendRadius, bendStrength, mouseDamping, parallax, parallaxStrength]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ filter: 'blur(1px)' }}
        />
    );
};
