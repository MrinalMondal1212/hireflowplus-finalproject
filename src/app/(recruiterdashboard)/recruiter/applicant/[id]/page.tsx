// app/recruiter/applicant/[id]/page.tsx
"use client";
import React, { useState } from 'react';
import { Download, Calendar, MessageSquare, Star, ThumbsUp, ThumbsDown, Send } from 'lucide-react';

export default function CandidateProfile({ params }: { params: { id: string } }) {
  const [note, setNote] = useState('');
  const [rating, setRating] = useState(0);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  // Mock candidate data - will come from Supabase
  const candidate = {
    id: params.id,
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    experience: 5,
    currentCompany: "Tech Corp",
    education: "BS in Computer Science - Stanford University",
    skills: ["React", "TypeScript", "Next.js", "Tailwind", "Node.js"],
    resumeUrl: "/resumes/john-doe.pdf",
    coverLetter: "I am excited about this opportunity because...",
    workHistory: [
      { company: "Tech Corp", role: "Senior Frontend Developer", period: "2021-Present", description: "Led frontend development for major product" },
      { company: "Startup Inc", role: "Frontend Developer", period: "2019-2021", description: "Built responsive web applications" }
    ],
    notes: [
      { author: "Sarah Johnson", text: "Strong React background, good communication skills", date: "2024-01-21", rating: 4.5 },
      { author: "Mike Chen", text: "Excellent system design knowledge", date: "2024-01-20", rating: 4.8 }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-white">{candidate.name}</h1>
          <p className="text-slate-400 mt-1">{candidate.email} • {candidate.phone}</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowScheduleModal(true)}
            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all"
          >
            <Calendar className="w-4 h-4" />
            Schedule Interview
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-all">
            <Download className="w-4 h-4" />
            Resume
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Summary */}
          <div className="bg-slate-900/30 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Profile Summary</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-slate-400 text-sm">Experience</p>
                <p className="text-white font-medium">{candidate.experience} years</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Location</p>
                <p className="text-white font-medium">{candidate.location}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Current Company</p>
                <p className="text-white font-medium">{candidate.currentCompany}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Education</p>
                <p className="text-white font-medium">{candidate.education}</p>
              </div>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-2">Skills</p>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Work History */}
          <div className="bg-slate-900/30 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Work History</h2>
            {candidate.workHistory.map((work, idx) => (
              <div key={idx} className="mb-4 last:mb-0 pb-4 last:pb-0 border-b last:border-b-0 border-white/10">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium text-white">{work.role}</h3>
                  <span className="text-slate-400 text-sm">{work.period}</span>
                </div>
                <p className="text-indigo-400 text-sm mb-2">{work.company}</p>
                <p className="text-slate-300 text-sm">{work.description}</p>
              </div>
            ))}
          </div>

          {/* Cover Letter */}
          <div className="bg-slate-900/30 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Cover Letter</h2>
            <p className="text-slate-300">{candidate.coverLetter}</p>
          </div>
        </div>

        {/* Right Column - Notes & Ratings */}
        <div className="space-y-6">
          {/* Add Note */}
          <div className="bg-slate-900/30 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Add Notes</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-slate-400 text-sm">Rating:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => setRating(star)}>
                    <Star className={`w-5 h-5 ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`} />
                  </button>
                ))}
              </div>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Write your notes about this candidate..."
                rows={4}
                className="w-full p-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all">
                <Send className="w-4 h-4" />
                Add Note
              </button>
            </div>
          </div>

          {/* Previous Notes */}
          <div className="bg-slate-900/30 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Interviewer Notes</h2>
            <div className="space-y-4">
              {candidate.notes.map((note, idx) => (
                <div key={idx} className="pb-4 border-b border-white/10 last:border-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-white font-medium">{note.author}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < Math.floor(note.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`} />
                        ))}
                      </div>
                    </div>
                    <span className="text-slate-500 text-xs">{note.date}</span>
                  </div>
                  <p className="text-slate-300 text-sm">{note.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-slate-900/30 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 rounded-xl transition-all">
                <ThumbsUp className="w-4 h-4" />
                Shortlist Candidate
              </button>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-xl transition-all">
                <ThumbsDown className="w-4 h-4" />
                Reject Candidate
              </button>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 rounded-xl transition-all">
                <MessageSquare className="w-4 h-4" />
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Interview Modal - You'll implement this */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-2xl w-full mx-4">
            <h2 className="text-2xl font-bold text-white mb-4">Schedule Interview</h2>
            {/* Calendar component here */}
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => setShowScheduleModal(false)}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-xl"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl">
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}       