"use client";
import React from 'react';
import { LayoutDashboard, BrainCircuit, CalendarCheck, CheckCircle2, Users, ArrowRight } from 'lucide-react';
import { RainbowButton } from '@/components/ui/rainbow-button';
import ShinyText from '@/components/ShinyText';


const RecruiterSection = () => {
  return (
    <section className="w-full py-24 bg-[oklch(0.12_0.01_250)] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT CONTENT */}
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="text-var(--primary) font-semibold tracking-widest uppercase text-sm">For Recruiters</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight">
              Hire smarter, <br /> 
              <span className="text-white/40">not harder.</span>
            </h2>
            <p className="text-[oklch(0.80_0_0)] text-lg md:text-xl leading-relaxed max-w-lg">
              Post jobs, track applicants, and discover top talent with AI-powered matching. HireFlow+ provides everything you need to build elite teams.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <RainbowButton className="px-8 py-4 rounded-xl border-none">
              <div className="flex items-center gap-2">
                <ShinyText text="Post a Job" color="#ffffff" shineColor="var(--primary)" className="font-bold" />
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </RainbowButton>
          </div>

          {/* Quick Stats/Trust */}
          <div className="pt-8 border-t border-white/5 grid grid-cols-2 gap-8">
            <div>
              <p className="text-2xl font-bold text-white">40%</p>
              <p className="text-sm text-white/40">Faster Time-to-Hire</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">12k+</p>
              <p className="text-sm text-white/40">Vetted Candidates</p>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT (Dashboard Interface) */}
        <div className="relative group">
          {/* Decorative Glow */}
          <div className="absolute -inset-4 bg-var(--primary)/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

          <div className="relative space-y-4">
            {/* Card 1: Dashboard */}
            <div className="bg-white/3 border border-white/10 p-5 rounded-2xl backdrop-blur-xl translate-x-4 hover:translate-x-0 transition-transform duration-500">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <LayoutDashboard className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-white">Applicant Pipeline</p>
                  <p className="text-xs text-white/40 mb-3">Real-time status tracking</p>
                  {/* Visual Progress Bar */}
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="w-[75%] h-full bg-primary rounded-full shadow-[0_0_10px_var(--primary)]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: AI Match (Highlighted) */}
            <div className="bg-white/6 border border-var(--primary)/30 p-5 rounded-2xl backdrop-blur-xl z-10 relative shadow-2xl">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-var(--primary)/20 rounded-lg">
                  <BrainCircuit className="w-6 h-6 text-var(--primary)" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-bold text-white">Neural Match Score</p>
                    <span className="text-var(--primary) text-xs font-bold bg-var(--primary)/10 px-2 py-0.5 rounded">98% Match</span>
                  </div>
                  <p className="text-xs text-white/40 italic">"Top candidate identified for Senior Lead role"</p>
                </div>
              </div>
            </div>

            {/* Card 3: Scheduling */}
            <div className="bg-white/3 border border-white/10 p-5 rounded-2xl backdrop-blur-xl translate-x-8 hover:translate-x-0 transition-transform duration-500">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-500/10 rounded-lg">
                  <CalendarCheck className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="font-bold text-white">Smart Scheduler</p>
                  <div className="flex gap-2 mt-2">
                    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[10px]">JD</div>
                    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[10px]">AS</div>
                    <div className="w-8 h-8 rounded-full bg-var(--primary)/20 border border-var(--primary)/50 flex items-center justify-center text-[10px] text-var(--primary)">+3</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default RecruiterSection;