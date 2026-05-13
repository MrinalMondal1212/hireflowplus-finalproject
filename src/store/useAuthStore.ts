import { create } from "zustand";

type AuthState = {
  user: any;
  role: string | null;
  status: string | null;

  loading: boolean;

  setAuth: (
    user: any,
    role: string,
    status: string
  ) => void;

  setLoading: (loading: boolean) => void;

  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  status: null,

  loading: true,

  setAuth: (user, role, status) =>
    set({
      user,
      role,
      status,
      loading: false,
    }),

  setLoading: (loading) =>
    set({
      loading,
    }),

  logout: () =>
    set({
      user: null,
      role: null,
      status: null,
    }),
}));