"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const useToggleRecruiterStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      status,
    }: {
      userId: string;
      status: string;
    }) => {
      const { error } = await supabase
        .from("users")
        .update({ status })
        .eq("id", userId);

      if (error) {
        throw error;
      }

      return true;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-recruiters"],
      });

      toast.success("Recruiter status updated");
    },

    onError: () => {
      toast.error("Failed to update recruiter");
    },
  });
};