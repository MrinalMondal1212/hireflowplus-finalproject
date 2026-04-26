"use client";
import React from 'react';
import { Users, Briefcase, FileText, ShieldAlert, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function SimpleAdminDashboard() {
  const stats = [
    { label: "Total Users", value: "2,847", icon: Users, trend: "+12%" },
    { label: "Active Jobs", value: "1,243", icon: Briefcase, trend: "+8%" },
    { label: "Applications", value: "8,942", icon: FileText, trend: "+23%" },
    { label: "Reports", value: "14", icon: ShieldAlert, trend: "Pending", isAlert: true }
  ];

  return (
    <div className="p-6 space-y-10 bg-black min-h-screen text-slate-200">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">System Overview</h1>
          <p className="text-slate-500 mt-2">Real-time platform performance and moderation.</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500 uppercase tracking-widest">Last Update</p>
          <p className="text-sm font-mono">14:44:19</p>
        </div>
      </div>

      {/* Grid: Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="p-5 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-indigo-500/30 transition-colors">
            <div className="flex justify-between items-start">
              <stat.icon className={`w-5 h-5 ${stat.isAlert ? 'text-rose-400' : 'text-indigo-400'}`} />
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${stat.isAlert ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                {stat.trend}
              </span>
            </div>
            <h3 className="text-3xl font-bold mt-4 text-white">{stat.value}</h3>
            <p className="text-sm text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Flagged Content */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-500" /> Moderation Queue
          </h2>
          <div className="bg-slate-900/20 border border-white/5 rounded-2xl overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 flex items-center justify-between border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400">#JP</div>
                  <div>
                    <p className="text-sm font-medium text-white">Suspected Fake Job Posting</p>
                    <p className="text-xs text-slate-500">Reported for: Spam / Misleading Info</p>
                  </div>
                </div>
                <button className="text-xs font-semibold text-indigo-400 hover:underline">Review</button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Top Companies */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Top Performers</h2>
          <div className="space-y-3">
            {['TechCorp', 'InnoGen', 'CloudScale'].map((name) => (
              <div key={name} className="flex items-center justify-between p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl">
                <span className="text-sm font-medium">{name}</span>
                <span className="text-xs text-indigo-300 flex items-center gap-1">
                  98% Fill Rate <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}