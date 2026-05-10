// hooks/useAdminChartData.ts

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const useAdminChartData = () => {
  return useQuery({
    queryKey: ["admin-chart-data"],

    queryFn: async () => {
      // USERS
      const { count: usersCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      // RECRUITERS
      const { count: recruitersCount } = await supabase
        .from("users")
        .select("*", { count: "exact", head: true })
        .eq("role", "recruiter");

      // JOBS
      const { count: jobsCount } = await supabase
        .from("jobs")
        .select("*", { count: "exact", head: true });

      // APPLICATIONS
      const { count: applicationsCount } = await supabase
        .from("applications")
        .select("*", { count: "exact", head: true });

      return [
        {
          name: "Users",
          total: usersCount || 0,
        },
        {
          name: "Recruiters",
          total: recruitersCount || 0,
        },
        {
          name: "Jobs",
          total: jobsCount || 0,
        },
        {
          name: "Applications",
          total: applicationsCount || 0,
        },
      ];
    },
  });
};