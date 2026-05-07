import { supabase } from "./supabase";
import { useAuthStore } from "@/store/useAuthStore";

// REGISTER
export const registerUser = async (
  email: string,
  password: string,
  role: string,
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  if (data.user) {
    const { error: insertError } = await supabase.from("users").insert([
      {
        id: data.user.id,
        email: data.user.email,
        role,
      },
    ]);

    if (insertError) {
      throw new Error(insertError.message);
    }
    const { error: profileError } = await supabase.from("profiles").insert([
      {
        user_id: data.user.id,
        email: data.user.email,
      },
    ]);

    if (profileError) {
      throw new Error(profileError.message);
    }

    // ✅ set zustand
    useAuthStore.getState().setAuth(data.user, role);
  }

  return data.user;
};

// LOGIN
export const loginUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  if (data.user) {
    const role = await getUserRole(data.user.id);

    useAuthStore.getState().setAuth(data.user, role);
  }

  return data.user;
};

// GET ROLE
export const getUserRole = async (userId: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("role")
    .eq("id", userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data.role;
};

// LOGOUT
export const logoutUser = async () => {
  await supabase.auth.signOut();
  useAuthStore.getState().logout();
};
