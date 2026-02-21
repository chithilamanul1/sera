
import { Users, Rocket, ShieldCheck } from 'lucide-react';

const stats = [
    { label: "AI Agents Deployed", value: "50+", icon: Rocket, color: "text-cyan-400" },
    { label: "App Uptime", value: "99.9%", icon: ShieldCheck, color: "text-emerald-400" },
    { label: "Enterprise Systems", value: "15+", icon: Users, color: "text-blue-400" },
];

export function ImpactStrip() {
    return (
        <section className="py-8 border-y border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-zinc-950/50 backdrop-blur-sm transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
                    {stats.map((stat, idx) => (
                        <div key={idx} className={`flex items-center justify-center gap-4 ${idx !== stats.length - 1 ? 'md:border-r border-zinc-200 dark:border-white/10' : ''}`}>
                            <div className={`p-2 rounded-lg bg-zinc-200 dark:bg-white/5 ${stat.color}`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold tabular-nums tracking-tight font-syne text-zinc-900 dark:text-white uppercase italic">{stat.value}</span>
                                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500">{stat.label}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
