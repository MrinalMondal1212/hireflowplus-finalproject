"use client";

import {
  Users,
  Briefcase,
  FileText,
  ShieldAlert,
} from "lucide-react";

import { useAdminStats } from "@/hooks/useAdminStats";
import { useAdminChartData } from "@/hooks/useAdminChartData";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function SimpleAdminDashboard() {
  const { data } = useAdminStats();

  const { data: chartData = [] } = useAdminChartData();

  const stats = [
    {
      label: "Total Users",
      value: data?.totalUsers || 0,
      icon: Users,
    },
    {
      label: "Recruiters",
      value: data?.totalRecruiters || 0,
      icon: Briefcase,
    },
    {
      label: "Applications",
      value: data?.totalApplications || 0,
      icon: FileText,
    },
    {
      label: "Total Jobs",
      value: data?.totalJobs || 0,
      icon: ShieldAlert,
    },
  ];

  return (
    <div className="p-6 space-y-10 bg-black min-h-screen text-slate-200">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            System Overview
          </h1>

          <p className="text-slate-500 mt-2">
            Real-time platform performance and moderation.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-5 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-indigo-500/30 transition-colors"
          >
            <div className="flex justify-between items-start">
              <stat.icon className="w-5 h-5 text-indigo-400" />
            </div>

            <h3 className="text-3xl font-bold mt-4 text-white">
              {stat.value}
            </h3>

            <p className="text-sm text-slate-500">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">
            Platform Analytics
          </h2>

          <p className="text-slate-400 text-sm mt-1">
            Users, recruiters, jobs and applications overview
          </p>
        </div>

        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />

              <XAxis dataKey="name" stroke="#94a3b8" />

              <YAxis stroke="#94a3b8" />

              <Tooltip />

              <Bar
                dataKey="total"
                radius={[10, 10, 0, 0]}
                fill="#6366f1"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}