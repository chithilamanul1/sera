'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Monitor, Smartphone, Laptop } from 'lucide-react';

/* ═══════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════ */

export type DeviceType = 'laptop' | 'desktop' | 'phone' | 'tablet';

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
        <div className="h-7 bg-[#f1f1f1] dark:bg-[#0d0d0d] flex items-center px-3 gap-2 border-b border-zinc-200 dark:border-zinc-800/60 shrink-0 transition-colors">
            {/* Traffic lights */}
            <div className="flex gap-1.5 slice-lights">
                <div className="w-[10px] h-[10px] rounded-full bg-[#ff5f57]" />
                <div className="w-[10px] h-[10px] rounded-full bg-[#febd2f]" />
                <div className="w-[10px] h-[10px] rounded-full bg-[#28c840]" />
            </div>
            {/* URL bar */}
            <div className="flex-1 mx-2">
                <div className="h-4 bg-white dark:bg-[#1a1a1a] rounded-md max-w-[280px] mx-auto flex items-center px-2.5 border border-zinc-200 dark:border-zinc-800/40">
                    <div className="w-2.5 h-2.5 mr-1.5">
                        <svg viewBox="0 0 12 12" fill="none" className="text-zinc-400 dark:text-zinc-600 w-full h-full">
                            <path d="M6 1L6 3M6 3C4.34315 3 3 4.34315 3 6V8C3 9.65685 4.34315 11 6 11C7.65685 11 9 9.65685 9 8V6C9 4.34315 7.65685 3 6 3Z" stroke="currentColor" strokeWidth="1" />
                        </svg>
                    </div>
                    <span className="text-[8px] text-zinc-400 dark:text-zinc-500 truncate font-mono tracking-wide">{url}</span>
                </div>
            </div>
            {/* Nav buttons placeholder */}
            <div className="flex gap-1 opacity-20">
                <div className="w-3 h-3 rounded-sm bg-zinc-400 dark:bg-zinc-700" />
                <div className="w-3 h-3 rounded-sm bg-zinc-400 dark:bg-zinc-700" />
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
            <div className="relative w-full max-w-[640px] bg-[#080808] rounded-t-xl border border-zinc-700/50 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.8)]" style={{ containerType: 'inline-size' }}>
                {/* Metal ridge on top */}
                <div className="h-[2px] bg-gradient-to-r from-transparent via-zinc-600/40 to-transparent" />
                <BrowserChrome url={liveUrl} />
                {/* Screen */}
                <div className="relative w-full bg-black overflow-hidden" style={{ aspectRatio: '16/9.5' }}>
                    <iframe
                        src={liveUrl}
                        title={`Live preview of ${title}`}
                        className="border-0 absolute top-0 left-0"
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin allow-popups"
                        style={{
                            width: '1024px',
                            height: '608px',
                            transform: 'scale(var(--laptop-scale, 1))',
                            transformOrigin: 'top left',
                            pointerEvents: 'none'
                        }}
                    />
                    <style jsx>{`
                        div { --laptop-scale: calc(100 / 100); } 
                        @container (min-width: 0px) {
                            div :global(iframe) {
                                width: 1024px;
                                height: 608px;
                                transform: scale(calc(100cqw / 1024));
                            }
                        }
                    `}</style>
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
            <div className="relative w-full max-w-[680px] bg-[#080808] rounded-2xl border-[1.5px] border-zinc-700/40 overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)]" style={{ containerType: 'inline-size' }}>
                <div className="h-[2px] bg-gradient-to-r from-transparent via-zinc-500/30 to-transparent" />
                <BrowserChrome url={liveUrl} />
                <div className="relative w-full bg-black overflow-hidden" style={{ aspectRatio: '16/9' }}>
                    <iframe
                        src={liveUrl}
                        title={`Live preview of ${title}`}
                        className="border-0 absolute top-0 left-0"
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin allow-popups"
                        style={{
                            width: '1280px',
                            height: '720px',
                            transform: 'scale(calc(100 / 1280))', // Placeholder, will use container query or similar logic
                            transformOrigin: 'top left',
                            pointerEvents: 'none'
                        }}
                    />
                    <style jsx>{`
                        div :global(iframe) {
                            width: 1280px;
                            height: 720px;
                            transform: scale(calc(100cqw / 1280));
                        }
                    `}</style>
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
   TABLET FRAME — iPad Pro Style
   ═══════════════════════════════════════════════════ */

function TabletFrame({ liveUrl, title, glowColor }: { liveUrl: string; title: string; glowColor: string }) {
    return (
        <div className="relative flex flex-col items-center">
            {/* Ambient glow */}
            <div
                className="absolute -inset-10 rounded-full blur-3xl opacity-15 transition-opacity duration-1000 group-hover:opacity-35"
                style={{ background: `radial-gradient(circle, ${glowColor}, transparent 70%)` }}
            />

            <div className="relative bg-[#0a0a0a] rounded-[2rem] border-[1.5px] border-zinc-600/40 p-[6px] shadow-[0_0_50px_rgba(0,0,0,0.8)]" style={{ width: '420px', maxWidth: '85vw', containerType: 'inline-size' }}>
                {/* Screen */}
                <div className="rounded-[1.6rem] overflow-hidden bg-black relative" style={{ aspectRatio: '4/3' }}>
                    <iframe
                        src={liveUrl}
                        title={`Live preview of ${title}`}
                        className="border-0 absolute top-0 left-0"
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin allow-popups"
                        style={{
                            width: '1024px',
                            height: '768px',
                            transform: 'scale(calc(100cqw / 1024))', // Requires container-type: inline-size on parent
                            transformOrigin: 'top left',
                            pointerEvents: 'none'
                        }}
                    />
                    <style jsx>{`
                        div :global(iframe) {
                            width: 1024px;
                            height: 768px;
                            transform: scale(calc(100cqw / 1024));
                        }
                    `}</style>
                    <ScanLine />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] via-transparent to-transparent pointer-events-none rounded-[1.6rem]" />
                </div>

                {/* Camera dot */}
                <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-1.5 h-1.5 bg-zinc-800 rounded-full border border-zinc-700/50 hidden md:block" />
            </div>

            {/* Reflection */}
            <div className="w-[380px] h-10 mt-2 opacity-[0.03] rounded-b-full overflow-hidden scale-y-[-1] blur-[2px]">
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
            <Icon size={14} className="text-zinc-400 group-hover:text-white transition-colors duration-500" />
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
    device: initialDevice,
}: LiveDevicePreviewProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [currentDevice, setCurrentDevice] = useState<DeviceType>(initialDevice);

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
        tablet: '#10b981',
    };

    const accentMap: Record<DeviceType, { badge: string; dot: string }> = {
        laptop: { badge: 'bg-blue-500/10 border-blue-500/30 text-blue-400', dot: 'bg-blue-500' },
        desktop: { badge: 'bg-violet-500/10 border-violet-500/30 text-violet-400', dot: 'bg-violet-500' },
        phone: { badge: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400', dot: 'bg-cyan-500' },
        tablet: { badge: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400', dot: 'bg-emerald-500' },
    };

    const devices: DeviceType[] = ['desktop', 'laptop', 'tablet', 'phone'];

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
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 via-zinc-50 to-white dark:from-zinc-950 dark:via-[#0a0a0a] dark:to-zinc-950" />
                <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.5\'/%3E%3C/svg%3E")' }} />
                {/* Border */}
                <div className={`absolute inset-0 rounded-[2rem] border transition-colors duration-700 pointer-events-none z-40 ${hovered ? 'border-zinc-300 dark:border-white/10' : 'border-zinc-200 dark:border-white/[0.04]'
                    }`} />

                {/* 3D Device Area */}
                <div
                    className="relative py-12 md:py-16 px-6 flex items-center justify-center min-h-[300px] md:min-h-[450px]"
                    style={{
                        transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                        transformStyle: 'preserve-3d',
                        transition: 'transform 0.3s ease-out',
                    }}
                >
                    {currentDevice === 'laptop' && <LaptopFrame liveUrl={liveUrl} title={title} glowColor={glowColors.laptop} />}
                    {currentDevice === 'desktop' && <DesktopFrame liveUrl={liveUrl} title={title} glowColor={glowColors.desktop} />}
                    {currentDevice === 'phone' && <PhoneFrame liveUrl={liveUrl} title={title} glowColor={glowColors.phone} />}
                    {currentDevice === 'tablet' && <TabletFrame liveUrl={liveUrl} title={title} glowColor={glowColors.tablet} />}
                </div>

                {/* Info Panel */}
                <div className="relative px-8 pb-8 pt-0 z-10">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-white/[0.06] to-transparent mb-6" />

                    <div className="flex items-start justify-between gap-6">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    {devices.map((d) => {
                                        const Icon = d === 'laptop' ? Laptop : d === 'desktop' ? Monitor : d === 'phone' ? Smartphone : Monitor; // Tablet icon is Monitor too or we can find another
                                        // For tablet we can use Monitor but scaled or Tablet if available in lucide
                                        return (
                                            <button
                                                key={d}
                                                onClick={() => setCurrentDevice(d)}
                                                className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-300 ${currentDevice === d
                                                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-black border-zinc-900 dark:border-white'
                                                    : 'bg-zinc-100 dark:bg-white/5 text-zinc-400 dark:text-zinc-500 border-zinc-200 dark:border-white/10 hover:bg-zinc-200 dark:hover:bg-white/10 hover:text-zinc-600 dark:hover:text-white'
                                                    }`}
                                            >
                                                {d === 'laptop' && <Laptop size={14} />}
                                                {d === 'desktop' && <Monitor size={14} />}
                                                {d === 'phone' && <Smartphone size={14} />}
                                                {d === 'tablet' && <Monitor size={14} className="rotate-90 scale-75" />}
                                            </button>
                                        );
                                    })}
                                </div>
                                <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border ${accentMap[currentDevice].badge}`}>
                                    {category}
                                </span>
                            </div>

                            <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight mb-1.5">
                                {title}
                            </h3>
                            <p className={`text-zinc-500 dark:text-zinc-500 text-sm leading-relaxed max-w-md transition-all duration-500 overflow-hidden ${hovered ? 'opacity-100 max-h-20' : 'opacity-70 max-h-10'
                                }`}>
                                {desc}
                            </p>

                            <div className={`flex flex-wrap gap-1.5 mt-3 transition-all duration-500 ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                                }`}>
                                {tags.map((t) => (
                                    <span key={t} className="px-2 py-0.5 bg-zinc-100 dark:bg-white/[0.03] rounded text-[9px] font-mono uppercase text-zinc-500 dark:text-white/50 border border-zinc-200 dark:border-white/[0.05]">
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
                                ? 'bg-zinc-900 dark:bg-white/10 border-zinc-900 dark:border-white/20 text-white scale-100'
                                : 'bg-zinc-100 dark:bg-white/[0.02] border-zinc-200 dark:border-white/[0.05] text-zinc-500 scale-95'
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
            className="relative w-full max-w-6xl mx-auto px-4"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        >
            <div
                className="relative flex items-center justify-center min-h-[400px] md:min-h-[550px]"
                style={{
                    transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.4s ease-out',
                }}
            >
                {/* Desktop/Laptop - Center (Main) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className="z-20 w-full max-w-[800px] absolute"
                    style={{ transform: 'translateZ(20px)' }}
                >
                    <LaptopFrame liveUrl={liveUrl} title={title} glowColor="#3b82f6" />
                </motion.div>

                {/* Phone - Front Left */}
                <motion.div
                    initial={{ opacity: 0, x: -100, rotateY: 15 }}
                    animate={{ opacity: 1, x: -160, rotateY: 15 }}
                    transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
                    className="z-30 absolute bottom-0 left-1/2 -ml-[300px] hidden md:block"
                    style={{
                        transform: 'translateZ(100px) translateX(-180px) rotateY(15deg)',
                        transformStyle: 'preserve-3d'
                    }}
                >
                    <div className="scale-75 origin-bottom">
                        <PhoneFrame liveUrl={liveUrl} title={title} glowColor="#06b6d4" />
                    </div>
                </motion.div>

                {/* Tablet - Front Right */}
                <motion.div
                    initial={{ opacity: 0, x: 100, rotateY: -15 }}
                    animate={{ opacity: 1, x: 160, rotateY: -15 }}
                    transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                    className="z-30 absolute bottom-0 left-1/2 -ml-[120px] hidden lg:block"
                    style={{
                        transform: 'translateZ(80px) translateX(180px) rotateY(-15deg)',
                        transformStyle: 'preserve-3d'
                    }}
                >
                    <div className="scale-[0.6] origin-bottom">
                        <TabletFrame liveUrl={liveUrl} title={title} glowColor="#10b981" />
                    </div>
                </motion.div>
            </div>

            {/* Ambient Shadow/Glow */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[60%] h-12 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
        </motion.div>
    );
}
