"use client";

import { HelpCircle, Mail, ShieldCheck } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white pt-32 px-6 pb-16">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="w-8 h-8 text-indigo-400" />
          <h1 className="text-4xl font-bold">Help Center</h1>
        </div>

        <p className="text-slate-400 mb-10">
          Need help with HireFlow+? Here are some quick answers.
        </p>

        <div className="space-y-6">
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-2">
              How do I apply for jobs?
            </h2>

            <p className="text-slate-400">
              Browse jobs, open a job details page, and click the apply button.
            </p>
          </div>

          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-2">
              How do recruiters post jobs?
            </h2>

            <p className="text-slate-400">
              Recruiters can create and manage jobs from their dashboard.
            </p>
          </div>

          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-2">
              Need more support?
            </h2>

            <div className="flex items-center gap-2 text-indigo-400 mt-3">
              <Mail className="w-4 h-4" />
              hello@hireflow.plus
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}