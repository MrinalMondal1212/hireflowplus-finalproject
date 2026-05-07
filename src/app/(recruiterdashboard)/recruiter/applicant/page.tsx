"use client";
import { useApplicants } from "@/hooks/useApplicants";
import { useAuthStore } from "@/store/useAuthStore";
import { CheckCircle, Clock, Eye, XCircle } from "lucide-react";
import Link from "next/link";

const getStatusDetails = (status: string) => {
  const map: any = {
    pending: {
      icon: Clock,
      text: "Pending",
      color: "bg-amber-500/10 text-amber-500",
    },
    shortlisted: {
      icon: CheckCircle,
      text: "Shortlisted",
      color: "bg-emerald-500/10 text-emerald-500",
    },
    rejected: {
      icon: XCircle,
      text: "Rejected",
      color: "bg-rose-500/10 text-rose-500",
    },
  };
  return map[status?.toLowerCase()] || map.pending;
};

export default function ApplicantsList() {
  const user = useAuthStore((s) => s.user);
  const recruiterId = user?.id;
  console.log(user?.id);

  const { data: applicants = [], isLoading } = useApplicants(recruiterId);

  if (isLoading)
    return <div className="p-10 text-white">Loading applicants...</div>;

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold text-white">Applicants Management</h1>

      <div className="grid grid-cols-1 gap-4">
        {applicants.length === 0 ? (
          <div className="p-10 border border-dashed border-white/10 rounded-2xl text-center text-slate-500">
            No applicants found for your postings.
          </div>
        ) : (
          applicants.map((app: any) => {
            const status = getStatusDetails(app.status);
            return (
              <div
                key={app.id}
                className="bg-slate-900/30 border border-white/10 rounded-2xl p-6"
              >
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-semibold text-white">
                        {app.profile?.name}
                      </h3>
                      <div
                        className={`flex items-center gap-1 px-2 py-1 rounded-full ${status.color}`}
                      >
                        <status.icon className="w-3 h-3" />
                        <span className="text-xs">{status.text}</span>
                      </div>
                    </div>
                    <p className="text-indigo-400 text-sm mb-4">
                      Applied for: {app.job?.title}
                    </p>

                    {/* Skills rendering fix */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {app.profile?.skills?.map(
                        (skill: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded-lg text-xs"
                          >
                            {skill}
                          </span>
                        ),
                        <div className="mt-4">
                          {app.status === "rejected" && (
                            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-medium">
                              <XCircle className="w-4 h-4" />
                              Candidate Rejected
                            </div>
                          )}

                          {app.status === "shortlisted" && (
                            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
                              <CheckCircle className="w-4 h-4" />
                              Candidate Shortlisted
                            </div>
                          )}
                        </div>,
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/recruiter/applicant/${app.id}`}
                      className="p-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700"
                    >
                      <Eye className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
