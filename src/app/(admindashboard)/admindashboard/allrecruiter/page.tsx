// app/admindashboard/allrecruiter/page.tsx
"use client";
import React, { useState } from "react";
import {
  Search,
  MoreVertical,
  Shield,
  Ban,
  CheckCircle,
  Mail,
  Building,
  Calendar,
} from "lucide-react";
import { useAllRecruiters } from "@/hooks/useAllRecruiters";
import { useToggleRecruiterStatus } from "@/hooks/useToggleRecruiterStatus";

export default function AllRecruiters() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { data: recruiters = [], isLoading } = useAllRecruiters();

  const toggleRecruiter = useToggleRecruiterStatus();

 

const filteredRecruiters = recruiters.filter((recruiter:any) => {
  const matchesSearch =
    (recruiter.full_name || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||

    (recruiter.email || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

  const matchesStatus =
    statusFilter === "all" ||
    recruiter.status === statusFilter;

  return matchesSearch && matchesStatus;
});

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Recruiters Management</h1>
        <p className="text-slate-400 mt-2">
          Manage and monitor all recruiter accounts
        </p>
      </div>

      {/* Filters */}
      <div className="bg-slate-900/30 border border-white/10 rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search by recruiter name or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Recruiters Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredRecruiters.map((recruiter) => (
          <div
            key={recruiter.id}
            className="bg-slate-900/30 border border-white/10 rounded-2xl p-6 hover:border-indigo-500/50 transition-all"
          >
            <div className="flex flex-wrap justify-between items-start gap-4">
              {/* Left Section */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-white">
                    {recruiter.full_name || "Recruiter"}
                  </h3>
                  {recruiter.verified && (
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  )}
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      recruiter.status === "active"
                        ? "bg-emerald-400/10 text-emerald-400"
                        : "bg-red-400/10 text-red-400"
                    }`}
                  >
                    {recruiter.status}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{recruiter.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Building className="w-4 h-4" />
                    <span className="text-sm">{recruiter.company || "No Company Added"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                     Joined: {new Date(recruiter.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">
                      {recruiter.totalJobs}
                    </p>
                    <p className="text-xs text-slate-400">Jobs Posted</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 rounded-xl transition-all">
                  <Shield className="w-4 h-4" />
                  Verify
                </button>
                {recruiter.status === "active" ? (
                  <button className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-xl transition-all">
                    <Ban className="w-4 h-4" />
                    Suspend
                  </button>
                ) : (
                  <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 rounded-xl transition-all">
                    <CheckCircle className="w-4 h-4" />
                    Activate
                  </button>
                )}
                <button className="p-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl transition-all">
                  <MoreVertical className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
