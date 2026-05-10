// app/recruiter/page.tsx
"use client";
import {
  Briefcase,
  Users,
  CalendarCheck,
  Eye,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useRecruiterJobs } from "@/hooks/useRecruiterJobs";
import { useRecruiterAnalytics } from "@/hooks/useRecruiterAnalytics";
import { useAuthStore } from "@/store/useAuthStore";

export default function RecruiterDashboard() {
  const { data: jobs = [], isLoading } = useRecruiterJobs();

  const user = useAuthStore((s) => s.user);
  const { data: analytics } = useRecruiterAnalytics(user?.id || "");
  // Mock data - this will come from Supabase
  const stats = [
    {
      label: "Active Jobs",
      value: analytics?.totalJobs || 0,
      icon: Briefcase,
      color: "from-indigo-600",
    },
    {
      label: "Total Applicants",
      value: analytics?.totalApplicants || 0,
      icon: Users,
      color: "from-purple-600",
    },
    {
      label: "Interviews Scheduled",
      value: analytics?.interviews || 0,
      icon: CalendarCheck,
      color: "from-emerald-600",
    },
    {
      label: "Hiring Rate",
      value: analytics?.shortlisted || 0,
      icon: TrendingUp,
      color: "from-cyan-600",
    },
  ];

  const activeJobs = jobs;

  const total = analytics?.totalApplicants || 1;

  const pipelineStages = [
    {
      name: "Applied",
      count: total,
      color: "bg-blue-500",
      percentage: 100,
    },

    {
      name: "Shortlisted",
      count: analytics?.shortlisted || 0,
      color: "bg-emerald-500",

      percentage: ((analytics?.shortlisted || 0) / total) * 100,
    },

    {
      name: "Interview",
      count: analytics?.interviews || 0,
      color: "bg-purple-500",

      percentage: ((analytics?.interviews || 0) / total) * 100,
    },

    {
      name: "Rejected",
      count: analytics?.rejected || 0,
      color: "bg-rose-500",

      percentage: ((analytics?.rejected || 0) / total) * 100,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Recruiter Dashboard</h1>
        <p className="text-slate-400 mt-2">
          Track your hiring pipeline and job performance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="relative group">
            <div
              className={`absolute -inset-0.5 bg-linear-to-r ${stat.color} to-transparent rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500`}
            ></div>
            <div className="relative p-6 bg-slate-900/50 border border-white/10 rounded-2xl">
              <div className="flex items-center justify-between">
                <stat.icon className="w-8 h-8 text-indigo-400" />
                
              </div>
              <p className="text-3xl font-bold mt-4 text-white">{stat.value}</p>
              <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Hiring Pipeline Visualization */}
      <div className="bg-slate-900/30 border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">
          Hiring Pipeline
        </h2>
        <div className="space-y-4">
          {pipelineStages.map((stage) => (
            <div key={stage.name}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300">{stage.name}</span>
                <div className="flex gap-4">
                  <span className="text-slate-400">
                    {stage.count} candidates
                  </span>
                  <span className="text-indigo-400">{stage.percentage}%</span>
                </div>
              </div>
              <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                <div
                  className={`${stage.color} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${stage.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
