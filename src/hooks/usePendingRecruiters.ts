import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const usePendingRecruiters = () => {
  return useQuery({
    queryKey: ["pending-recruiters"],

    queryFn: async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("role", "recruiter")
        .eq("status", "pending");

      if (error) throw error;

      return data;
    },
  });
};