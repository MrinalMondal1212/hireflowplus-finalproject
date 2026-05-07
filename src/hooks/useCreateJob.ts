import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/useAuthStore";

export const useCreateJob = () => {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);

  return useMutation({
    mutationFn: async (jobData: any) => {
      const { data, error } = await supabase.from("jobs").insert([
        {
          ...jobData,
          recruiter_id: user?.id, // 🔥 important
        },
      ]);

      if (error) throw error;
      return data;
    },

    onSuccess: () => {
      // 🔥 refresh job list automatically
      queryClient.invalidateQueries({ queryKey: ["recruiter-jobs"] });
    },
  });
};