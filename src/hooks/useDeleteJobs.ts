// hooks/useDeleteJob.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("jobs")
        .delete()
        .eq("id", id);

      if (error) {
        console.log(error);
        throw error;
      }
    },

    onSuccess: () => {
      toast.success("Job deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["all-jobs"],
      });

      queryClient.invalidateQueries({
        queryKey: ["recruiter-jobs"],
      });
    },

    onError: (error: any) => {
      toast.error(error.message);
      console.log(error);
    },
  });
};