// app/admindashboard/alluser/page.tsx
"use client";
import React, { useState } from 'react';
import { Search, Ban, CheckCircle, Mail, Phone, MapPin, Briefcase, Clock } from 'lucide-react';

export default function AllUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [userTypeFilter, setUserTypeFilter] = useState('all');

  // Mock user data
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 234 567 8900",
      location: "San Francisco, CA",
      type: "job_seeker",
      status: "active",
      applicationsCount: 23,
      joinedDate: "2023-06-10",
      skills: ["React", "TypeScript", "Node.js"]
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "+1 234 567 8901",
      location: "New York, NY",
      type: "job_seeker",
      status: "suspended",
      applicationsCount: 8,
      joinedDate: "2023-09-15",
      skills: ["Python", "Django", "PostgreSQL"]
    },
    {
      id: 3,
      name: "Robert Brown",
      email: "robert@techcorp.com",
      phone: "+1 234 567 8902",
      location: "Austin, TX",
      type: "recruiter",
      status: "active",
      applicationsCount: 156,
      joinedDate: "2023-07-22",
      company: "Tech Corp"
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = userTypeFilter === 'all' || user.type === userTypeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">User Management</h1>
        <p className="text-slate-400 mt-2">Manage all platform users (job seekers & recruiters)</p>
      </div>

      {/* Filters */}
      <div className="bg-slate-900/30 border border-white/10 rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <select
            value={userTypeFilter}
            onChange={(e) => setUserTypeFilter(e.target.value)}
            className="px-4 py-2 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Users</option>
            <option value="job_seeker">Job Seekers</option>
            <option value="recruiter">Recruiters</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-slate-900/30 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50 border-b border-white/10">
              <tr>
                <th className="text-left p-4 text-slate-400 font-medium">User</th>
                <th className="text-left p-4 text-slate-400 font-medium">Contact</th>
                <th className="text-left p-4 text-slate-400 font-medium">Type</th>
                <th className="text-left p-4 text-slate-400 font-medium">Activity</th>
                <th className="text-left p-4 text-slate-400 font-medium">Status</th>
                <th className="text-left p-4 text-slate-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition">
                  <td className="p-4">
                    <div>
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-xs text-slate-400">ID: #{user.id}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-slate-300 text-sm">
                        <Mail className="w-3 h-3" />
                        {user.email}
                      </div>
                      {user.phone && (
                        <div className="flex items-center gap-2 text-slate-400 text-xs">
                          <Phone className="w-3 h-3" />
                          {user.phone}
                        </div>
                      )}
                      {user.location && (
                        <div className="flex items-center gap-2 text-slate-400 text-xs">
                          <MapPin className="w-3 h-3" />
                          {user.location}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.type === 'recruiter' 
                        ? 'bg-purple-500/10 text-purple-400'
                        : 'bg-blue-500/10 text-blue-400'
                    }`}>
                      {user.type === 'recruiter' ? 'Recruiter' : 'Job Seeker'}
                    </span>
                    {user.type === 'recruiter' && user.company && (
                      <p className="text-xs text-slate-400 mt-1">{user.company}</p>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-white">
                        <Briefcase className="w-3 h-3" />
                        {user.applicationsCount} applications
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Clock className="w-3 h-3" />
                        Joined: {user.joinedDate}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.status === 'active' 
                        ? 'bg-emerald-400/10 text-emerald-400'
                        : 'bg-red-400/10 text-red-400'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      {user.status === 'active' ? (
                        <button className="p-2 bg-red-600/20 hover:bg-red-600/30 rounded-lg transition">
                          <Ban className="w-4 h-4 text-red-400" />
                        </button>
                      ) : (
                        <button className="p-2 bg-emerald-600/20 hover:bg-emerald-600/30 rounded-lg transition">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                        </button>
                      )}
                    </div>
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