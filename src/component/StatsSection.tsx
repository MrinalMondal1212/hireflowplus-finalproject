"use client";
import React from 'react';
import { SimpleTicker } from './NubmerTicker';

const StatsSection = () => {
  const stats = [
    { label: 'Active Candidates', value: 150000, suffix: '+', color: 'text-[var(--primary)]' },
    { label: 'Companies Hiring', value: 2500, suffix: '+', color: 'text-purple-400' },
    { label: 'Daily Matches', value: 12000, suffix: '+', color: 'text-pink-400' },
    { label: 'Success Rate', value: 94, suffix: '%', color: 'text-orange-400' },
  ];

  return (
    <section className="w-full bg-[oklch(0.12_0.01_250)] border-y border-white/5">
      {/* Container is only for centering the grid on giant screens */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="p-12 border-r border-b lg:border-b-0 border-white/5 hover:bg-white/[0.02] transition-colors"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-2">
                {stat.label}
              </p>
              <h2 className={`text-5xl md:text-6xl font-black tracking-tighter ${stat.color}`}>
                <SimpleTicker value={stat.value} suffix={stat.suffix} />
              </h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;