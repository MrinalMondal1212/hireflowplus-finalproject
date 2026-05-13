"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const useDeleteRecruiter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("users")
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }
    },

    onSuccess: () => {
      toast.success("Recruiter deleted");

      queryClient.invalidateQueries({
        queryKey: ["all-recruiters"],
      });
    },

    onError: () => {
      toast.error("Failed to delete recruiter");
    },
  });
};