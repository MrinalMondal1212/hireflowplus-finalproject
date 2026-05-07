"use client";

import {
  Briefcase,
  ChevronRight,
  CheckCircle2,
  Clock,
  XCircle,
  Calendar,
  Star,
  Video,
} from "lucide-react";

import { useApplications } from "@/hooks/useApplications";

export default function ApplicationsPage() {
  const { data: applications = [], isLoading } = useApplications();

  if (isLoading) {
    return <div className="p-10 text-white">Loading applications...</div>;
  }
  console.log(applications)

const getStatusUI = (status: string) => {
  switch (status) {
    case "shortlisted":
      return {
        icon: CheckCircle2,
        className:
          "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      };

    case "rejected":
      return {
        icon: XCircle,
        className:
          "bg-rose-500/10 text-rose-400 border-rose-500/30",
      };

    default:
      return {
        icon: Clock,
        className:
          "bg-amber-500/10 text-amber-400 border-amber-500/30",
      };
  }
};

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Applications History</h1>

        <p className="text-slate-400 mt-2">
          Track your job applications and recruiter updates.
        </p>
      </div>

      <div className="space-y-5">
        {applications?.map((app: any) => {
          const statusUI = getStatusUI(app.status);
          const StatusIcon = statusUI.icon;

          return (
            <div
              key={app.id}
              className="bg-slate-900/40 border border-white/10 rounded-3xl p-6 hover:border-indigo-500/20 transition-all"
            >
              {/* Top Section */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                {/* Left */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-indigo-500/10 rounded-2xl">
                    <Briefcase className="w-6 h-6 text-indigo-400" />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {app.jobs?.title}
                    </h2>

                    <p className="text-slate-400 mt-1">{app.jobs?.company}</p>

                    <p className="text-sm text-slate-500 mt-1">
                      Applied on {new Date(app.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div
                  className={`
    inline-flex items-center gap-2 
    px-4 py-2 rounded-full border 
    text-sm font-semibold capitalize
    ${statusUI.className}
  `}
                >
                  <StatusIcon className="w-4 h-4" />

                  <span>
                    {app.status === "rejected"
                      ? "Application Rejected"
                      : app.status === "shortlisted"
                        ? "Shortlisted"
                        : "Pending Review"}
                  </span>
                </div>
              </div>

              {/* Recruiter Notes */}
              {app.recruiter_note && (
                <div className="mt-6 bg-white/5 border border-white/5 rounded-2xl p-4">
                  <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">
                    Recruiter Feedback
                  </p>

                  <p className="text-slate-300">{app.recruiter_note}</p>

                  {app.recruiter_rating && (
                    <div className="flex items-center gap-2 mt-4">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />

                      <span className="text-yellow-400 font-semibold">
                        {app.recruiter_rating}/5
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Interview Section */}
              {app.interview_date && (
                <div className="mt-6 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-indigo-300 font-semibold">
                    <Calendar className="w-5 h-5" />
                    Interview Scheduled
                  </div>

                  <p className="text-slate-300 mt-2">
                    {new Date(app.interview_date).toLocaleString()}
                  </p>

                  {app.meeting_link && (
                    <a
                      href={app.meeting_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all"
                    >
                      <Video className="w-4 h-4" />
                      Join Meeting
                    </a>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
