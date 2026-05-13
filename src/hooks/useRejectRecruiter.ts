import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const useRejectRecruiter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("users")
        .update({
          status: "rejected",
        })
        .eq("id", id);

      if (error) throw error;
    },

    onSuccess: () => {
      toast.success("Recruiter rejected");

      queryClient.invalidateQueries({
        queryKey: ["pending-recruiters"],
      });
    },
  });
};