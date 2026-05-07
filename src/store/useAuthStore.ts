import { create } from "zustand";

type AuthState = {
  user: any;
  role: string | null;
  loading: boolean;

  setAuth: (user: any, role: string) => void;
  setLoading: (laoding: boolean) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  loading: true,

  setAuth: (user, role) =>
    set({
      user,
      role,
      loading: false,
    }),

  setLoading: (loading) => set({ loading }),

  logout: () =>
    set({
      user: null,
      role: null,
    }),
}));
