"use client";

import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white pt-32 px-6 pb-16">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-8 h-8 text-indigo-400" />
          <h1 className="text-4xl font-bold">Terms & Conditions</h1>
        </div>

        <div className="space-y-6 text-slate-400 leading-relaxed">
          <p>
            Users must provide accurate information while creating accounts and
            profiles on HireFlow+.
          </p>

          <p>
            Recruiters are responsible for the jobs they publish and candidates
            they contact.
          </p>

          <p>
            HireFlow+ reserves the right to remove inappropriate content,
            suspend accounts, or update these terms at any time.
          </p>
        </div>
      </div>
    </div>
  );
}