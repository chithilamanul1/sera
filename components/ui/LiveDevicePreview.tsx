'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Monitor, Smartphone, Laptop } from 'lucide-react';

/* ═══════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════ */

export type DeviceType = 'laptop' | 'desktop' | 'phone';

interface LiveDevicePreviewProps {
    title: string;
    category: string;
    desc: string;
    liveUrl: string;
    link: string;
    tags: string[];
    device: DeviceType;
}

/* ═══════════════════════════════════════════════════
   ANIMATED SCAN LINE
   ═══════════════════════════════════════════════════ */

function ScanLine() {
    return (
        <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden opacity-[0.03]">
            <div
                className="absolute w-full h-[2px] bg-white"
                style={{
                    animation: 'scanLine 4s linear infinite',
                }}
            />
            <style jsx>{`
        @keyframes scanLine {
          0% { top: -2px; }
          100% { top: 100%; }
        }
      `}</style>
        </div>
    );
}

/* ═══════════════════════════════════════════════════
   BROWSER CHROME BAR
   ═══════════════════════════════════════════════════ */

function BrowserChrome({ url }: { url: string }) {
    return (
        <div className="h-7 bg-[#0d0d0d] flex items-center px-3 gap-2 border-b border-zinc-800/60 shrink-0">
            {/* Traffic lights */}
            <div className="flex gap-1.5">
                <div className="w-[10px] h-[10px] rounded-full bg-[#ff5f57] border border-[#e33e32]" />
                <div className="w-[10px] h-[10px] rounded-full bg-[#febd2f] border border-[#e2a100]" />
                <div className="w-[10px] h-[10px] rounded-full bg-[#28c840] border border-[#1aab29]" />
            </div>
            {/* URL bar */}
            <div className="flex-1 mx-2">
                <div className="h-4 bg-[#1a1a1a] rounded-md max-w-[280px] mx-auto flex items-center px-2.5 border border-zinc-800/40">
                    <div className="w-2.5 h-2.5 mr-1.5">
                        <svg viewBox="0 0 12 12" fill="none" className="text-zinc-600 w-full h-full">
                            <path d="M6 1L6 3M6 3C4.34315 3 3 4.34315 3 6V8C3 9.65685 4.34315 11 6 11C7.65685 11 9 9.65685 9 8V6C9 4.34315 7.65685 3 6 3Z" stroke="currentColor" strokeWidth="1" />
                        </svg>
                    </div>
                    <span className="text-[8px] text-zinc-500 truncate font-mono tracking-wide">{url}</span>
                </div>
            </div>
            {/* Nav buttons placeholder */}
            <div className="flex gap-1 opacity-30">
                <div className="w-3 h-3 rounded-sm bg-zinc-700" />
                <div className="w-3 h-3 rounded-sm bg-zinc-700" />
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════
   LAPTOP FRAME — Premium MacBook Style
   ═══════════════════════════════════════════════════ */

function LaptopFrame({ liveUrl, title, glowColor }: { liveUrl: string; title: string; glowColor: string }) {
    return (
        <div className="relative w-full flex flex-col items-center">
            {/* Ambient glow behind device */}
            <div
                className="absolute -inset-10 rounded-full blur-3xl opacity-20 transition-opacity duration-1000 group-hover:opacity-40"
                style={{ background: `radial-gradient(circle, ${glowColor}, transparent 70%)` }}
            />

            {/* Lid */}
            <div className="relative w-full max-w-[640px] bg-[#080808] rounded-t-xl border border-zinc-700/50 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.8)]">
                {/* Metal ridge on top */}
                <div className="h-[2px] bg-gradient-to-r from-transparent via-zinc-600/40 to-transparent" />
                <BrowserChrome url={liveUrl} />
                {/* Screen */}
                <div className="relative w-full bg-black" style={{ aspectRatio: '16/9.5' }}>
                    <iframe
                        src={liveUrl}
                        title={`Live preview of ${title}`}
                        className="w-full h-full border-0"
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin allow-popups"
                        style={{ pointerEvents: 'none' }}
                    />
                    <ScanLine />
                    {/* Screen reflection */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-transparent pointer-events-none" />
                </div>
            </div>

            {/* Hinge */}
            <div className="relative w-[103%] max-w-[660px]">
                <div className="h-[6px] bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-b-sm" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[3px] bg-zinc-600/30 rounded-b" />
            </div>

            {/* Base */}
            <div className="relative w-[115%] max-w-[740px]">
                <div className="h-[10px] bg-gradient-to-b from-[#1c1c1c] to-[#111] rounded-b-xl border-t border-zinc-700/30 flex justify-center">
                    <div className="w-1/4 h-[1px] bg-zinc-600/30 mt-1 rounded" />
                </div>
            </div>

            {/* Reflection on desk */}
            <div className="w-[90%] max-w-[580px] h-16 mt-1 opacity-[0.04] rounded-b-full overflow-hidden scale-y-[-1] blur-[2px]">
                <div className="w-full h-full bg-gradient-to-b from-zinc-400 to-transparent" />
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════
   DESKTOP MONITOR — iMac / Studio Display Style
   ═══════════════════════════════════════════════════ */

function DesktopFrame({ liveUrl, title, glowColor }: { liveUrl: string; title: string; glowColor: string }) {
    return (
        <div className="relative w-full flex flex-col items-center">
            {/* Ambient glow */}
            <div
                className="absolute -inset-10 rounded-full blur-3xl opacity-15 transition-opacity duration-1000 group-hover:opacity-35"
                style={{ background: `radial-gradient(circle, ${glowColor}, transparent 70%)` }}
            />

            {/* Monitor */}
            <div className="relative w-full max-w-[680px] bg-[#080808] rounded-2xl border-[1.5px] border-zinc-700/40 overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)]">
                <div className="h-[2px] bg-gradient-to-r from-transparent via-zinc-500/30 to-transparent" />
                <BrowserChrome url={liveUrl} />
                <div className="relative w-full bg-black" style={{ aspectRatio: '16/9' }}>
                    <iframe
                        src={liveUrl}
                        title={`Live preview of ${title}`}
                        className="w-full h-full border-0"
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin allow-popups"
                        style={{ pointerEvents: 'none' }}
                    />
                    <ScanLine />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.015] via-transparent to-transparent pointer-events-none" />
                </div>
                {/* Bottom chin */}
                <div className="h-6 bg-[#0a0a0a] flex items-center justify-center border-t border-zinc-800/30">
                    <div className="w-2 h-2 rounded-full bg-zinc-800 border border-zinc-700/50" />
                </div>
            </div>

            {/* Stand neck */}
            <div className="w-[3px] h-12 bg-gradient-to-b from-zinc-600 to-zinc-700 shadow-lg" />

            {/* Stand base - curved */}
            <div className="w-32 h-[6px] bg-zinc-700 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.5)]" />

            {/* Reflection */}
            <div className="w-[80%] max-w-[540px] h-12 mt-2 opacity-[0.03] rounded-b-full overflow-hidden scale-y-[-1] blur-[2px]">
                <div className="w-full h-full bg-gradient-to-b from-zinc-400 to-transparent" />
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════
   PHONE FRAME — iPhone 15 Pro Style
   ═══════════════════════════════════════════════════ */

function PhoneFrame({ liveUrl, title, glowColor }: { liveUrl: string; title: string; glowColor: string }) {
    return (
        <div className="relative flex flex-col items-center">
            {/* Ambient glow */}
            <div
                className="absolute -inset-8 rounded-full blur-3xl opacity-20 transition-opacity duration-1000 group-hover:opacity-40"
                style={{ background: `radial-gradient(circle, ${glowColor}, transparent 70%)` }}
            />

            <div className="relative bg-[#0a0a0a] rounded-[2.5rem] border-[1.5px] border-zinc-600/40 p-[5px] shadow-[0_0_50px_rgba(0,0,0,0.8),inset_0_0_0_1px_rgba(255,255,255,0.03)]" style={{ width: '240px' }}>
                {/* Titanium edge highlights */}
                <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-zinc-500/30 to-transparent rounded-full" />
                <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-zinc-500/20 to-transparent rounded-full" />

                {/* Dynamic Island */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[72px] h-[22px] bg-black rounded-full z-30 border border-zinc-800/80 flex items-center justify-center gap-2">
                    <div className="w-[6px] h-[6px] rounded-full bg-zinc-800 border border-zinc-700/50" />
                </div>

                {/* Screen */}
                <div className="rounded-[2.2rem] overflow-hidden bg-black relative" style={{ width: '230px', height: '498px' }}>
                    <iframe
                        src={liveUrl}
                        title={`Live preview of ${title}`}
                        className="border-0 absolute top-0 left-0"
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin allow-popups"
                        style={{
                            width: '390px',
                            height: '844px',
                            transform: 'scale(0.59)',
                            transformOrigin: 'top left',
                            pointerEvents: 'none',
                        }}
                    />
                    <ScanLine />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] via-transparent to-transparent pointer-events-none rounded-[2.2rem]" />
                </div>

                {/* Home indicator */}
                <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-[100px] h-[4px] bg-zinc-500/40 rounded-full z-30" />

                {/* Side buttons */}
                <div className="absolute top-20 -right-[2px] w-[2px] h-8 bg-zinc-600 rounded-r-full" />
                <div className="absolute top-16 -left-[2px] w-[2px] h-5 bg-zinc-600 rounded-l-full" />
                <div className="absolute top-24 -left-[2px] w-[2px] h-8 bg-zinc-600 rounded-l-full" />
                <div className="absolute top-[140px] -left-[2px] w-[2px] h-8 bg-zinc-600 rounded-l-full" />
            </div>

            {/* Reflection */}
            <div className="w-[160px] h-10 mt-2 opacity-[0.04] rounded-b-full overflow-hidden scale-y-[-1] blur-[2px]">
                <div className="w-full h-full bg-gradient-to-b from-zinc-400 to-transparent" />
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════
   DEVICE ICON BADGE
   ═══════════════════════════════════════════════════ */

function DeviceIcon({ device }: { device: DeviceType }) {
    const Icon = device === 'laptop' ? Laptop : device === 'desktop' ? Monitor : Smartphone;
    return (
        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
            <Icon size={14} className="text-zinc-400" />
        </div>
    );
}

/* ═══════════════════════════════════════════════════
   MAIN EXPORT: LiveDevicePreview
   ═══════════════════════════════════════════════════ */

export function LiveDevicePreview({
    title,
    category,
    desc,
    liveUrl,
    link,
    tags,
    device,
}: LiveDevicePreviewProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setTilt({ x: y * -6, y: x * 6 });
    };

    const handleMouseLeave = () => {
        setHovered(false);
        setTilt({ x: 0, y: 0 });
    };

    const glowColors: Record<DeviceType, string> = {
        laptop: '#3b82f6',
        desktop: '#8b5cf6',
        phone: '#06b6d4',
    };

    const accentMap: Record<DeviceType, { badge: string; dot: string }> = {
        laptop: { badge: 'bg-blue-500/10 border-blue-500/30 text-blue-400', dot: 'bg-blue-500' },
        desktop: { badge: 'bg-violet-500/10 border-violet-500/30 text-violet-400', dot: 'bg-violet-500' },
        phone: { badge: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400', dot: 'bg-cyan-500' },
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="group relative"
        >
            <div
                ref={containerRef}
                className={`relative rounded-[2rem] overflow-hidden transition-all duration-700 ${hovered
                    ? 'shadow-[0_0_100px_rgba(59,130,246,0.08)]'
                    : ''
                    }`}
                onMouseEnter={() => setHovered(true)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {/* Background with grain */}
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-[#0a0a0a] to-zinc-950" />
                <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.5\'/%3E%3C/svg%3E")' }} />
                {/* Border */}
                <div className={`absolute inset-0 rounded-[2rem] border transition-colors duration-700 pointer-events-none z-40 ${hovered ? 'border-white/10' : 'border-white/[0.04]'
                    }`} />

                {/* 3D Device Area */}
                <div
                    className="relative py-12 md:py-16 px-6 flex items-center justify-center"
                    style={{
                        transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                        transformStyle: 'preserve-3d',
                        transition: 'transform 0.3s ease-out',
                    }}
                >
                    {device === 'laptop' && <LaptopFrame liveUrl={liveUrl} title={title} glowColor={glowColors.laptop} />}
                    {device === 'desktop' && <DesktopFrame liveUrl={liveUrl} title={title} glowColor={glowColors.desktop} />}
                    {device === 'phone' && <PhoneFrame liveUrl={liveUrl} title={title} glowColor={glowColors.phone} />}
                </div>

                {/* Info Panel */}
                <div className="relative px-8 pb-8 pt-0 z-10">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-6" />

                    <div className="flex items-start justify-between gap-6">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-3">
                                <DeviceIcon device={device} />
                                <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border ${accentMap[device].badge}`}>
                                    {category}
                                </span>
                            </div>

                            <h3 className="text-xl md:text-2xl font-black uppercase text-white tracking-tight mb-1.5">
                                {title}
                            </h3>
                            <p className={`text-zinc-500 text-sm leading-relaxed max-w-md transition-all duration-500 overflow-hidden ${hovered ? 'opacity-100 max-h-20' : 'opacity-70 max-h-10'
                                }`}>
                                {desc}
                            </p>

                            <div className={`flex flex-wrap gap-1.5 mt-3 transition-all duration-500 ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                                }`}>
                                {tags.map((t) => (
                                    <span key={t} className="px-2 py-0.5 bg-white/[0.03] rounded text-[9px] font-mono uppercase text-white/50 border border-white/[0.05]">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Visit button */}
                        <a
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-500 ${hovered
                                ? 'bg-white/10 border-white/20 text-white scale-100'
                                : 'bg-white/[0.02] border-white/[0.05] text-zinc-500 scale-95'
                                }`}
                        >
                            <ExternalLink size={14} />
                            <span className="text-xs font-semibold uppercase tracking-wider">Visit</span>
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════
   MULTI-DEVICE HERO (for services pages)
   Shows laptop + phone + tablet in a composition
   ═══════════════════════════════════════════════════ */

export function MultiDeviceHero({ liveUrl, title }: { liveUrl: string; title: string }) {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setTilt({ x: y * -5, y: x * 5 });
    };

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-6xl mx-auto"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        >
            <div
                className="relative flex items-end justify-center gap-6 md:gap-10 py-8"
                style={{
                    transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.4s ease-out',
                }}
            >
                {/* Phone - Left */}
                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="hidden md:block"
                    style={{ transform: 'translateZ(30px)' }}
                >
                    <div className="relative bg-[#0a0a0a] rounded-[1.8rem] border border-zinc-700/40 p-[4px] shadow-2xl" style={{ width: '150px' }}>
                        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-10 h-3 bg-black rounded-full z-20 border border-zinc-800/60" />
                        <div className="rounded-[1.5rem] overflow-hidden bg-black" style={{ aspectRatio: '9/19.5' }}>
                            <iframe
                                src={liveUrl}
                                title={`${title} mobile`}
                                className="border-0"
                                loading="lazy"
                                sandbox="allow-scripts allow-same-origin allow-popups"
                                style={{
                                    width: '390px',
                                    height: '844px',
                                    transform: 'scale(0.37)',
                                    transformOrigin: 'top left',
                                    pointerEvents: 'none',
                                }}
                            />
                        </div>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-14 h-1 bg-zinc-600/40 rounded-full z-20" />
                    </div>
                </motion.div>

                {/* Laptop - Center (main) */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="flex-shrink-0"
                    style={{ transform: 'translateZ(60px)' }}
                >
                    <div className="relative w-full flex flex-col items-center" style={{ width: 'min(580px, 70vw)' }}>
                        <div className="w-full bg-[#080808] rounded-t-xl border border-zinc-700/40 overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.9)]">
                            <BrowserChrome url={liveUrl} />
                            <div className="relative w-full bg-black" style={{ aspectRatio: '16/9.5' }}>
                                <iframe
                                    src={liveUrl}
                                    title={`${title} desktop`}
                                    className="w-full h-full border-0"
                                    loading="lazy"
                                    sandbox="allow-scripts allow-same-origin allow-popups"
                                    style={{ pointerEvents: 'none' }}
                                />
                                <ScanLine />
                                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.015] via-transparent to-transparent pointer-events-none" />
                            </div>
                        </div>
                        <div className="w-[103%] h-[5px] bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-b-sm" />
                        <div className="w-[115%] h-[8px] bg-gradient-to-b from-[#1c1c1c] to-[#111] rounded-b-xl border-t border-zinc-700/20" />
                    </div>
                </motion.div>

                {/* Tablet - Right */}
                <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="hidden md:block"
                    style={{ transform: 'translateZ(20px)' }}
                >
                    <div className="relative bg-[#0a0a0a] rounded-2xl border border-zinc-700/40 p-[5px] shadow-2xl" style={{ width: '200px' }}>
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-zinc-800 rounded-full z-20 border border-zinc-700/40" />
                        <div className="rounded-xl overflow-hidden bg-black" style={{ aspectRatio: '3/4' }}>
                            <iframe
                                src={liveUrl}
                                title={`${title} tablet`}
                                className="border-0"
                                loading="lazy"
                                sandbox="allow-scripts allow-same-origin allow-popups"
                                style={{
                                    width: '768px',
                                    height: '1024px',
                                    transform: 'scale(0.25)',
                                    transformOrigin: 'top left',
                                    pointerEvents: 'none',
                                }}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Surface reflection */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-20 bg-gradient-to-t from-blue-500/[0.03] to-transparent blur-2xl rounded-full" />
        </motion.div>
    );
}
