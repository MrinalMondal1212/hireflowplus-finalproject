"use client";

import { getUserData } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";

export const useAuthInit = () => {
  const setAuth = useAuthStore((s) => s.setAuth);
  const setLoading = useAuthStore((s) => s.setLoading);

  useEffect(() => {
    const init = async () => {
      setLoading(true);

      const { data } = await supabase.auth.getUser();

      if (data.user) {
        const userData = await getUserData(data.user.id);

        setAuth(
          data.user,
          userData.role,
          userData.status
        );
      }

      setLoading(false);
    };

    init();
  }, [setAuth, setLoading]);
};