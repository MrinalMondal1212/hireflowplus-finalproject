import React from 'react';

export default function UserDashboard() {
  const stats = [
    { label: "Total Applications", value: "12", color: "from-blue-600" },
    { label: "Interviews Slotted", value: "3", color: "from-purple-600" },
    { label: "Pending Offers", value: "1", color: "from-emerald-600" }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Welcome back!</h1>
        <p className="text-slate-400 mt-2">Here is what is happening with your applications today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="relative group">
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.color} to-transparent rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500`}></div>
            <div className="relative p-6 bg-slate-900/50 border border-white/10 rounded-2xl">
              <p className="text-sm text-slate-400 uppercase tracking-wider text-slate-400">{stat.label}</p>
              <p className="text-4xl font-bold mt-2 text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900/30 border border-white/5 rounded-3xl p-8 text-center">
        <p className="text-slate-500">No recent notifications</p>
      </div>
    </div>
  );
}