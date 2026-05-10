import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const useAdminStats = () => {
  return useQuery({
    queryKey: ["admin-stats"],

    queryFn: async () => {
      const [
        usersRes,
        recruitersRes,
        jobsRes,
        applicationsRes,
      ] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }),

        supabase
          .from("users")
          .select("*", { count: "exact", head: true })
          .eq("role", "recruiter"),

        supabase.from("jobs").select("*", { count: "exact", head: true }),

        supabase
          .from("applications")
          .select("*", { count: "exact", head: true }),
      ]);

      return {
        totalUsers: usersRes.count || 0,
        totalRecruiters: recruitersRes.count || 0,
        totalJobs: jobsRes.count || 0,
        totalApplications: applicationsRes.count || 0,
    };
},

  });
};