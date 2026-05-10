"use client";

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

import {
  MapPin,
  GraduationCap,
  Briefcase,
  Users,
} from "lucide-react";

type CandidateProfile = {
  user_id: string;
  name: string;
  email: string;
  education: string;
  location: string;
  experience: string;
  skills: string[] | string;
};

export default function TalentPage() {
  // FETCH TALENT
  const fetchTalent = async (): Promise<CandidateProfile[]> => {
    const { data, error } = await supabase
      .from("profiles")
      .select(`
        user_id,
        name,
        email,
        education,
        location,
        experience,
        skills
      `)
      .not("name", "is", null);

    if (error) {
      throw new Error(error.message);
    }

    return data || [];
  };

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["talent-pool"],
    queryFn: fetchTalent,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Loading talent pool...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-red-400">
        Failed to load talent pool
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-32 px-6 pb-16">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <Users className="w-8 h-8 text-indigo-400" />

            <h1 className="text-4xl font-bold">
              Talent Pool
            </h1>
          </div>

          <p className="text-slate-400">
            Discover and connect with talented candidates.
          </p>
        </div>

        {/* STATS */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl px-4 py-2">
            <Users className="w-4 h-4 text-indigo-400" />

            <span className="text-sm text-indigo-300 font-medium">
              {data.length} Candidates Available
            </span>
          </div>
        </div>

        {/* TALENT GRID */}
        {data.length > 0 ? (
          <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 gap-6">
            {data.map((candidate) => {
              const skillsArray = Array.isArray(candidate.skills)
                ? candidate.skills
                : typeof candidate.skills === "string"
                ? candidate.skills
                    .split(",")
                    .map((skill) => skill.trim())
                : [];

              return (
                <div
                  key={candidate.user_id}
                  className="bg-slate-900/50 border p-6 mb-4  border-white/10 rounded-3xl  hover:border-indigo-500/40 transition-all"
                >
                  {/* TOP */}
                  <div className="flex items-start gap-4">
                    {/* AVATAR */}
                    <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold">
                      {candidate.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>

                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white">
                        {candidate.name || "Unknown"}
                      </h2>

                      <p className="text-indigo-400 mt-1">
                        {candidate.education || "No education added"}
                      </p>
                    </div>
                  </div>

                  {/* INFO */}
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center gap-3 text-slate-400 text-sm">
                      <MapPin className="w-4 h-4" />

                      <span>
                        {candidate.location || "Location not added"}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-400 text-sm">
                      <Briefcase className="w-4 h-4" />

                      <span>
                        {candidate.experience || "No experience added"}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-400 text-sm">
                      <GraduationCap className="w-4 h-4" />

                      <span>
                        {candidate.education || "No education added"}
                      </span>
                    </div>
                  </div>

                  {/* SKILLS */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    {skillsArray.length > 0 ? (
                      skillsArray.slice(0, 5).map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs text-slate-300"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-500 text-sm">
                        No skills added
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="border border-dashed border-white/10 rounded-3xl p-20 text-center">
            <Users className="w-14 h-14 text-slate-600 mx-auto mb-4" />

            <h2 className="text-3xl font-bold">
              No candidates found
            </h2>

            <p className="text-slate-500 mt-3">
              No talent profiles available right now.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}