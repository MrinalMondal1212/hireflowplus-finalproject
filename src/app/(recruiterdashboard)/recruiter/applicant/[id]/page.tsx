"use client";
import { useState } from "react";
import {
  Download,
  Calendar,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  ChevronLeft,
  Mail,
  MapPin,
  Award,
  BookOpen,
  Star,
  View,
  Eye,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, useRouter } from "next/navigation";
import { useCandidateDetails } from "@/hooks/useCandidateDetails";

import { Button } from "@mui/material";
import { useRecruiterNotes } from "@/hooks/useRecruiterNotes";
import { useScheduleInterview } from "@/hooks/useScheduleInterview";
import { toast } from "sonner";
import { useUpdateApplicationStatus } from "@/hooks/useApplicationUpdateStatus";

export default function CandidateProfile() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const updateStatus = useUpdateApplicationStatus();
  const recruiterNotes = useRecruiterNotes();
  const [note, setNote] = useState("");
  const [rating, setRating] = useState(0);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [meetingLink, setMeetingLink] = useState("");
  const scheduleInterview = useScheduleInterview();

  const { data: application, isLoading, isError } = useCandidateDetails(id);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (isError || !application)
    return (
      <div className="p-10 text-white text-center">
        Candidate data not found.
      </div>
    );

  // We mapped profiles as 'profile' in our Supabase join
  const candidate = application.profile;
  const currentStatus = application.status;
  const isRejected = currentStatus === "rejected";
  const isShortlisted = currentStatus === "shortlisted";

  const actionCompleted = isRejected || isShortlisted;
  const interviewScheduled = application.interview_status === "scheduled";

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-6">
      {/* Navigation */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Applicants
      </button>

      {/* Header Section */}
      <div className="flex flex-wrap justify-between items-start gap-6 bg-slate-900/40 p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-sm">
        <div className="flex gap-6 items-center">
          <div className="w-24 h-24 bg-linear-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-2xl border-4 border-[#020617]">
            {candidate?.name?.charAt(0) || "?"}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">
              {candidate?.name || "Anonymous Candidate"}
            </h1>
            <div className="flex flex-wrap gap-6 mt-3 text-slate-400 text-sm">
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400" /> {candidate?.email}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-400" />{" "}
                {candidate?.location || "Remote"}
              </span>
              {candidate?.phone && (
                <span className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-indigo-400" />{" "}
                  {candidate?.phone}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          {/* this is the calender button !!!! */}
          <button
            disabled={interviewScheduled}
            onClick={() => setShowScheduleModal(true)}
            className={`
    flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all
    ${
      interviewScheduled
        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 cursor-not-allowed opacity-70"
        : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 cursor-pointer"
    }
  `}
          >
            <Calendar className="w-4 h-4" />

            {interviewScheduled ? "Interview Scheduled" : "Schedule"}
          </button>
          {application.resume_url && (
            <a
              href={application.resume_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold transition-all"
            >
              <Eye className="w-5 h-5" /> Resume
            </a>
          )}
        </div>
      </div>
      {/* Current Application Status */}
      <div
        className={`rounded-3xl border p-5 flex items-center gap-4 ${
          currentStatus === "rejected"
            ? "bg-rose-500/10 border-rose-500/20"
            : currentStatus === "shortlisted"
              ? "bg-emerald-500/10 border-emerald-500/20"
              : "bg-amber-500/10 border-amber-500/20"
        }`}
      >
        {currentStatus === "rejected" ? (
          <>
            <XCircle className="w-8 h-8 text-rose-400" />

            <div>
              <h3 className="text-rose-400 font-bold text-lg">
                Candidate Rejected
              </h3>

              <p className="text-slate-300 text-sm">
                This candidate was rejected for this role.
              </p>
            </div>
          </>
        ) : currentStatus === "shortlisted" ? (
          <>
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />

            <div>
              <h3 className="text-emerald-400 font-bold text-lg">
                Candidate Shortlisted
              </h3>

              <p className="text-slate-300 text-sm">
                Candidate moved to the next hiring stage.
              </p>
            </div>
          </>
        ) : (
          <>
            <Clock className="w-8 h-8 text-amber-400" />

            <div>
              <h3 className="text-amber-400 font-bold text-lg">
                Application Pending
              </h3>

              <p className="text-slate-300 text-sm">
                Recruiter review is still pending.
              </p>
            </div>
          </>
        )}
      </div>
      {interviewScheduled && application.interview_date && (
        <div className="rounded-3xl border border-indigo-500/20 bg-indigo-500/10 p-5 flex items-start gap-4">
          <Calendar className="w-8 h-8 text-indigo-400 mt-1" />

          <div>
            <h3 className="text-indigo-300 font-bold text-lg">
              Interview Scheduled
            </h3>

            <p className="text-slate-300 text-sm mt-1">
              Interview has been scheduled successfully.
            </p>

            <p className="text-slate-400 text-sm mt-3">
              {new Date(application.interview_date).toLocaleString()}
            </p>

            {application.meeting_link && (
              <a
                href={application.meeting_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all"
              >
                Join Meeting
              </a>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* About / Bio */}
          <div className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-10 backdrop-blur-sm">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
              About Candidate
            </h3>
            <p className="text-slate-300 leading-relaxed text-lg whitespace-pre-line">
              {candidate?.bio || "No bio provided by the candidate."}
            </p>
          </div>

          {/* Education & Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/40 border border-white/5 rounded-[2rem] p-8">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Education
              </h3>
              <p className="text-white font-medium text-lg">
                {candidate?.education || "Not specified"}
              </p>
            </div>
            <div className="bg-slate-900/40 border border-white/5 rounded-[2rem] p-8">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                <Award className="w-4 h-4" /> Experience
              </h3>
              <p className="text-white font-medium text-lg">
                {candidate?.experience || "Not specified"}
              </p>
            </div>
          </div>

          {/* Skills Section */}
          <div className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-10">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">
              Technical Skills
            </h3>
            <div className="flex flex-wrap gap-3">
              {Array.isArray(candidate?.skills) ? (
                candidate.skills.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="px-5 py-2 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl text-sm font-medium text-indigo-300"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-slate-500">No skills listed.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Actions */}
        <div className="space-y-6">
          <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-[2.5rem] p-8">
            <h2 className="text-xl font-bold text-white mb-6">Decision</h2>
            <div className="space-y-4 flex gap-5 flex-col">
              {/* Shortlist Button */}
              <Button
                disabled={actionCompleted}
                variant="contained"
                onClick={() => {
                  updateStatus.mutate(
                    {
                      applicationId: application.id,
                      status: "shortlisted",
                    },
                    {
                      onSuccess: () => {
                        toast.success("Candidate shortlisted");
                      },

                      onError: () => {
                        toast.error("Failed to update status");
                      },
                    },
                  );
                }}
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1.5,
                  py: 2,
                  px: 2,
                  borderRadius: "16px",
                  fontWeight: "bold",
                  textTransform: "none",

                  backgroundColor: actionCompleted ? "#334155" : "#059669",

                  color: "#ffffff",

                  opacity: actionCompleted ? 0.6 : 1,

                  cursor: actionCompleted ? "not-allowed" : "pointer",

                  boxShadow: actionCompleted
                    ? "none"
                    : "0 10px 15px -3px rgba(16, 185, 129, 0.2)",

                  transition: "all 0.2s",

                  "&:hover": {
                    backgroundColor: actionCompleted ? "#334155" : "#10b981",

                    boxShadow: actionCompleted
                      ? "none"
                      : "0 20px 25px -5px rgba(16, 185, 129, 0.3)",
                  },
                }}
              >
                <ThumbsUp size={20} />

                {isShortlisted ? "Shortlisted" : "Shortlist"}
              </Button>

              {/* Reject Button */}
              <Button
                disabled={actionCompleted}
                variant="outlined"
                onClick={() => {
                  updateStatus.mutate(
                    {
                      applicationId: application.id,
                      status: "rejected",
                    },
                    {
                      onSuccess: () => {
                        toast.success("Candidate rejected");
                      },

                      onError: () => {
                        toast.error("Failed to update status");
                      },
                    },
                  );
                }}
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1.5,
                  py: 2,
                  px: 2,
                  borderRadius: "16px",
                  fontWeight: "bold",
                  textTransform: "none",

                  color: actionCompleted ? "#94a3b8" : "#f43f5e",

                  backgroundColor: actionCompleted
                    ? "#1e293b"
                    : "rgba(225, 29, 72, 0.1)",

                  borderColor: actionCompleted
                    ? "#334155"
                    : "rgba(225, 29, 72, 0.2)",

                  opacity: actionCompleted ? 0.6 : 1,

                  cursor: actionCompleted ? "not-allowed" : "pointer",

                  transition: "all 0.2s",

                  "&:hover": {
                    backgroundColor: actionCompleted ? "#1e293b" : "#e11d48",

                    color: actionCompleted ? "#94a3b8" : "#ffffff",

                    borderColor: actionCompleted ? "#334155" : "#e11d48",
                  },
                }}
              >
                <ThumbsDown size={20} />

                {isRejected ? "Rejected" : "Reject"}
              </Button>
            </div>
          </div>
          {/* this is the section where you can send message and give rating to  user  */}
          <div className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-8 text-center backdrop-blur-sm">
            <MessageSquare className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-white font-bold mb-2">Message Candidate</h3>
            <p className="text-slate-400 text-sm mb-6">
              Start a chat regarding their application.
            </p>
            <div className="flex gap-3 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button" // Prevents form submission
                  className="cursor-pointer border-none bg-transparent p-0 outline-none"
                  key={star}
                  onClick={() => setRating(star)}
                >
                  <Star
                    size={20}
                    // Force the colors using inline styles for maximum reliability
                    style={{
                      fill: rating >= star ? "#facc15" : "transparent",
                      color: rating >= star ? "#facc15" : "#64748b",
                    }}
                  />
                </button>
              ))}
            </div>
            <textarea
              disabled={recruiterNotes.isPending}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add recruiter feedback..."
              className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-white outline-none"
            />

            <button
              onClick={() => {
                if (!note.trim()) {
                  toast.error("Please add recruiter feedback");
                  return;
                }

                recruiterNotes.mutate(
                  {
                    applicationId: application.id,
                    note,
                    rating,
                  },
                  {
                    onSuccess: () => {
                      toast.success("Feedback sent successfully");

                      setNote("");
                      setRating(0);
                    },

                    onError: () => {
                      toast.error("Failed to send feedback");
                    },
                  },
                );
              }}
              className="w-full cursor-pointer py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 font-bold transition-all"
            >
              Send direct Notes
            </button>
          </div>
        </div>
      </div>
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 max-w-lg w-full mx-4">
            <h2 className="text-2xl font-bold text-white mb-6">
              Schedule Interview
            </h2>

            {/* Calendar */}
            <div className="mb-6">
              <label className="block text-sm text-slate-400 mb-2">
                Select Interview Date & Time
              </label>

              <DatePicker
                selected={selectedDate}
                onChange={(date: any) => setSelectedDate(date)}
                showTimeSelect
                timeIntervals={30}
                dateFormat="MMMM d, yyyy h:mm aa"
                minDate={new Date()}
                placeholderText="Choose date and time"
                className="w-full bg-slate-800 border cursor-pointer border-white/10 rounded-xl p-3 text-white outline-none"
              />
            </div>

            {/* Meeting Link */}
            <div className="mb-6">
              <label className="block text-sm text-slate-400 mb-2">
                Meeting Link
              </label>

              <input
                type="text"
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
                placeholder="https://meet.google.com/..."
                className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-white outline-none"
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowScheduleModal(false)}
                className="px-5 py-2 cursor-pointer bg-slate-700 hover:bg-slate-600 rounded-xl text-white"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  if (!selectedDate) {
                    toast.error("Please select interview date");
                    return;
                  }

                  scheduleInterview.mutate(
                    {
                      applicationId: application.id,
                      interviewDate: selectedDate,
                      meetingLink,
                    },
                    {
                      onSuccess: () => {
                        toast.success("Interview scheduled");

                        setShowScheduleModal(false);

                        setSelectedDate(null);
                        setMeetingLink("");
                      },

                      onError: () => {
                        toast.error("Failed to schedule interview");
                      },
                    },
                  );
                }}
                className="px-5 py-2 cursor-pointer p-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white"
              >
                Confirm Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
