'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check, X } from 'lucide-react';
import { useState } from 'react';
import { useThemeStore, glowColors, type GlowTheme } from '@/context/ThemeContext';

const themes: { name: string; key: GlowTheme; color: string; description: string }[] = [
    {
        name: 'Starlight Silver',
        key: 'silver',
        color: '#FFFFFF',
        description: 'Classic elegance',
    },
    {
        name: 'Matrix Green',
        key: 'green',
        color: '#00FF41',
        description: 'Digital energy',
    },
    {
        name: 'Royal Gold',
        key: 'gold',
        color: '#FFD700',
        description: 'Premium luxury',
    },
    {
        name: 'Cyber Red',
        key: 'red',
        color: '#FF0040',
        description: 'Bold power',
    },
];

export default function ThemeSwitcher() {
    const [isOpen, setIsOpen] = useState(false);
    const { glowTheme, setGlowTheme } = useThemeStore();
    const currentTheme = themes.find(t => t.key === glowTheme) || themes[0];

    return (
        <>
            {/* Floating Button */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 2.5, duration: 0.5 }}
                className="fixed bottom-6 left-6 z-50"
            >
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.9 }}
                            className="absolute bottom-20 left-0 w-80 glass p-6 rounded-2xl border border-silver/20 mb-2"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h4 className="text-white font-heading font-semibold text-lg mb-1">
                                        Theme Matrix
                                    </h4>
                                    <p className="text-silver/70 text-xs">
                                        Choose your glow color
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-silver/60 hover:text-white transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Theme Options */}
                            <div className="space-y-3">
                                {themes.map((theme) => {
                                    const isActive = glowTheme === theme.key;

                                    return (
                                        <motion.button
                                            key={theme.key}
                                            onClick={() => {
                                                setGlowTheme(theme.key);
                                                setTimeout(() => setIsOpen(false), 500);
                                            }}
                                            whileHover={{ scale: 1.02, x: 4 }}
                                            whileTap={{ scale: 0.98 }}
                                            className={`w-full p-4 rounded-xl transition-all relative overflow-hidden ${isActive ? 'glass border-2' : 'bg-surface/50 border border-silver/10'
                                                }`}
                                            style={{
                                                borderColor: isActive ? theme.color : undefined,
                                            }}
                                        >
                                            <div className="flex items-center gap-3 relative z-10">
                                                {/* Color Preview */}
                                                <div
                                                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                                                    style={{
                                                        background: `linear-gradient(135deg, ${theme.color}40, ${theme.color}20)`,
                                                        boxShadow: `0 0 20px ${theme.color}30`,
                                                    }}
                                                >
                                                    {isActive && (
                                                        <motion.div
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                                        >
                                                            <Check className="w-5 h-5" style={{ color: theme.color }} />
                                                        </motion.div>
                                                    )}
                                                </div>

                                                {/* Theme Info */}
                                                <div className="flex-1 text-left">
                                                    <div className="text-white font-semibold text-sm">
                                                        {theme.name}
                                                    </div>
                                                    <div className="text-silver/60 text-xs">
                                                        {theme.description}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Animated Background */}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeTheme"
                                                    className="absolute inset-0 rounded-xl -z-10"
                                                    style={{
                                                        background: `radial-gradient(circle at center, ${theme.color}10, transparent 70%)`,
                                                    }}
                                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                                />
                                            )}
                                        </motion.button>
                                    );
                                })}
                            </div>

                            {/* Info */}
                            <div className="mt-4 p-3 rounded-lg bg-surface/50 border border-silver/10">
                                <p className="text-silver/60 text-xs text-center">
                                    Your theme preference is saved automatically
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Button */}
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                        boxShadow: [
                            `0 0 20px ${currentTheme.color}30`,
                            `0 0 40px ${currentTheme.color}50`,
                            `0 0 20px ${currentTheme.color}30`,
                        ],
                    }}
                    transition={{
                        boxShadow: {
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        },
                    }}
                    className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all relative overflow-hidden"
                    style={{
                        background: `linear-gradient(135deg, ${currentTheme.color}40, ${currentTheme.color}20)`,
                    }}
                >
                    <Palette className="w-8 h-8 text-white relative z-10" />

                    {/* Animated Ring */}
                    <motion.div
                        className="absolute inset-0 rounded-full border-2"
                        style={{ borderColor: currentTheme.color }}
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                </motion.button>

                {/* Current Theme Label */}
                {!isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="absolute left-20 top-1/2 -translate-y-1/2 glass px-3 py-1 rounded-full whitespace-nowrap"
                    >
                        <span className="text-xs font-medium" style={{ color: currentTheme.color }}>
                            {currentTheme.name}
                        </span>
                    </motion.div>
                )}
            </motion.div>
        </>
    );
}
