import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const useApproveRecruiter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("users")
        .update({
          status: "active",
        })
        .eq("id", id);

      if (error) {
        throw error;
      }
    },

    onSuccess: () => {
      toast.success("Recruiter approved");

      queryClient.invalidateQueries({
        queryKey: ["pending-recruiters"],
      });

      queryClient.invalidateQueries({
        queryKey: ["all-recruiters"],
      });
    },

    onError: () => {
      toast.error("Failed to approve recruiter");
    },
  });
};