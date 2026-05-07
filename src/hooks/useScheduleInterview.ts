import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const useScheduleInterview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      applicationId,
      interviewDate,
      meetingLink,
    }: {
      applicationId: string;
      interviewDate: Date;
      meetingLink: string;
    }) => {
      const { data, error } = await supabase
        .from("applications")
        .update({
          interview_date: interviewDate,
          meeting_link: meetingLink,
          interview_status: "scheduled",
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