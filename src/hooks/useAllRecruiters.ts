"use client";

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const useAllRecruiters = () => {
  return useQuery({
    queryKey: ["all-recruiters"],

    queryFn: async () => {
      const { data: recruiters, error } = await supabase
        .from("users")
        .select("*")
        .eq("role", "recruiter");

      if (error) throw error;

      const { data: jobs } = await supabase
        .from("jobs")
        .select("*");

      const updatedRecruiters = recruiters.map((recruiter:any) => {
        const recruiterJobs =
          jobs?.filter(
            (job:any) =>
              job.recruiter_id === recruiter.id
          ) || [];

        const totalJobs = recruiterJobs.length;

        // take first job company name
        const company =
          recruiterJobs[0]?.company || "No Company";

        return {
          ...recruiter,
          totalJobs,
          company,
        };
      });

      return updatedRecruiters;
    },
  });
};