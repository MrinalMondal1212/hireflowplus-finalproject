import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const useToggleUserStatus = () => {
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

      if (error) throw error;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-users"],
      });

      toast.success("User status updated");
    },

    onError: () => {
      toast.error("Failed to update user");
    },
  });
};