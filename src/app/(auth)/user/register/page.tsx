"use client";

import React, { useState } from "react";
import Link from "next/link";

import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  ArrowRight,
  Briefcase,
  Sparkles,
} from "lucide-react";

import { RainbowButton } from "@/components/ui/rainbow-button";
import ShinyText from "@/components/ShinyText";

import { registerUser } from "@/lib/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function UserRegisterPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      await registerUser(
        formData.name,
        formData.email,
        formData.password,
        "user"
      );

      toast.success("Account created successfully");

      router.push("/user/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[oklch(0.12_0.01_250)] flex items-center justify-center px-4 py-12">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/20 blur-[120px] rounded-full" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Main Card */}
      <div className="relative w-full max-w-md border border-white/10 bg-white/5 backdrop-blur-2xl rounded-3xl p-8 md:p-10 shadow-[0_0_60px_rgba(99,102,241,0.15)]">
        {/* Top Badge */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/10">
            <Sparkles className="w-4 h-4 text-indigo-400" />

            <span className="text-xs tracking-wide text-indigo-300">
              HireFlow Account
            </span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center mx-auto">
            <User className="w-8 h-8 text-indigo-400" />
          </div>

          <h1 className="text-4xl font-black tracking-tight text-white">
            Create Account
          </h1>

          <p className="text-slate-400 leading-relaxed text-sm">
            Join HireFlow and start your journey toward
            your next opportunity.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >
          {/* Name */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-white/50 ml-1">
              Full Name
            </label>

            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-indigo-400 transition-colors" />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-white/20 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-white/50 ml-1">
              Email Address
            </label>

            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-indigo-400 transition-colors" />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-white/20 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-white/50 ml-1">
              Password
            </label>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-indigo-400 transition-colors" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-12 text-white placeholder:text-white/20 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Button */}
          <div className="pt-3">
            <RainbowButton
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 border-none group"
            >
              <ShinyText
                text={
                  loading
                    ? "Creating Account..."
                    : "Create Account"
                }
                color="#ffffff"
                shineColor="var(--primary)"
                className="font-bold text-sm"
              />

              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </RainbowButton>
          </div>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>

          <div className="relative flex justify-center">
            <span className="bg-[oklch(0.12_0.01_250)] px-4 text-xs text-slate-500">
              OR
            </span>
          </div>
        </div>

        {/* Recruiter CTA */}
        <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-5">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
              <Briefcase className="w-5 h-5 text-indigo-400" />
            </div>

            <div className="flex-1">
              <h3 className="text-white font-semibold">
                Want to hire talent?
              </h3>

              <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                Create a recruiter account and start
                posting jobs, managing applicants, and
                hiring smarter.
              </p>

              <Link
                href="/recruiter/register"
                className="inline-flex items-center gap-2 mt-4 text-sm text-indigo-400 hover:text-indigo-300 transition"
              >
                Become a Recruiter
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              href="/user/login"
              className="text-indigo-400 hover:text-indigo-300 font-medium"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Terms */}
        <p className="text-center text-[11px] text-white/20 mt-8 leading-relaxed">
          By continuing, you agree to our{" "}
          <span className="underline hover:text-white/40 cursor-pointer">
            Terms
          </span>{" "}
          and{" "}
          <span className="underline hover:text-white/40 cursor-pointer">
            Privacy Policy
          </span>
          .
        </p>
      </div>
    </div>
  );
}