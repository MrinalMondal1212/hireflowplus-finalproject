import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/useAuthStore";

export const useUpdataProfile = () => {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);

  return useMutation({
    mutationFn: async (formData: any) => {
      const { data, error } = await supabase
        .from("profiles")
        .upsert({
          user_id: user?.id,
          ...formData,
        });

      if (error) throw error;

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};