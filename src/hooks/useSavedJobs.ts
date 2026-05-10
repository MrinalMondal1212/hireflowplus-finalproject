import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const useSavedJobs = () => {
  return useQuery({
    queryKey: ["savedJobs"],

    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return [];

      const { data, error } = await supabase
        .from("saved_jobs")
        .select(
          `
          id,
          jobs (
            id,
            title,
            company,
            location,
            job_type,
            salary_min,
            salary_max
          )
        `
        )
        .eq("user_id", user.id);

      if (error) throw error;

      return data;
    },
  });
};