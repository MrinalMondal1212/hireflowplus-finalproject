"use client";
import FeaturedJobs from "@/component/FeaturedJobs";
import FinalCTA from "@/component/FinalCTA";
import JobHubs from "@/component/JobHubs";
import RecruiterSection from "@/component/RecruiterSection";
import StatsSection from "@/component/StatsSection";
import TrustSection from "@/component/TrustSection";
import { AuroraText } from "@/components/ui/aurora-text";
import { Search, MapPin } from "lucide-react";

import Aurora from "@/components/Aurora";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (location) params.set("location", location);

    router.push(`/jobs?${params.toString()}`);
  };
  return (
    <div className="relative w-full flex flex-col items-center justify-center overflow-hidden pb-0 bg-black">
      {/* Hero Section */}
      <div className="relative w-full min-h-screen">
        {/* Aurora background - only in top half of hero */}
        <div className="absolute top-0 left-0 right-0 h-1/2 z-0 pointer-events-none overflow-hidden">
          <Aurora
            colorStops={["#7cff67", "#B497CF", "#5227FF"]}
            blend={0.5}
            amplitude={1.0}
            speed={1}
          />
          {/* Gradient overlay to fade out at the bottom */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full flex flex-col items-center pt-24">
          <div className="text-white w-full max-w-7xl px-6 mb-12">
            {/* Headline Section */}
            <div className="mb-12">
              <h1 className="font-bold text-5xl md:text-7xl mb-6 leading-tight tracking-tight text-white">
                The modern <br /> recruitment & Hiring platform{" "}
                <AuroraText>for high-growth teams.</AuroraText>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl">
                HireFlow+ uses proprietary neural matching to connect elite
                talent with the world's most innovative companies. No more
                scrolling, just matching.
              </p>
            </div>

            {/* Search Bar Container */}
            <div className="relative group max-w-4xl">
              <div className="absolute -inset-1 bg-linear-0-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative flex flex-col md:flex-row items-center bg-slate-950/60 backdrop-blur-xl border border-white/10 p-2 rounded-2xl shadow-2xl">
                <div className="flex items-center flex-1 w-full px-4 border-b md:border-b-0 md:border-r border-white/10 py-3 md:py-0">
                  <Search className="w-5 h-5 text-slate-500 mr-3" />
                  <input
                    type="text"
                    placeholder="Job title or keywords"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-transparent w-full outline-none text-white placeholder:text-slate-500 text-lg"
                  />
                </div>
                <div className="flex items-center flex-1 w-full px-4 py-3 md:py-0">
                  <MapPin className="w-5 h-5 text-slate-500 mr-3" />
                  <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="bg-transparent w-full outline-none text-white placeholder:text-slate-500 text-lg"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="w-full md:w-auto px-8 py-4 cursor-pointer bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all active:scale-95 shadow-[0_0_20px_rgba(79,70,229,0.4)]"
                >
                  Search Jobs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Other Sections */}
      <div className="w-full flex flex-col items-center bg-black relative z-10">
        <JobHubs />
        <FeaturedJobs />
        <RecruiterSection />
        <StatsSection />
        <TrustSection />
        <FinalCTA />
      </div>
    </div>
  );
}
