"use client";

import React, { useState } from "react";
import { Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { RainbowButton } from "@/components/ui/rainbow-button";
import ShinyText from "@/components/ShinyText";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginUser } from "@/lib/auth";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";

const RecruiterLogin = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const handelLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const user = await loginUser(email, password);

      if (!user) {
        toast.error("Invalid credentials");
        return;
      }

      const role = useAuthStore.getState().role;

      // ❌ Prevent normal users from recruiter login
      if (role !== "recruiter" && role !== "admin") {
        toast.error("This portal is only for recruiters");
        return;
      }

      // 🚫 Recruiter approval check
      const status = useAuthStore.getState().status;

      if (role === "recruiter" && status !== "active") {
        toast.error(
          "Your recruiter account is pending admin approval"
        );

        return;
      }

      toast.success("Login successful");

      // Redirect
      if (role === "admin") {
        router.replace("/admindashboard");
      } else {
        router.replace("/recruiter");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[oklch(0.12_0.01_250)] flex items-center justify-center px-4 font-sans">
      <div className="w-full max-w-md space-y-8 p-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-600 flex items-center justify-center">
            <ShieldCheck className="text-white w-7 h-7" />
          </div>

          <h2 className="text-4xl font-extrabold text-white">
            Recruiter Portal
          </h2>

          <p className="text-sm text-gray-400">
            Login to manage jobs, applicants and hiring.
          </p>
        </div>

        {/* Form */}
        <form
          className="space-y-5"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Email */}
          <div>
            <label className="text-xs text-gray-400">
              Work Email
            </label>

            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-xs text-gray-400">
              Password
            </label>

            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassWord(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 bg-black/40 border border-white/10 rounded-xl text-white outline-none focus:ring-1 focus:ring-indigo-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <RainbowButton
            onClick={handelLogin}
            disabled={loading}
            type="button"
            className="w-full py-3 flex items-center justify-center gap-2"
          >
            <ShinyText
              text={
                loading
                  ? "Logging in..."
                  : "Continue as Recruiter"
              }
              color="#ffffff"
              shineColor="var(--primary)"
              className="font-bold text-sm"
            />

            <ArrowRight className="w-4 h-4 text-white" />
          </RainbowButton>
        </form>

        {/* Register */}
        <div className="text-center text-sm">
          <Link
            href="/recruiter/register"
            className="text-gray-400 hover:text-white"
          >
            Want to hire? Register as recruiter
          </Link>
        </div>

        {/* User Login */}
        <div className="text-center text-sm">
          <Link
            href="/user/login"
            className="text-indigo-400 hover:text-indigo-300"
          >
            Login as Job Seeker
          </Link>
        </div>

        {/* Back */}
        <button
          onClick={() => router.push("/")}
          className="w-full mt-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default RecruiterLogin;