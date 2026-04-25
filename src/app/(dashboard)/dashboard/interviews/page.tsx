import React from 'react';
import { Calendar, Video, Clock, ExternalLink } from 'lucide-react';

export default function InterviewsPage() {
  const interviews = [
    {
      id: 1,
      company: "TechNova",
      role: "Frontend Engineer",
      date: "Monday, Oct 27",
      time: "10:30 AM",
      type: "Google Meet",
      status: "Upcoming"
    },
    {
      id: 2,
      company: "CloudScale",
      role: "React Developer",
      date: "Wednesday, Oct 29",
      time: "2:00 PM",
      type: "Zoom Call",
      status: "Upcoming"
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Interview Schedule</h1>
      
      <div className="grid gap-4">
        {interviews.map((item) => (
          <div key={item.id} className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 group hover:border-indigo-500/50 transition-all">
            <div className="flex items-center gap-6 w-full md:w-auto">
              <div className="w-16 h-16 bg-indigo-600/10 border border-indigo-500/20 rounded-2xl flex flex-col items-center justify-center text-indigo-400">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{item.company}</h3>
                <p className="text-slate-400">{item.role}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 items-center text-slate-300">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span>{item.date} at {item.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-indigo-400" />
                <span>{item.type}</span>
              </div>
            </div>

            <button className="w-full md:w-auto px-6 py-2 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors">
              Join Meeting <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}