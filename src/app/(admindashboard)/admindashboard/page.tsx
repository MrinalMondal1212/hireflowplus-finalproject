// app/admindashboard/page.tsx
"use client";
import React from 'react';
import { 
  Users, Briefcase, FileText, TrendingUp, 
  Calendar, Eye, ThumbsUp, ThumbsDown,
  BarChart3, LineChart, PieChart 
} from 'lucide-react';
import { LineChart as RechartsLine, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPie, Pie, Cell } from 'recharts';

export default function AdminDashboard() {
  // Mock data for analytics
  const stats = [
    { label: "Total Users", value: "2,847", icon: Users, color: "from-indigo-600", change: "+12%", changeType: "positive" },
    { label: "Active Jobs", value: "1,243", icon: Briefcase, color: "from-purple-600", change: "+8%", changeType: "positive" },
    { label: "Total Applications", value: "8,942", icon: FileText, color: "from-emerald-600", change: "+23%", changeType: "positive" },
    { label: "Hiring Rate", value: "18.5%", icon: TrendingUp, color: "from-cyan-600", change: "+3.2%", changeType: "positive" }
  ];

  // Job posting trends (last 6 months)
  const jobTrends = [
    { month: "Aug", jobs: 145, applications: 890 },
    { month: "Sep", jobs: 178, applications: 1123 },
    { month: "Oct", jobs: 210, applications: 1456 },
    { month: "Nov", jobs: 234, applications: 1678 },
    { month: "Dec", jobs: 198, applications: 1432 },
    { month: "Jan", jobs: 278, applications: 2345 }
  ];

  // Top companies by job postings
  const topCompanies = [
    { name: "Tech Corp", jobs: 45, hires: 12 },
    { name: "Innovate Inc", jobs: 38, hires: 9 },
    { name: "Future Systems", jobs: 32, hires: 7 },
    { name: "DataFlow", jobs: 28, hires: 6 }
  ];

  // User distribution pie chart
  const userDistribution = [
    { name: "Job Seekers", value: 2156, color: "#4F46E5" },
    { name: "Recruiters", value: 691, color: "#22D3EE" }
  ];

  // Recent reported content
  const reportedContent = [
    { id: 1, type: "Job Posting", title: "Senior Developer", reporter: "john@email.com", reason: "Spam", status: "pending", date: "2024-01-20" },
    { id: 2, type: "User", title: "User #4382", reporter: "system", reason: "Inappropriate behavior", status: "reviewing", date: "2024-01-19" },
    { id: 3, type: "Job Posting", title: "Fake Position", reporter: "sarah@email.com", reason: "Fraudulent", status: "resolved", date: "2024-01-18" }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-slate-400 mt-2">Platform overview and analytics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="relative group">
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.color} to-transparent rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500`}></div>
            <div className="relative p-6 bg-slate-900/50 border border-white/10 rounded-2xl">
              <div className="flex items-center justify-between">
                <stat.icon className="w-8 h-8 text-indigo-400" />
                <span className={`text-xs px-2 py-1 rounded-full ${
                  stat.changeType === 'positive' ? 'bg-emerald-400/10 text-emerald-400' : 'bg-red-400/10 text-red-400'
                }`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-3xl font-bold mt-4 text-white">{stat.value}</p>
              <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Job Trends Line Chart */}
        <div className="bg-slate-900/30 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-white">Hiring Trends</h2>
              <p className="text-slate-400 text-sm mt-1">Jobs & applications over time</p>
            </div>
            <BarChart3 className="w-5 h-5 text-slate-400" />
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={jobTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }}
                  labelStyle={{ color: '#f1f5f9' }}
                />
                <Line type="monotone" dataKey="jobs" stroke="#4F46E5" strokeWidth={2} name="Jobs Posted" />
                <Line type="monotone" dataKey="applications" stroke="#22D3EE" strokeWidth={2} name="Applications" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Distribution Pie Chart */}
        <div className="bg-slate-900/30 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-white">User Distribution</h2>
              <p className="text-slate-400 text-sm mt-1">Job seekers vs recruiters</p>
            </div>
            <PieChart className="w-5 h-5 text-slate-400" />
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPie>
                <Pie
                  data={userDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {userDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }}
                />
              </RechartsPie>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {userDistribution.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-slate-300">{item.name}</span>
                <span className="text-sm text-indigo-400">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Companies & Recent Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Companies */}
        <div className="bg-slate-900/30 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Top Companies</h2>
          <div className="space-y-4">
            {topCompanies.map((company) => (
              <div key={company.name} className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{company.name}</p>
                  <p className="text-xs text-slate-400">{company.jobs} jobs posted</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 text-sm">{company.hires} hires</span>
                  <span className="text-slate-500">|</span>
                  <span className="text-indigo-400 text-sm">
                    {((company.hires / company.jobs) * 100).toFixed(0)}% fill rate
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reports */}
        <div className="bg-slate-900/30 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-white">Recent Reports</h2>
              <p className="text-slate-400 text-sm mt-1">Flagged content awaiting moderation</p>
            </div>
            <Eye className="w-5 h-5 text-slate-400" />
          </div>
          <div className="space-y-4">
            {reportedContent.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-xl">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-white font-medium">{report.title}</p>
                    <span className="text-xs px-2 py-0.5 bg-slate-700 rounded-full text-slate-300">
                      {report.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">Reported by: {report.reporter}</p>
                  <p className="text-xs text-slate-500">{report.reason}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    report.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' :
                    report.status === 'reviewing' ? 'bg-blue-500/10 text-blue-400' :
                    'bg-green-500/10 text-green-400'
                  }`}>
                    {report.status}
                  </span>
                  <button className="p-1 hover:bg-indigo-500/10 rounded-lg transition">
                    <Eye className="w-4 h-4 text-indigo-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}