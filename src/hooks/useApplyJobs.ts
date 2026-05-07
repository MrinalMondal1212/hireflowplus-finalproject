// hooks/useApplyJob.ts
import { supabase } from "@/lib/supabase";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";

export const useApplyJob = () => {
  const user = useAuthStore((s) => s.user);

  return useMutation({
    mutationFn: async ({
      jobId,
      resume_url,
    }: {
      jobId: string;
      resume_url: string;
    }) => {
      if (!user) throw new Error("User not logged in");
      console.log("AUTH USER:", user);
      console.log("USER ID USED:", user.id);

      // ✅ check duplicate
      const { data: existing } = await supabase
        .from("applications")
        .select("*")
        .eq("user_id", user.id)
        .eq("job_id", jobId)
        .maybeSingle();

      if (existing) {
        throw new Error("Already applied");
      }

      // ✅ insert
      const { error } = await supabase.from("applications").insert([
        {
          user_id: user.id,
          job_id: jobId,
          resume_url,
        },
      ]);

      if (error) throw error;
    },
  });
};
