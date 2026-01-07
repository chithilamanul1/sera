'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
    icon: LucideIcon;
    value: string | number;
    label: string;
    trend?: number;
    color?: string;
}

export default function StatsCard({ icon: Icon, value, label, trend, color = '#E5E4E2' }: StatsCardProps) {
    const isPositive = trend && trend > 0;
    const isNegative = trend && trend < 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="glass p-6 rounded-2xl relative group"
        >
            {/* Icon */}
            <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{
                    background: `linear-gradient(135deg, ${color}20, ${color}10)`,
                }}
            >
                <Icon className="w-6 h-6" style={{ color }} />
            </div>

            {/* Value */}
            <div className="text-3xl font-heading font-bold text-white mb-1">
                {value}
            </div>

            {/* Label */}
            <div className="text-silver/70 text-sm mb-2">{label}</div>

            {/* Trend */}
            {trend !== undefined && trend !== 0 && (
                <div className="flex items-center gap-1">
                    {isPositive && <TrendingUp className="w-4 h-4 text-green-500" />}
                    {isNegative && <TrendingDown className="w-4 h-4 text-red-500" />}
                    <span className={`text-xs font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                        {Math.abs(trend)}%
                    </span>
                    <span className="text-silver/60 text-xs">vs last month</span>
                </div>
            )}

            {/* Hover Glow */}
            <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-xl"
                style={{
                    background: `radial-gradient(circle at center, ${color}15, transparent 70%)`,
                }}
            />
        </motion.div>
    );
}
