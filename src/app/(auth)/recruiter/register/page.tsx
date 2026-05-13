"use client";

import React, { useState } from "react";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import { RainbowButton } from "@/components/ui/rainbow-button";
import ShinyText from "@/components/ShinyText";

import Link from "next/link";
import { registerUser } from "@/lib/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const RecruiterRegister = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassWord] = useState("");
  const [loading, setLoading] = useState(false);

  // recruiter role fixed
  const role = "recruiter";

  const handelRegister = async () => {
    if (!name || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const user = await registerUser(
        name,
        email,
        password,
        role
      );

      if (!user) {
        toast.error("Recruiter already exists!");
        return;
      }

      toast.success(
        "Recruiter account created. Wait for admin approval."
      );

      router.push("/recruiter/login");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[oklch(0.12_0.01_250)] flex items-center justify-center px-4 py-12 font-sans">
      {/* Card */}
      <div className="w-full max-w-md space-y-8 p-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600 mb-2">
            <ShieldCheck className="text-white w-7 h-7" />
          </div>

          <h2 className="text-4xl font-extrabold text-white tracking-tight">
            Recruiter Signup
          </h2>

          <p className="text-sm text-slate-400">
            Create your recruiter account to start hiring.
          </p>
        </div>

        {/* Form */}
        <form
          className="space-y-5"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Name */}
          <div className="group relative">
            <label className="text-xs font-medium text-white/50 ml-1 mb-1 block uppercase tracking-wider">
              Full Name
            </label>

            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-indigo-400 transition-colors" />

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div className="group relative">
            <label className="text-xs font-medium text-white/50 ml-1 mb-1 block uppercase tracking-wider">
              Work Email
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-indigo-400 transition-colors" />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div className="group relative">
            <label className="text-xs font-medium text-white/50 ml-1 mb-1 block uppercase tracking-wider">
              Create Password
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-indigo-400 transition-colors" />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassWord(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>

          {/* Notice */}
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
            <p className="text-xs text-yellow-300 leading-relaxed">
              Your recruiter account will require admin approval
              before you can access the recruiter dashboard.
            </p>
          </div>

          {/* Button */}
          <div className="pt-2">
            <RainbowButton
              onClick={handelRegister}
              disabled={loading}
              type="button"
              className="w-full py-4 rounded-xl flex items-center justify-center gap-2 group border-none"
            >
              <ShinyText
                text={
                  loading
                    ? "Creating..."
                    : "Create Recruiter Account"
                }
                color="#ffffff"
                shineColor="var(--primary)"
                className="font-bold text-sm"
              />

              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </RainbowButton>
          </div>
        </form>

        {/* Login */}
        <div className="text-center text-sm">
          <Link
            href="/recruiter/login"
            className="text-slate-400 hover:text-white"
          >
            Already have a recruiter account?
            <span className="text-indigo-400 ml-1">
              Login
            </span>
          </Link>
        </div>

        {/* Job seeker login */}
        <div className="text-center text-sm">
          <Link
            href="/user/login"
            className="text-slate-500 hover:text-white"
          >
            Looking for jobs instead?
          </Link>
        </div>

        {/* Terms */}
        <p className="text-center text-[10px] text-white/20 mt-8">
          By registering, you agree to our <br />
          <span className="text-white/40 underline cursor-pointer hover:text-white">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="text-white/40 underline cursor-pointer hover:text-white">
            Privacy Policy
          </span>
          .
        </p>
      </div>
    </div>
  );
};

export default RecruiterRegister;