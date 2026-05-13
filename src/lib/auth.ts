import { supabase } from "./supabase";
import { useAuthStore } from "@/store/useAuthStore";

// REGISTER
export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: string
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  if (data.user) {
    // recruiter => pending
    // user => active
    const status =
      role === "recruiter"
        ? "pending"
        : "active";

    // users table insert
    const { error: insertError } =
      await supabase.from("users").insert([
        {
          id: data.user.id,
          full_name: name,
          email: data.user.email,
          role,
          status,
        },
      ]);

    if (insertError) {
      throw new Error(insertError.message);
    }

    // profile table
    const { error: profileError } =
      await supabase.from("profiles").insert([
        {
          user_id: data.user.id,
          name,
          email: data.user.email,
        },
      ]);

    if (profileError) {
      throw new Error(profileError.message);
    }

    // zustand
    useAuthStore
      .getState()
      .setAuth(
        data.user,
        role,
        status
      );
  }

  return data.user;
};

// LOGI
export const loginUser = async (
  email: string,
  password: string
) => {
  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) {
    throw new Error(error.message);
  }

  if (data.user) {
    const userData =
      await getUserData(data.user.id);

    // recruiter approval check
    if (
      userData.role === "recruiter" &&
      userData.status !== "active"
    ) {
      await supabase.auth.signOut();

      throw new Error(
        "Recruiter account waiting for admin approval"
      );
    }

    useAuthStore
      .getState()
      .setAuth(
        data.user,
        userData.role,
        userData.status
      );
  }

  return data.user;
};

// GET USER DATA
export const getUserData = async (
  userId: string
) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// LOGOUT
export const logoutUser = async () => {
  await supabase.auth.signOut();

  useAuthStore.getState().logout();
};