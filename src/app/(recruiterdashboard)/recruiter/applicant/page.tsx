// app/recruiter/applicant/page.tsx
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Eye, Calendar, XCircle, CheckCircle, Star, Clock } from 'lucide-react';

export default function ApplicantsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('all');
  const [skillFilter, setSkillFilter] = useState('');

  // Mock applicants data - will come from Supabase
  const applicants = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@email.com",
      position: "Senior Frontend Developer",
      experience: 5,
      skills: ["React", "TypeScript", "Next.js", "Tailwind"],
      status: "pending",
      appliedDate: "2024-01-20",
      resumeUrl: "/resumes/john-doe.pdf",
      rating: 4.5,
      notes: "Strong React background, good communication"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@email.com",
      position: "Backend Engineer",
      experience: 3,
      skills: ["Node.js", "Python", "PostgreSQL", "Docker"],
      status: "shortlisted",
      appliedDate: "2024-01-19",
      resumeUrl: "/resumes/jane-smith.pdf",
      rating: 4.8,
      notes: "Excellent system design skills"
    },
    // Add more mock data
  ];

  const filteredApplicants = applicants.filter(applicant => {
    const matchesSearch = applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          applicant.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesExperience = experienceFilter === 'all' || 
                              (experienceFilter === 'senior' && applicant.experience >= 5) ||
                              (experienceFilter === 'mid' && applicant.experience >= 2 && applicant.experience <= 4) ||
                              (experienceFilter === 'junior' && applicant.experience <= 1);
    const matchesSkills = !skillFilter || applicant.skills.some(skill => 
      skill.toLowerCase().includes(skillFilter.toLowerCase())
    );
    
    return matchesSearch && matchesExperience && matchesSkills;
  });

  const getStatusBadge = (status: string) => {
    const statuses = {
      pending: { color: 'bg-yellow-500/10 text-yellow-400', icon: Clock, text: 'Pending Review' },
      shortlisted: { color: 'bg-emerald-500/10 text-emerald-400', icon: CheckCircle, text: 'Shortlisted' },
      rejected: { color: 'bg-red-500/10 text-red-400', icon: XCircle, text: 'Rejected' },
      interviewed: { color: 'bg-blue-500/10 text-blue-400', icon: Calendar, text: 'Interviewed' },
    };
    return statuses[status as keyof typeof statuses] || statuses.pending;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Applicants Management</h1>
        <p className="text-slate-400 mt-2">Review, filter, and manage job applicants</p>
      </div>

      {/* Filters Section */}
      <div className="bg-slate-900/30 border border-white/10 rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
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

          {/* Experience Filter */}
          <select
            value={experienceFilter}
            onChange={(e) => setExperienceFilter(e.target.value)}
            className="px-4 py-2 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Experience</option>
            <option value="senior">Senior (5+ years)</option>
            <option value="mid">Mid (2-4 years)</option>
            <option value="junior">Junior (0-1 years)</option>
          </select>

          {/* Skills Filter */}
          <input
            type="text"
            placeholder="Filter by skills (React, Python, etc.)"
            value={skillFilter}
            onChange={(e) => setSkillFilter(e.target.value)}
            className="px-4 py-2 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Applicants Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredApplicants.map((applicant) => {
          const StatusBadge = getStatusBadge(applicant.status);
          return (
            <div key={applicant.id} className="bg-slate-900/30 border border-white/10 rounded-2xl p-6 hover:border-indigo-500/50 transition-all">
              <div className="flex flex-wrap justify-between items-start gap-4">
                {/* Left section - Basic Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-white">{applicant.name}</h3>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${StatusBadge.color}`}>
                      <StatusBadge.icon className="w-3 h-3" />
                      <span className="text-xs">{StatusBadge.text}</span>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm mb-2">{applicant.email}</p>
                  <p className="text-indigo-400 text-sm mb-3">{applicant.position}</p>
                  
                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {applicant.skills.map((skill, idx) => (
                      <span key={idx} className="px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded-lg text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  {/* Experience & Rating */}
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-slate-400">📅 {applicant.experience} years exp</span>
                    <span className="text-yellow-400">⭐ {applicant.rating}/5</span>
                    <span className="text-slate-500">Applied: {applicant.appliedDate}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Link
                    href={`/recruiter/applicant/${applicant.id}`}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </Link>
                  <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 rounded-xl transition-all">
                    <CheckCircle className="w-4 h-4" />
                    Shortlist
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-xl transition-all">
                    <XCircle className="w-4 h-4" />
                    Reject
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}