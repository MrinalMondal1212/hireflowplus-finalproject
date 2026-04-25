import React from 'react';
import { Briefcase, ChevronRight, CheckCircle2, Clock, XCircle } from 'lucide-react';

export default function ApplicationsPage() {
  const applications = [
    { company: "Google", role: "Software Engineer", status: "In Review", date: "Applied 3 days ago" },
    { company: "Meta", role: "Frontend Dev", status: "Interviewing", date: "Applied 1 week ago" },
    { company: "Vercel", role: "UI Engineer", status: "Rejected", date: "Applied 2 weeks ago" }
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Interviewing": return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
      case "Rejected": return "text-rose-400 bg-rose-400/10 border-rose-400/20";
      default: return "text-indigo-400 bg-indigo-400/10 border-indigo-400/20";
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Applications History</h1>
      
      <div className="bg-slate-900/50 border border-white/10 rounded-3xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-slate-400">Company & Role</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-400">Date Applied</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-400">Status</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-400"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {applications.map((app, i) => (
              <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-600/10 rounded-lg">
                      <Briefcase className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <div className="font-bold">{app.company}</div>
                      <div className="text-sm text-slate-500">{app.role}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6 text-slate-400 text-sm">{app.date}</td>
                <td className="px-6 py-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(app.status)}`}>
                    {app.status}
                  </span>
                </td>
                <td className="px-6 py-6 text-right text-slate-500">
                  <ChevronRight className="w-5 h-5 inline" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}