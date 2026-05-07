"use client";
import React from "react";
// Importing standard icons from Lucide
import {
  Briefcase,
  Cpu,
  Rocket,
  BarChart,
  Megaphone,
  Palette,
  ArrowUpRight,
} from "lucide-react";

const hubs = [
  {
    title: "Remote Jobs",
    icon: <Briefcase className="w-6 h-6" />,
    color: "text-blue-400",
    desc: "Work from anywhere in the world.",
  },
  {
    title: "Tech Jobs",
    icon: <Cpu className="w-6 h-6" />,
    color: "text-white",
    desc: "Software, AI, and Infrastructure.",
  },
  {
    title: "Startup Jobs",
    icon: <Rocket className="w-6 h-6" />,
    color: "text-purple-400",
    desc: "Join fast-growing, agile teams.",
  },
  {
    title: "Finance",
    icon: <BarChart className="w-6 h-6" />,
    color: "text-emerald-400",
    desc: "Fintech and quantitative roles.",
  },
  {
    title: "Marketing",
    icon: <Megaphone className="w-6 h-6" />,
    color: "text-orange-400",
    desc: "Growth and digital strategy.",
  },
  {
    title: "Design",
    icon: <Palette className="w-6 h-6" />,
    color: "text-pink-400",
    desc: "UI/UX and Product Design.",
  },
];

const JobHubs = () => {
  return (
    <section className="w-full py-18 bg-[oklch(0.12_0.01_250)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Explore Industry Hubs
          </h2>
          <p className="text-[oklch(0.80_0_0)] text-lg max-w-2xl leading-relaxed">
            Discover high-growth opportunities across specialized sectors
            tailored to your professional trajectory.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {hubs.map((hub, i) => (
            <div
              key={i}
              className="group relative p-8 rounded-2xl bg-white/2 border border-white/5 `hover:border-(--primary)/50 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-[0.03] transition-opacity" />

              <div className="relative z-10">
                <div
                  className={`mb-4 inline-block p-3 rounded-xl bg-white/5 ${hub.color}`}
                >
                  {hub.icon}
                </div>

                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-white">
                    {hub.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                <p className="text-sm text-[oklch(0.80_0_0)]">{hub.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobHubs;
