"use client";

import Link from "next/link";
import { Bookmark, Briefcase, MapPin, Clock } from "lucide-react";

import { useSavedJobs } from "@/hooks/useSavedJobs";

export default function SavedJobsPage() {
  const {
    data: savedJobs = [],
    isLoading,
    isError,
  } = useSavedJobs();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Loading saved jobs...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-red-400">
        Failed to load saved jobs
      </div>
    );
  }

  return (
    <>
      {/* Add a spacer div with height of navbar */}
      <div className="h-24 md:h-28"></div>
      
      <div className="min-h-screen bg-slate-950 text-white px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* HEADER */}
          <div className="flex items-center gap-3 mb-10">
            <Bookmark className="w-8 h-8 text-indigo-400 fill-current" />

            <div>
              <h1 className="text-4xl font-bold">Saved Jobs</h1>

              <p className="text-slate-400 mt-1">
                {savedJobs.length} saved jobs
              </p>
            </div>
          </div>

          {/* REST OF YOUR COMPONENT REMAINS THE SAME */}
          <div className="space-y-5">
            {savedJobs.length > 0 ? (
              savedJobs.map((item: any) => {
                const job = Array.isArray(item.jobs)
                  ? item.jobs[0]
                  : item.jobs;

                if (!job) return null;

                return (
                  <div
                    key={item.id}
                    className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 hover:border-indigo-500/40 transition-all"
                  >
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div className="flex gap-4">
                        <div className="w-14 h-14 p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                          <Briefcase className="w-6 h-6 text-indigo-400" />
                        </div>

                        <div>
                          <h2 className="text-2xl font-bold">
                            {job.title}
                          </h2>

                          <p className="text-slate-400 mt-1">
                            {job.company}
                          </p>

                          <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-400">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {job.location}
                            </span>

                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {job.job_type}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-start md:items-end justify-between">
                        <p className="text-indigo-400 font-semibold text-lg">
                          ₹{job.salary_min?.toLocaleString()} - ₹
                          {job.salary_max?.toLocaleString()}
                        </p>

                        <Link
                          href={`/jobs/${job.id}`}
                          className="mt-4 md:mt-0 bg-white text-black px-5 py-3 rounded-xl font-semibold hover:bg-slate-200 transition-all"
                        >
                          View Job
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="border border-dashed border-white/10 rounded-2xl p-20 text-center">
                <Bookmark className="w-12 h-12 mx-auto text-slate-600 mb-4" />

                <h2 className="text-2xl font-bold">
                  No saved jobs yet
                </h2>

                <p className="text-slate-500 mt-2">
                  Save jobs to view them later.
                </p>

                <Link
                  href="/jobs"
                  className="inline-block mt-6 bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-xl font-semibold transition-all"
                >
                  Browse Jobs
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}