"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase
        .from("users")
        .delete()
        .eq("id", userId);

      if (error) {
        throw error;
      }
    },

    onSuccess: () => {
      toast.success("User deleted");

      queryClient.invalidateQueries({
        queryKey: ["all-users"],
      });
    },

    onError: () => {
      toast.error("Failed to delete user");
    },
  });
};