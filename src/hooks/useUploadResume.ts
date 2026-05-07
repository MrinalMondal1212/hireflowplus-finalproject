import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/useAuthStore";

export const useUploadResume = () => {
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      if (!user) throw new Error("User not found");

      const filePath = `${user.id}/${Date.now()}_${file.name}`;

      // ✅ Upload file
      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // ✅ Get public URL
      const { data } = supabase.storage
        .from("resumes")
        .getPublicUrl(filePath);

      const publicUrl = data.publicUrl;

      // ✅ Save to profile
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ resume_url: publicUrl })
        .eq("user_id", user.id);

      if (updateError) throw updateError;

      return publicUrl;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};