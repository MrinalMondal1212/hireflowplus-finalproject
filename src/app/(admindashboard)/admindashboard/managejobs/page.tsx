// app/admindashboard/managejobs/page.tsx
"use client";

import React, { useState } from "react";

import {
  Search,
  Building,
  MapPin,
  Clock,
  Trash2,
} from "lucide-react";



import { useAllJobs } from "@/hooks/useAllJobs";
import { useDeleteJob } from "@/hooks/useDeleteJobs";

export default function ManageJobs() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: jobs = [], isLoading } = useAllJobs();

  const deleteJob = useDeleteJob();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading jobs...
      </div>
    );
  }

  const filteredJobs = jobs.filter((job: any) => {
    return (
      job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Manage Job Listings
        </h1>

        <p className="text-slate-400 mt-2">
          View and delete job postings from the platform
        </p>
      </div>

      {/* Search */}
      <div className="bg-slate-900/30 border border-white/10 rounded-2xl p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />

          <input
            type="text"
            placeholder="Search by job title or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-slate-900/30 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50 border-b border-white/10">
              <tr>
                <th className="text-left p-4 text-slate-400 font-medium">
                  Job Details
                </th>

                <th className="text-left p-4 text-slate-400 font-medium">
                  Company
                </th>

                

                <th className="text-left p-4 text-slate-400 font-medium">
                  Posted Date
                </th>

                <th className="text-left p-4 text-slate-400 font-medium">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredJobs.map((job: any) => (
                <tr
                  key={job.id}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  {/* Job Details */}
                  <td className="p-4">
                    <div>
                      <p className="text-white font-medium">
                        {job.title}
                      </p>

                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <MapPin className="w-3 h-3" />
                          {job.location || "Remote"}
                        </div>

                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <Clock className="w-3 h-3" />
                          {new Date(job.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Company */}
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-slate-400" />

                      <div>
                        <p className="text-white text-sm">
                          {job.company || "Unknown Company"}
                        </p>

                        <p className="text-xs text-slate-500">
                          Posted by recruiter
                        </p>
                      </div>
                    </div>
                  </td>

                

                  {/* Date */}
                  <td className="p-4">
                    <p className="text-sm text-slate-300">
                      {new Date(job.created_at).toLocaleDateString()}
                    </p>
                  </td>

                  {/* Delete */}
                  <td className="p-4">
                    <button
                      onClick={() => deleteJob.mutate(job.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 rounded-xl transition text-red-400 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />

                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {filteredJobs.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-10 text-slate-500"
                  >
                    No jobs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}