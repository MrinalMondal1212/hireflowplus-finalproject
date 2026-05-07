"use client";

import {
  Search,
  MapPin,
  Filter,
  Briefcase,
  DollarSign,
  Clock,
} from "lucide-react";
import { useJobs } from "@/hooks/useJobs";
import { useRouter } from "next/navigation";
import Link from "next/link";


const JobsPage = () => {
  const router= useRouter()
  const { data: jobs, isLoading, isError } = useJobs();



  if (isLoading) {
    return <p>loading........</p>;
  }
  if (isError) {
    return <p>loading........</p>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header & Search Area */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Find your next <span className="text-indigo-500">opportunity.</span>
          </h1>
          <div className="flex flex-col md:flex-row gap-4 bg-slate-900/50 p-2 rounded-2xl border border-white/10 backdrop-blur-md">
            <div className="flex-1 flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-white/10">
              <Search className="text-slate-500 mr-2 w-5 h-5" />
              <input
                type="text"
                placeholder="Job title, skills..."
                className="bg-transparent outline-none w-full text-lg"
              />
            </div>
            <div className="flex-1 flex items-center px-4 py-2">
              <MapPin className="text-slate-500 mr-2 w-5 h-5" />
              <input
                type="text"
                placeholder="City or Remote"
                className="bg-transparent outline-none w-full text-lg"
              />
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
                  {["Full-time", "Contract", "Part-time"].map((type) => (
                    <div key={type} className="flex items-center gap-2 mb-1">
                      <input type="checkbox" className="accent-indigo-500" />{" "}
                      <span className="text-sm">{type}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-sm mb-2">Experience Level</label>
                  {["Entry", "Mid", "Senior", "Lead"].map((level) => (
                    <div key={level} className="flex items-center gap-2 mb-1">
                      <input type="checkbox" className="accent-indigo-500" />{" "}
                      <span className="text-sm">{level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Job List Grid */}
          <div className="flex-1 space-y-4">
            {jobs?.map((job: any) => (
              <div
                key={job.id}
                className="group relative bg-slate-900/40 hover:bg-slate-900/60 border border-white/10 p-6 rounded-2xl transition-all hover:border-indigo-500/50"
              >
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-indigo-500/30">
                      <Briefcase className="text-indigo-400 w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold group-hover:text-indigo-400 transition-colors">
                        {job.title}
                      </h2>
                      <p className="text-slate-400">
                        {job.name} • {job.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <p className="text-indigo-400 font-semibold">
                      ${job.salary_min} - {job.salary_max}
                    </p>
                    <div className="flex items-center gap-2 text-slate-500 text-sm mt-2">
                      <Clock className="w-4 h-4" /> {new Date(job.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {job.skills.map((skill:any) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <Link href={`/jobs/${job.id}`}  className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black px-4 py-2 rounded-lg text-sm font-bold">
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
