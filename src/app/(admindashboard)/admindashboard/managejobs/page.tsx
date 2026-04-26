// app/admindashboard/managejobs/page.tsx
"use client";
import React, { useState } from 'react';
import { Search, Filter, Eye, Ban, CheckCircle, Flag, Building, MapPin, Clock } from 'lucide-react';

export default function ManageJobs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock job listings
  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "Tech Corp",
      location: "Remote",
      postedBy: "sarah.johnson@techcorp.com",
      applicationsCount: 34,
      status: "active",
      postedDate: "2024-01-15",
      reportedCount: 0
    },
    {
      id: 2,
      title: "Fake Position - Scam Alert",
      company: "Suspicious Inc",
      location: "Unknown",
      postedBy: "scammer@email.com",
      applicationsCount: 12,
      status: "reported",
      postedDate: "2024-01-20",
      reportedCount: 8,
      reportReason: "Fraudulent posting"
    },
    {
      id: 3,
      title: "Blockchain Developer",
      company: "CryptoStart",
      location: "New York, NY",
      postedBy: "mike@cryptostart.com",
      applicationsCount: 28,
      status: "under_review",
      postedDate: "2024-01-18",
      reportedCount: 2,
      reportReason: "Suspicious requirements"
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statuses = {
      active: { color: 'bg-emerald-400/10 text-emerald-400', label: 'Active' },
      reported: { color: 'bg-red-400/10 text-red-400', label: 'Reported' },
      under_review: { color: 'bg-yellow-400/10 text-yellow-400', label: 'Under Review' },
      removed: { color: 'bg-slate-400/10 text-slate-400', label: 'Removed' }
    };
    return statuses[status as keyof typeof statuses] || statuses.active;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Job Listings Management</h1>
        <p className="text-slate-400 mt-2">Moderate and manage all job postings</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/30 border border-white/10 rounded-xl p-4">
          <p className="text-2xl font-bold text-white">1,243</p>
          <p className="text-xs text-slate-400">Total Jobs</p>
        </div>
        <div className="bg-slate-900/30 border border-white/10 rounded-xl p-4">
          <p className="text-2xl font-bold text-emerald-400">892</p>
          <p className="text-xs text-slate-400">Active Jobs</p>
        </div>
        <div className="bg-slate-900/30 border border-white/10 rounded-xl p-4">
          <p className="text-2xl font-bold text-yellow-400">45</p>
          <p className="text-xs text-slate-400">Under Review</p>
        </div>
        <div className="bg-slate-900/30 border border-white/10 rounded-xl p-4">
          <p className="text-2xl font-bold text-red-400">23</p>
          <p className="text-xs text-slate-400">Reported</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-900/30 border border-white/10 rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search by job title or company..."
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
            <option value="all">All Jobs</option>
            <option value="active">Active</option>
            <option value="under_review">Under Review</option>
            <option value="reported">Reported</option>
          </select>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-slate-900/30 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50 border-b border-white/10">
              <tr>
                <th className="text-left p-4 text-slate-400 font-medium">Job Details</th>
                <th className="text-left p-4 text-slate-400 font-medium">Company/Poster</th>
                <th className="text-left p-4 text-slate-400 font-medium">Stats</th>
                <th className="text-left p-4 text-slate-400 font-medium">Status</th>
                <th className="text-left p-4 text-slate-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job) => {
                const StatusBadge = getStatusBadge(job.status);
                return (
                  <tr key={job.id} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="p-4">
                      <div>
                        <p className="text-white font-medium">{job.title}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex items-center gap-1 text-xs text-slate-400">
                            <MapPin className="w-3 h-3" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-slate-400">
                            <Clock className="w-3 h-3" />
                            {job.postedDate}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-slate-400" />
                          <p className="text-white text-sm">{job.company}</p>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Posted by: {job.postedBy}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-center">
                        <p className="text-xl font-bold text-white">{job.applicationsCount}</p>
                        <p className="text-xs text-slate-400">Applications</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${StatusBadge.color}`}>
                          {StatusBadge.label}
                        </span>
                        {job.reportedCount > 0 && (
                          <div className="flex items-center gap-1 text-xs text-red-400">
                            <Flag className="w-3 h-3" />
                            {job.reportedCount} reports
                          </div>
                        )}
                        {job.reportReason && (
                          <p className="text-xs text-slate-400">{job.reportReason}</p>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button className="p-2 bg-indigo-600/20 hover:bg-indigo-600/30 rounded-lg transition">
                          <Eye className="w-4 h-4 text-indigo-400" />
                        </button>
                        {job.status === 'active' ? (
                          <>
                            <button className="p-2 bg-yellow-600/20 hover:bg-yellow-600/30 rounded-lg transition">
                              <Flag className="w-4 h-4 text-yellow-400" />
                            </button>
                            <button className="p-2 bg-red-600/20 hover:bg-red-600/30 rounded-lg transition">
                              <Ban className="w-4 h-4 text-red-400" />
                            </button>
                          </>
                        ) : job.status === 'reported' && (
                          <>
                            <button className="p-2 bg-green-600/20 hover:bg-green-600/30 rounded-lg transition">
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            </button>
                            <button className="p-2 bg-red-600/20 hover:bg-red-600/30 rounded-lg transition">
                              <Ban className="w-4 h-4 text-red-400" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}