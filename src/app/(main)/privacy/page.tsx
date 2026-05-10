"use client";

import { ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white pt-32 px-6 pb-16">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex items-center gap-3 mb-6">
          <ShieldCheck className="w-8 h-8 text-indigo-400" />
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
        </div>

        <div className="space-y-6 text-slate-400 leading-relaxed">
          <p>
            HireFlow+ collects basic account information such as your name,
            email, and profile details to improve your experience.
          </p>

          <p>
            Your information is never sold to third parties. Resume and profile
            data are only visible inside the platform.
          </p>

          <p>
            By using HireFlow+, you agree to our privacy practices and secure
            data storage policies.
          </p>
        </div>
      </div>
    </div>
  );
}