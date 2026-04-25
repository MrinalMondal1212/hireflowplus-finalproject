"use client";
import FeaturedJobs from "@/component/FeaturedJobs";
import FinalCTA from "@/component/FinalCTA";
import JobHubs from "@/component/JobHubs";
import RecruiterSection from "@/component/RecruiterSection";
import StatsSection from "@/component/StatsSection";
import TechLogos from "@/component/TechLogos";
import TrustSection from "@/component/TrustSection";
import DarkVeil from "@/components/DarkVeil";
import Orb from "@/components/Orb";
import { AuroraText } from "@/components/ui/aurora-text";
import { Button } from "@/components/ui/button";

import { Search, MapPin } from "lucide-react"; // Optional: for icons
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col items-center justify-center pt-24  pb-0">
      <div className="text-white w-full max-w-7xl mb-5">
        {/* Headline Section */}
        <div className="mb-12">
          <h1 className="font-bold text-5xl md:text-7xl mb-6 leading-tight tracking-tight text-white">
            The modern <br /> recruitment platform for{" "}
            <AuroraText>high-growth teams.</AuroraText>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl">
            HireFlow+ uses proprietary neural matching to connect elite talent
            with the world's most innovative companies. No more scrolling, just
            matching.
          </p>
        </div>

        {/* --- Search Bar Container --- */}
        <div className="relative group max-w-4xl">
          {/* Subtle Outer Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

          <div className="relative flex flex-col md:flex-row items-center bg-slate-950/60 backdrop-blur-xl border border-white/10 p-2 rounded-2xl shadow-2xl">
            {/* Job Title Input */}
            <div className="flex items-center flex-1 w-full px-4 border-b md:border-b-0 md:border-r border-white/10 py-3 md:py-0">
              <Search className="w-5 h-5 text-slate-500 mr-3" />
              <input
                type="text"
                placeholder="Job title or keywords"
                className="bg-transparent w-full outline-none text-white placeholder:text-slate-500 text-lg"
              />
            </div>

            {/* Location Input */}
            <div className="flex items-center flex-1 w-full px-4 py-3 md:py-0">
              <MapPin className="w-5 h-5 text-slate-500 mr-3" />
              <input
                type="text"
                placeholder="Location"
                className="bg-transparent w-full outline-none text-white placeholder:text-slate-500 text-lg"
              />
            </div>

            {/* Search Button */}
            <button className="w-full md:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all active:scale-95 shadow-[0_0_20px_rgba(79,70,229,0.4)]">
              Search Jobs
            </button>
          </div>
        </div>
      </div>
      <TechLogos/>
      <JobHubs />
      <FeaturedJobs />
      <RecruiterSection/>
      <StatsSection/>
      <TrustSection/>
      <FinalCTA/>
    </div>
  );
}
