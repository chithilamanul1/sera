
'use client';

import { useState } from 'react';
import { Calculator, TrendingUp, Users, Clock } from 'lucide-react';

export function AISavingsCalculator() {
    const [teamSize, setTeamSize] = useState(10);
    const [avgSalary, setAvgSalary] = useState(4000); // USD
    const [efficiency, setEfficiency] = useState(30); // %

    const monthlySavings = (teamSize * avgSalary) * (efficiency / 100);
    const yearlySavings = monthlySavings * 12;

    return (
        <div className="my-16 p-8 rounded-3xl bg-zinc-900 border border-white/5 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5">
                <Calculator className="w-32 h-32 text-cyan-500 scale-150" />
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                        <TrendingUp className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold font-syne">AI ROI Calculator</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                    {/* Inputs */}
                    <div className="space-y-8">
                        <div>
                            <label className="flex justify-between text-sm font-bold text-zinc-400 mb-4 uppercase tracking-wider">
                                <span>Team Size</span>
                                <span className="text-white">{teamSize} Members</span>
                            </label>
                            <input
                                type="range"
                                min="1" max="100"
                                value={teamSize}
                                onChange={(e) => setTeamSize(parseInt(e.target.value))}
                                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                            />
                        </div>
                        <div>
                            <label className="flex justify-between text-sm font-bold text-zinc-400 mb-4 uppercase tracking-wider">
                                <span>Avg. Monthly Cost/Member</span>
                                <span className="text-white">${avgSalary.toLocaleString()}</span>
                            </label>
                            <input
                                type="range"
                                min="1000" max="15000" step="500"
                                value={avgSalary}
                                onChange={(e) => setAvgSalary(parseInt(e.target.value))}
                                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                            />
                        </div>
                        <div>
                            <label className="flex justify-between text-sm font-bold text-zinc-400 mb-4 uppercase tracking-wider">
                                <span>AI Efficiency Gain</span>
                                <span className="text-cyan-400">{efficiency}%</span>
                            </label>
                            <input
                                type="range"
                                min="10" max="80"
                                value={efficiency}
                                onChange={(e) => setEfficiency(parseInt(e.target.value))}
                                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                            />
                        </div>
                    </div>

                    {/* Results */}
                    <div className="bg-black/50 rounded-2xl p-8 border border-white/5 flex flex-col justify-center text-center">
                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em] mb-4">Estimated Monthly Savings</p>
                        <h4 className="text-4xl md:text-6xl font-bold text-cyan-400 mb-2 tabular-nums">
                            ${monthlySavings.toLocaleString()}
                        </h4>
                        <p className="text-zinc-500 text-sm">
                            Approx. <span className="text-white font-bold">${yearlySavings.toLocaleString()}</span> annually.
                        </p>

                        <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 gap-4">
                            <div className="text-left">
                                <Clock className="w-4 h-4 text-zinc-500 mb-2" />
                                <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Time Reclaim</p>
                                <p className="text-sm font-bold">{Math.floor(teamSize * 160 * (efficiency / 100))} hrs/mo</p>
                            </div>
                            <div className="text-left">
                                <Users className="w-4 h-4 text-zinc-500 mb-2" />
                                <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Team Velocity</p>
                                <p className="text-sm font-bold">+{efficiency}%</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <button className="px-8 py-4 rounded-xl bg-white text-black font-bold hover:bg-cyan-400 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-cyan-500/10">
                        Get Full AI Transformation Audit
                    </button>
                </div>
            </div>
        </div>
    );
}
