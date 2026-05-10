"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { Search, MapPin, Briefcase, Clock } from "lucide-react";

import { useJobs } from "@/hooks/useJobs";

const JobsClient = () => {
  const { data: jobs = [], isLoading, isError } = useJobs();

  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const initialLocation = searchParams.get("location") || "";

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [locationTerm, setLocationTerm] = useState(initialLocation);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job: any) => {
      const searchValue = searchTerm.toLowerCase();
      const locationValue = locationTerm.toLowerCase();

      const matchTitle = job.title?.toLowerCase().includes(searchValue);

      const matchSkills = job.skills?.some((skill: string) =>
        skill.toLowerCase().includes(searchValue),
      );

      const matchCompany = job.company?.toLowerCase().includes(searchValue);

      const matchLocation = job.location
        ?.toLowerCase()
        .includes(locationValue);

      return (matchTitle || matchSkills || matchCompany) && matchLocation;
    });
  }, [jobs, searchTerm, locationTerm]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Loading jobs...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-red-400">
        Failed to load jobs
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Find your next{" "}
            <span className="text-indigo-500">opportunity.</span>
          </h1>

          {/* SEARCH BAR */}
          <div className="flex flex-col md:flex-row gap-4 bg-slate-900/50 p-2 rounded-2xl border border-white/10 backdrop-blur-md">
            <div className="flex-1 flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-white/10">
              <Search className="text-slate-500 mr-2 w-5 h-5" />

              <input
                type="text"
                placeholder="Job title, company, skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent outline-none w-full text-lg"
              />
            </div>

            <div className="flex-1 flex items-center px-4 py-2">
              <MapPin className="text-slate-500 mr-2 w-5 h-5" />

              <input
                type="text"
                placeholder="City or Remote"
                value={locationTerm}
                onChange={(e) => setLocationTerm(e.target.value)}
                className="bg-transparent outline-none w-full text-lg"
              />
            </div>

            <button className="bg-indigo-600 hover:bg-indigo-500 px-8 py-3 rounded-xl font-semibold transition-all">
              Search
            </button>
          </div>
        </div>

        {/* RESULTS */}
        <div className="mb-6">
          <p className="text-slate-400">{filteredJobs.length} jobs found</p>
        </div>

        {/* JOBS */}
        <div className="space-y-4">
          {filteredJobs.map((job: any) => (
            <div
              key={job.id}
              className="group relative bg-slate-900/40 hover:bg-slate-900/60 border border-white/10 p-6 rounded-2xl transition-all hover:border-indigo-500/50"
            >
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                    <Briefcase className="text-indigo-400 w-6 h-6" />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold">{job.title}</h2>

                    <p className="text-slate-400">
                      {job.company} • {job.location}
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      {job.job_type}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <p className="text-indigo-400 font-semibold">
                    ${job.salary_min} - ${job.salary_max}
                  </p>

                  <div className="flex items-center gap-2 text-slate-500 text-sm mt-2">
                    <Clock className="w-4 h-4" />

                    {new Date(job.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {job.skills?.map((skill: string) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <Link
                href={`/jobs/${job.id}`}
                className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black px-4 py-2 rounded-lg text-sm font-bold"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobsClient;