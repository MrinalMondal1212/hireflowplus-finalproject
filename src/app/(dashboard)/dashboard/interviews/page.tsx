"use client";

import {
  Calendar,
  Video,
  Clock,
  ExternalLink,
  Briefcase,
} from "lucide-react";
import { useApplications } from "@/hooks/useApplications";

export default function InterviewsPage() {
  const { data: applications = [], isLoading } = useApplications();

  // only scheduled interviews
  const interviews = applications.filter(
    (app: any) =>
      app.interview_status === "scheduled" && app.interview_date
  );

  if (isLoading) {
    return (
      <div className="p-10 text-white">
        Loading interviews...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Interview Schedule
        </h1>

        <p className="text-slate-400 mt-2">
          Track all your upcoming interviews
        </p>
      </div>

      {interviews.length === 0 ? (
        <div className="bg-slate-900/40 border border-dashed border-white/10 rounded-3xl p-10 text-center">
          <Calendar className="w-10 h-10 text-slate-600 mx-auto mb-4" />

          <h3 className="text-lg font-semibold text-white mb-2">
            No Interviews Scheduled
          </h3>

          <p className="text-slate-500">
            Recruiters haven't scheduled any interviews yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {interviews.map((item: any) => {
            const interviewDate = new Date(item.interview_date);

            return (
              <div
                key={item.id}
                className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 flex flex-col lg:flex-row justify-between gap-6 hover:border-indigo-500/40 transition-all"
              >
                {/* Left */}
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center">
                    <Briefcase className="w-7 h-7 text-indigo-400" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {item.jobs?.title}
                    </h3>

                    <p className="text-slate-400">
                      {item.jobs?.company || "Company"}
                    </p>

                    <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs border border-emerald-500/20">
                      Scheduled
                    </div>
                  </div>
                </div>

                {/* Center */}
                <div className="flex flex-col gap-3 text-slate-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-400" />

                    <span>
                      {interviewDate.toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-indigo-400" />

                    <span>
                      {interviewDate.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-indigo-400" />

                    <span>Online Interview</span>
                  </div>
                </div>

                {/* Right */}
                <div className="flex items-center">
                  <a
                    href={item.meeting_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full lg:w-auto px-6 py-3 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"
                  >
                    Join Meeting
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}