"use client";
import React, { useState } from 'react';
import { Search, MapPin, Filter, Briefcase, DollarSign, Clock } from 'lucide-react';

const JobsPage = () => {
  // Mock data for the listing
  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Engineer",
      company: "TechNova",
      location: "Remote",
      salary: "$120k - $160k",
      type: "Full-time",
      posted: "2h ago",
      tags: ["React", "TypeScript", "Tailwind"]
    },
    {
      id: 2,
      title: "Backend Developer (Node.js)",
      company: "CloudScale",
      location: "San Francisco, CA",
      salary: "$140k - $180k",
      type: "Full-time",
      posted: "5h ago",
      tags: ["Node.js", "PostgreSQL", "AWS"]
    },
    {
      id: 3,
      title: "Product Designer",
      company: "HireFlow",
      location: "Remote",
      salary: "$110k - $150k",
      type: "Contract",
      posted: "1d ago",
      tags: ["Figma", "UI/UX", "Prototyping"]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Search Area */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Find your next <span className="text-indigo-500">opportunity.</span></h1>
          <div className="flex flex-col md:flex-row gap-4 bg-slate-900/50 p-2 rounded-2xl border border-white/10 backdrop-blur-md">
            <div className="flex-1 flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-white/10">
              <Search className="text-slate-500 mr-2 w-5 h-5" />
              <input type="text" placeholder="Job title, skills..." className="bg-transparent outline-none w-full text-lg" />
            </div>
            <div className="flex-1 flex items-center px-4 py-2">
              <MapPin className="text-slate-500 mr-2 w-5 h-5" />
              <input type="text" placeholder="City or Remote" className="bg-transparent outline-none w-full text-lg" />
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-500 px-8 py-3 rounded-xl font-semibold transition-all">
              Search
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 space-y-8">
            <div>
              <h3 className="flex items-center gap-2 font-semibold mb-4 text-slate-300">
                <Filter className="w-4 h-4" /> Filters
              </h3>
              <div className="space-y-4 text-slate-400">
                <div>
                  <label className="block text-sm mb-2">Job Type</label>
                  {['Full-time', 'Contract', 'Part-time'].map(type => (
                    <div key={type} className="flex items-center gap-2 mb-1">
                      <input type="checkbox" className="accent-indigo-500" /> <span className="text-sm">{type}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-sm mb-2">Experience Level</label>
                  {['Entry', 'Mid', 'Senior', 'Lead'].map(level => (
                    <div key={level} className="flex items-center gap-2 mb-1">
                      <input type="checkbox" className="accent-indigo-500" /> <span className="text-sm">{level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Job List Grid */}
          <div className="flex-1 space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="group relative bg-slate-900/40 hover:bg-slate-900/60 border border-white/10 p-6 rounded-2xl transition-all hover:border-indigo-500/50">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-indigo-500/30">
                      <Briefcase className="text-indigo-400 w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold group-hover:text-indigo-400 transition-colors">{job.title}</h2>
                      <p className="text-slate-400">{job.company} • {job.location}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <p className="text-indigo-400 font-semibold">{job.salary}</p>
                    <div className="flex items-center gap-2 text-slate-500 text-sm mt-2">
                      <Clock className="w-4 h-4" /> {job.posted}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {job.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>

                <button className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black px-4 py-2 rounded-lg text-sm font-bold">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;