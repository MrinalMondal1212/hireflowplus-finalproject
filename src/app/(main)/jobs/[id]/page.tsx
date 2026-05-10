"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import {
  MapPin,
  Briefcase,
  Calendar,
  ChevronLeft,
  Share2,
  Bookmark,
  ExternalLink,
  ShieldCheck,
  CircleDollarSign,
} from "lucide-react";
import Link from "next/link";
import { useApplyJob } from "@/hooks/useApplyJobs";
import { useProfile } from "@/hooks/userProfile";
import { useCheckApplied } from "@/hooks/useCheckApplied";
import { toast } from "sonner";
import { useSaveJob } from "@/hooks/useSaveJob";
import { useSavedJobsStore } from "@/store/useSavedJobsStore";

// Helper for company logo fallback
function getInitials(name: string = "") {
  if (!name) return "NA";
  const words = name.trim().split(" ");
  if (words.length === 1) return words[0][0].toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export default function JobDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const { mutate: saveJob } = useSaveJob();

  const {
    data: job,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["job", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    },
  });
  const { data: profile } = useProfile(); // ✅ rename properly
  const { mutate: applyJob, isPending } = useApplyJob();
  const { data: appliedData, isLoading: boolean } = useCheckApplied(job?.id);
  const savedJobs = useSavedJobsStore((s: any) => s.savedJobs);

  const isSaved = savedJobs.includes(job?.id);

  const handleApply = () => {
    if (!profile) {
      toast.error("Please login first to apply");
      router.push("/login");
      return;
    }

    if (!profile.resume_url) {
      alert("Upload resume first");
      return;
    }

    applyJob(
      {
        jobId: job.id,
        resume_url: profile.resume_url,
      },
      {
        onSuccess: () => {
          alert("Applied successfully!");
        },
        onError: (err: any) => {
          alert(err.message);
        },
      },
    );
  };

  if (isLoading)
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center gap-4">
        <p className="text-rose-400 font-medium">Failed to load job details.</p>
        <Link href="/jobs" className="text-indigo-400 hover:underline">
          Return to listings
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 pb-20">
      {/* 🌌 Background Accents */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-125 h-125 bg-indigo-600/10 blur-[120px] rounded-full opacity-50" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pt-32">
        {/* 🔙 Back & Actions */}
        <div className="flex justify-between items-center mb-10">
          <Link
            href="/jobs"
            className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-all">
              <ChevronLeft className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium">Back to search</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* 📄 Main Content Area */}
          <div className="lg:col-span-8 space-y-10">
            {/* Header Info */}
            <div className="space-y-6">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-linear-to-br from-indigo-600 to-violet-700 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-xl shadow-indigo-500/20">
                  {getInitials(job.company)}
                </div>
                <div>
                  <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">
                    {job.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-slate-400">
                    <span className="flex items-center gap-1.5 font-medium text-indigo-400">
                      {job.company_name}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" /> {job.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">
                    Salary Range
                  </p>
                  <p className="text-white font-mono font-semibold flex items-center gap-1.5">
                    <CircleDollarSign className="w-4 h-4 text-emerald-400" />₹
                    {job.salary_min?.toLocaleString()} - ₹
                    {job.salary_max?.toLocaleString()}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">
                    Job Type
                  </p>
                  <p className="text-white font-semibold flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-indigo-400" />{" "}
                    {job.job_type}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 md:col-span-1 col-span-2">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">
                    Posted On
                  </p>
                  <p className="text-white font-semibold flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-sky-400" />{" "}
                    {new Date(job.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="p-8  rounded-[2rem] bg-slate-900/20 border border-white/5 backdrop-blur-sm">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                About the role
              </h2>
              <div className="prose prose-invert max-w-none text-slate-400 leading-relaxed space-y-4">
                {job.description
                  ? job.description
                  : "No detailed description provided."}
              </div>

              <h2 className="text-xl font-bold text-white mt-10 mb-6">
                Required Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {job.skills?.map((skill: string) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-indigo-500/5 border border-indigo-500/10 rounded-xl text-sm text-white font-medium  transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 🚀 Sidebar: Apply Action */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-6">
              <div className="p-8 rounded-[2rem] bg-indigo-600 border border-indigo-400/30 shadow-2xl shadow-indigo-600/20 relative overflow-hidden group transition-all hover:-translate-y-1">
                {/* Visual Flair */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 blur-3xl rounded-full" />

                <h3 className="text-xl font-bold text-white mb-2 relative z-10">
                  Ready to apply?
                </h3>

                <p className="text-indigo-100 text-sm mb-8 relative z-10 opacity-90 leading-relaxed">
                  Join {job.company_name} and take the next step in your
                  professional journey.
                </p>

                {/* APPLY BUTTON */}
                <button
                  onClick={handleApply}
                  disabled={isPending || appliedData}
                  className={`w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-xl flex items-center justify-center gap-2 relative z-10
          
          ${
            appliedData
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-white text-indigo-600 hover:bg-slate-100 active:scale-95"
          }
        `}
                >
                  {appliedData
                    ? "Already Applied"
                    : isPending
                      ? "Applying..."
                      : "Apply Now"}

                  <ExternalLink className="w-5 h-5" />
                </button>

                {/* SAVE BUTTON */}
                <button
                  onClick={() => {
                    saveJob(job.id, {
                      onSuccess: () => {
                        toast.success("Job saved successfully");
                      },

                      onError: (err: any) => {
                        if (err.message === "LOGIN_REQUIRED") {
                          toast.error("Please login first");
                          router.push("/login");
                          return;
                        }

                        toast.error(err.message);
                      },
                    });
                  }}
                  className={`mt-4 w-full py-4 rounded-2xl border font-semibold transition-all duration-300 flex items-center justify-center gap-2

          ${
            isSaved
              ? "bg-white text-black border-white"
              : "bg-white/10 text-white border-white/20 hover:bg-white/20"
          }
        `}
                >
                  <Bookmark
                    className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`}
                  />

                  {isSaved ? "Saved Job" : "Save Job"}
                </button>

                {/* VERIFIED */}
                <div className="mt-6 flex items-center justify-center gap-2 text-indigo-200 text-xs font-medium relative z-10">
                  <ShieldCheck className="w-4 h-4" />
                  Verified Recruiter
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
