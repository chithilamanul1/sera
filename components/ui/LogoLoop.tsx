'use client';
import React from 'react';
import Link from 'next/link';

interface LogoLoopProps {
    logos: { node?: React.ReactNode; src?: string; alt?: string; title?: string; href?: string }[];
    speed?: number;
    direction?: "left" | "right";
    logoHeight?: number;
    gap?: number;
    hoverSpeed?: number;
    scaleOnHover?: boolean;
    fadeOut?: boolean;
    fadeOutColor?: string;
    ariaLabel?: string;
    useCustomRender?: boolean;
}

export default function LogoLoop({
    logos,
    speed = 40,
    direction = "left",
    logoHeight = 60,
    gap = 60,
    hoverSpeed = 0,
    scaleOnHover = true,
    fadeOut = true,
    fadeOutColor = "var(--background)",
    ariaLabel = "Logos",
    useCustomRender = false,
}: LogoLoopProps) {
    return (
        <div className="relative overflow-hidden w-full flex items-center" aria-label={ariaLabel} style={{ height: logoHeight + 40 }}>
            {fadeOut && (
                <>
                    <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: `linear-gradient(to right, ${fadeOutColor}, transparent)` }} />
                    <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: `linear-gradient(to left, ${fadeOutColor}, transparent)` }} />
                </>
            )}
            <div
                className={`flex whitespace-nowrap loop-container ${direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'}`}
                style={{ gap: `${gap}px` }}
            >
                <style dangerouslySetInnerHTML={{
                    __html: `
            @keyframes marquee {
                from { transform: translateX(0); }
                to { transform: translateX(calc(-100% - ${gap}px)); }
            }
            @keyframes marquee-reverse {
                from { transform: translateX(calc(-100% - ${gap}px)); }
                to { transform: translateX(0); }
            }
            .animate-marquee { animation: marquee ${speed}s linear infinite; }
            .animate-marquee-reverse { animation: marquee-reverse ${speed}s linear infinite; }
            .loop-container:hover { animation-play-state: ${hoverSpeed === 0 ? 'paused' : 'running'}; }
        `}} />

                {/* Render multiple times for seamless loop */}
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex shrink-0 items-center justify-center" style={{ gap: `${gap}px`, display: 'flex' }}>
                        {logos.map((logo, j) => {
                            const innerContent = (
                                <div className={`flex items-center justify-center text-zinc-400 dark:text-zinc-500 hover:text-cyan-500 dark:hover:text-white transition-all duration-300 ${scaleOnHover ? 'hover:scale-110' : ''}`}>
                                    {logo.node ? (
                                        <span className="text-4xl md:text-5xl">{logo.node}</span>
                                    ) : logo.src ? (
                                        <img src={logo.src} alt={logo.alt || 'logo'} style={{ height: logoHeight }} className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300" />
                                    ) : null}
                                    {logo.title && <span className="sr-only">{logo.title}</span>}
                                </div>
                            );

                            return logo.href ? (
                                <Link key={j} href={logo.href} target="_blank" rel="noopener noreferrer">
                                    {innerContent}
                                </Link>
                            ) : (
                                <div key={j}>{innerContent}</div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}
