"use client";
import React from 'react';
import { Search, MapPin, ExternalLink, Users, Briefcase } from 'lucide-react';
import Link from 'next/link';

const CompaniesPage = () => {
  // Mock data for company listings
  const companies = [
    {
      id: "technova",
      name: "TechNova",
      industry: "Software & AI",
      location: "San Francisco / Remote",
      size: "500-1000",
      description: "Building the next generation of neural processing units for consumer electronics.",
      logo: "TN",
      openRoles: 12,
      color: "from-blue-500",
    },
    {
      id: "cloudscale",
      name: "CloudScale",
      industry: "Infrastructure",
      location: "Austin, TX",
      size: "100-250",
      description: "Scaling cloud infrastructure for high-growth startups with zero-downtime deployments.",
      logo: "CS",
      openRoles: 5,
      color: "from-purple-500",
    },
    {
      id: "Webskitters  ",
      name: "HireFlow",
      industry: "HR Tech",
      location: "Remote",
      size: "50-100",
      description: "Connecting elite talent with innovative companies through proprietary matching technology.",
      logo: "HF",
      openRoles: 8,
      color: "from-emerald-500",
    },
    {
      id: "Meta",
      name: "HireFlow",
      industry: "HR Tech",
      location: "Remote",
      size: "50-100",
      description: "Connecting elite talent with innovative companies through proprietary matching technology.",
      logo: "HF",
      openRoles: 8,
      color: "from-emerald-500",
    },
    {
      id: "Googel",
      name: "HireFlow",
      industry: "HR Tech",
      location: "Remote",
      size: "50-100",
      description: "Connecting elite talent with innovative companies through proprietary matching technology.",
      logo: "HF",
      openRoles: 8,
      color: "from-emerald-500",
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-32 px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Work with the <span className="text-indigo-500">best.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mb-8">
            Explore companies that are shaping the future. From seed-stage startups to global innovators.
          </p>

          {/* Company Search */}
          <div className="relative max-w-2xl group">
            <div className="absolute -inset-0.5 bg-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative flex items-center bg-slate-900 border border-white/10 p-2 rounded-2xl">
              <Search className="w-5 h-5 text-slate-500 ml-3" />
              <input 
                type="text" 
                placeholder="Search by company name or industry..." 
                className="bg-transparent w-full px-4 py-2 outline-none text-white placeholder:text-slate-500"
              />
              <button className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded-xl transition-all font-semibold">
                Find
              </button>
            </div>
          </div>
        </div>

        {/* Company Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {companies.map((company) => (
            <div key={company.id} className="group relative bg-slate-900/40 border border-white/10 rounded-3xl p-8 transition-all hover:border-indigo-500/50 hover:bg-slate-900/60 flex flex-col">
              
              {/* Header: Logo & Name */}
              <div className="flex justify-between items-start mb-6">
                <div className={`w-14 h-14 bg-gradient-to-br ${company.color} to-slate-900 rounded-2xl flex items-center justify-center text-xl font-bold border border-white/10`}>
                  {company.logo}
                </div>
                <Link href={`/companies/${company.id}`} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition">
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </Link>
              </div>

              {/* Body */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">
                  {company.name}
                </h2>
                <p className="text-sm text-indigo-400 mb-4 font-medium uppercase tracking-wider">
                  {company.industry}
                </p>
                <p className="text-slate-400 leading-relaxed mb-6">
                  {company.description}
                </p>
              </div>

              {/* Footer: Stats */}
              <div className="pt-6 border-t border-white/5 flex items-center justify-between text-sm text-slate-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {company.location.split(',')[0]}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" /> {company.size}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <Briefcase className="w-4 h-4" /> {company.openRoles} Jobs
                </div>
              </div>

              {/* Action */}
              <Link 
                href={`/companies/${company.id}`}
                className="mt-6 w-full text-center py-3 bg-white/5 hover:bg-white/10 rounded-xl font-medium transition"
              >
                View Company Profile
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompaniesPage;