import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const useRecruiterNotes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      applicationId,
      note,
      rating,
    }: {
      applicationId: string;
      note: string;
      rating: number;
    }) => {
      const { data, error } = await supabase
        .from("applications")
        .update({
          recruiter_note: note,
          recruiter_rating: rating,
        })
        .eq("id", applicationId)
        .select()
        .single();

      if (error) throw error;

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["candidate-details"],
      });

      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });

      queryClient.invalidateQueries({
        queryKey: ["applicants"],
      });
    },
  });
};