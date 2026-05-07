// hooks/useCandidateDetails.ts
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const useCandidateDetails = (applicationId: string) => {
  return useQuery({
    queryKey: ["candidate-details", applicationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("applications")
        .select(`
          *,
          profile:profiles!user_id (*)
        `)
        .eq("id", applicationId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!applicationId,
  });
};