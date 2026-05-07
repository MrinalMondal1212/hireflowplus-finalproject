// app/recruiter/page.tsx
"use client"
import React from 'react';
import Link from 'next/link';
import { Briefcase, Users, CalendarCheck, Eye, TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useRecruiterJobs } from '@/hooks/useRecruiterJobs';

export default function RecruiterDashboard() {

  const {data : jobs = [],isLoading} = useRecruiterJobs()
  // Mock data - this will come from Supabase
  const stats = [
    { label: "Active Jobs", value: "8", icon: Briefcase, color: "from-indigo-600", change: "+2" },
    { label: "Total Applicants", value: "147", icon: Users, color: "from-purple-600", change: "+28" },
    { label: "Interviews Scheduled", value: "23", icon: CalendarCheck, color: "from-emerald-600", change: "+5" },
    { label: "Hiring Rate", value: "18%", icon: TrendingUp, color: "from-cyan-600", change: "+3%" }
  ];

  const activeJobs = jobs;

  const pipelineStages = [
    { name: "Applied", count: 87, color: "bg-blue-500", percentage: 59 },
    { name: "Screening", count: 34, color: "bg-yellow-500", percentage: 23 },
    { name: "Interview", count: 18, color: "bg-purple-500", percentage: 12 },
    { name: "Offer", count: 5, color: "bg-green-500", percentage: 3.5 },
    { name: "Hired", count: 3, color: "bg-emerald-500", percentage: 2.5 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Recruiter Dashboard</h1>
        <p className="text-slate-400 mt-2">Track your hiring pipeline and job performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="relative group">
            <div className={`absolute -inset-0.5 bg-linear-to-r ${stat.color} to-transparent rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500`}></div>
            <div className="relative p-6 bg-slate-900/50 border border-white/10 rounded-2xl">
              <div className="flex items-center justify-between">
                <stat.icon className="w-8 h-8 text-indigo-400" />
                <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <p className="text-3xl font-bold mt-4 text-white">{stat.value}</p>
              <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Hiring Pipeline Visualization */}
      <div className="bg-slate-900/30 border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Hiring Pipeline</h2>
        <div className="space-y-4">
          {pipelineStages.map((stage) => (
            <div key={stage.name}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300">{stage.name}</span>
                <div className="flex gap-4">
                  <span className="text-slate-400">{stage.count} candidates</span>
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

      {/* Active Jobs Section */}
      <div className="bg-slate-900/30 border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white">Active Job Postings</h2>
          <p className="text-slate-400 text-sm mt-1">Manage your current job openings</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50 border-b border-white/10">
              <tr>
                <th className="text-left p-4 text-slate-400 font-medium">Job Title</th>
                <th className="text-left p-4 text-slate-400 font-medium">Applicants</th>
                <th className="text-left p-4 text-slate-400 font-medium">Status</th>
                <th className="text-left p-4 text-slate-400 font-medium">Posted Date</th>
                <th className="text-left p-4 text-slate-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {activeJobs.map((job) => (
                <tr key={job.id} className="border-b border-white/5 hover:bg-white/5 transition">
                  <td className="p-4 font-medium text-white">{job.title}</td>
                  <td className="p-4 text-slate-300">{job.applicants}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      job.status === 'Active' 
                        ? 'bg-emerald-400/10 text-emerald-400'
                        : 'bg-slate-400/10 text-slate-400'
                    }`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-300">{job.postedDate}</td>
                  <td className="p-4">
                    <Link 
                      href={`/recruiter/jobs/${job.id}/applicants`}
                      className="text-indigo-400 hover:text-indigo-300 transition text-sm"
                    >
                      View Applicants →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}