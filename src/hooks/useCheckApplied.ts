// hooks/useCheckApplied.ts
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";

export const useCheckApplied = (jobId: string) => {
  const user = useAuthStore((s) => s.user);

  return useQuery({
    queryKey: ["applied", jobId],
    queryFn: async () => {
      if (!user) return null;

      const { data } = await supabase
        .from("applications")
        .select("*")
        .eq("user_id", user.id)
        .eq("job_id", jobId)
        .maybeSingle();

      return data;
    },
    enabled: !!user && !!jobId,
  });
};