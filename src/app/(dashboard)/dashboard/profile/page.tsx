import React from 'react';
import { Mail, Phone, MapPin, Globe, Edit3 } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your Profile</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-all text-sm font-medium">
          <Edit3 className="w-4 h-4" /> Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Avatar & Basic Info */}
        <div className="lg:col-span-1 bg-slate-900/50 border border-white/10 rounded-3xl p-8 text-center">
          <div className="w-32 h-32 bg-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-bold border-4 border-white/5">
            MM
          </div>
          <h2 className="text-2xl font-bold">Mrinal Mondal</h2>
          <p className="text-indigo-400 font-medium">Full Stack Developer</p>
          
          <div className="mt-8 space-y-4 text-left">
            <div className="flex items-center gap-3 text-slate-400">
              <Mail className="w-4 h-4" /> <span>mrinal@example.com</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <Phone className="w-4 h-4" /> <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <MapPin className="w-4 h-4" /> <span>Bardhaman, India</span>
            </div>
          </div>
        </div>

        {/* Right Column: Experience/Bio */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/50 border border-white/10 rounded-3xl p-8">
            <h3 className="text-xl font-semibold mb-4">About Me</h3>
            <p className="text-slate-400 leading-relaxed">
              Transitioning from frontend to backend development with a strong focus on Node.js. 
              Experienced in React, TypeScript, and modern UI frameworks.
            </p>
          </div>
          <div className="bg-slate-900/50 border border-white/10 rounded-3xl p-8">
            <h3 className="text-xl font-semibold mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'PostgreSQL'].map(skill => (
                <span key={skill} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-300">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}