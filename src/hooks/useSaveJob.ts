import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/useAuthStore";
import { useSavedJobsStore } from "@/store/useSavedJobsStore";

export const useSaveJob = () => {
  const user = useAuthStore((s) => s.user);

  const addSavedJob = useSavedJobsStore((s) => s.addSavedJob);

  return useMutation({
    mutationFn: async (jobId: string) => {
      if (!user) throw new Error("LOGIN_REQUIRED");

      const { error } = await supabase.from("saved_jobs").insert({
        user_id: user.id,
        job_id: jobId,
      });

      if (error) throw error;

      return jobId;
    },

    onSuccess: (jobId) => {
      addSavedJob(jobId);
    },
  });
};