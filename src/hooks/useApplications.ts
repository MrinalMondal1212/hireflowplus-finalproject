import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";

export const useApplications = () => {
  const user = useAuthStore((s) => s.user);

  return useQuery({
    queryKey: ["applications"],

    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from("applications")
        .select(`
          id,
          status,
          created_at,
          recruiter_note,
          recruiter_rating,
          interview_date,
          interview_status,
          meeting_link,
          jobs (
            title,
            company
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      console.log("APPLICATIONS:", data);

      return data;
    },

    enabled: !!user,
  });
};