import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const useAllJobs = () => {
  return useQuery({
    queryKey: ["all-jobs"],

    queryFn: async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      console.log(data);
      console.log(error);
      return data;
    },
  });
};
