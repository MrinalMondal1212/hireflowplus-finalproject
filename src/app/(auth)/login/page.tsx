"use client";
import React from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { RainbowButton } from "@/components/ui/rainbow-button";
import ShinyText from "@/components/ShinyText";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[oklch(0.12_0.01_250)] flex items-center justify-center px-4 font-sans">
      
      <div className="w-full max-w-md space-y-8 p-10 rounded-md border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-xl bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-2xl">H</span>
          </div>

          <h2 className="text-4xl font-extrabold text-white">
            HireFlow<span className="text-primary">+</span>
          </h2>

          <p className="text-sm text-gray-400">
            Enter your details to manage your pipeline.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          
          {/* Email */}
          <div>
            <label className="text-xs text-gray-400">Work Email</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="email"
                placeholder="name@company.com"
                className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-md text-white outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-xs text-gray-400">Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-md text-white outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Button */}
          <RainbowButton className="w-full py-3 flex items-center justify-center gap-2">
            <ShinyText
              text="Continue"
              color="#ffffff"
              shineColor="var(--primary)"
              className="font-bold text-sm"
            />
            <ArrowRight className="w-4 h-4 text-white" />
          </RainbowButton>
        </form>

        {/* Register */}
        <div className="text-center text-sm">
          <Link href="/register" className="text-gray-400 hover:text-white">
            Don’t have an account? Register
          </Link>
        </div>

        {/* Back */}
        <button
          onClick={() => router.push("/")}
          className="w-full mt-4 py-3 bg-white/5 border border-white/10 rounded-md text-white hover:bg-white/10"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Login;