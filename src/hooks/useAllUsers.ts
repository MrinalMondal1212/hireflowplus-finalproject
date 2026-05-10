import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const useAllUser = () => {
  return useQuery({
    queryKey: ["all-users"],

    queryFn: async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("role", "user");

      if (error) throw error;

      return data;
    },
  });
};