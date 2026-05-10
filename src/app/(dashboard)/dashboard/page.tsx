"use client";
import { Button } from "@/components/ui/button";
import { useApplications } from "@/hooks/useApplications";
import { SquareArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserDashboard() {
  const router = useRouter();
  const { data: applications, isLoading } = useApplications();

  const totalApplications = applications?.length || 0;

  const interviewsScheduled =
    applications?.filter((app: any) => app.interview_status === "scheduled")
      .length || 0;

  const shortlisted =
    applications?.filter((app: any) => app.status === "shortlisted").length ||
    0;

  const rejected =
    applications?.filter((app: any) => app.status === "rejected").length || 0;

  const pending =
    applications?.filter((app: any) => app.status === "pending").length || 0;

  const stats = [
    {
      label: "Total Applications",
      value: totalApplications,
      color: "from-blue-600",
    },

    {
      label: "Interviews Scheduled",
      value: interviewsScheduled,
      color: "from-purple-600",
    },

    {
      label: "Shortlisted",
      value: shortlisted,
      color: "from-emerald-600",
    },

    {
      label: "Pending",
      value: pending,
      color: "from-amber-600",
    },

    {
      label: "Rejected",
      value: rejected,
      color: "from-rose-600",
    },
  ];

  if (isLoading) {
    return <p className="text-white">Loading dashboard...</p>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Welcome back!</h1>
          <p className="text-slate-400 mt-2">
            Here is what is happening with your applications today.
          </p>
        </div>
        <div></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="relative group">
            <div
              className={`absolute -inset-0.5 bg-linear-to-r ${stat.color} to-transparent rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500`}
            ></div>
            <div className="relative p-6 bg-slate-900/50 border border-white/10 rounded-2xl">
              <p className="text-sm  uppercase tracking-wider text-slate-400">
                {stat.label}
              </p>
              <p className="text-4xl font-bold mt-2 text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900/30 border border-white/10 rounded-3xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Recent Recruiter Messages
            </h2>

            <p className="text-slate-400 text-sm mt-1">
              Latest feedback from recruiters
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {applications
            ?.filter((app: any) => app.recruiter_note)
            .slice(0, 5)
            .map((app: any) => (
              <div
                key={app.id}
                className="border border-white/5 bg-slate-800/40 rounded-2xl p-5 hover:border-indigo-500/20 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-white font-semibold">
                      {app.jobs?.title}
                    </h3>

                    <p className="text-slate-400 text-sm mt-1">
                      {app.jobs?.company}
                    </p>
                  </div>

                  <span
                    className={`
                px-3 py-1 rounded-full text-xs font-medium border
                ${
                  app.status === "shortlisted"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : app.status === "rejected"
                      ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                      : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                }
              `}
                  >
                    {app.status}
                  </span>
                </div>

                <p className="text-slate-300 mt-4 leading-relaxed">
                  {app.recruiter_note}
                </p>

                <div className="flex items-center justify-between mt-5">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-sm ${
                          star <= app.recruiter_rating
                            ? "text-yellow-400"
                            : "text-slate-600"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <span className="text-xs text-slate-500">
                    {new Date(app.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}

          {applications?.filter((app: any) => app.recruiter_note).length ===
            0 && (
            <div className="text-center py-10">
              <p className="text-slate-500">No recruiter feedback yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
