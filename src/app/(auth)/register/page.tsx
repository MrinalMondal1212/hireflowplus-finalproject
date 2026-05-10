"use client";
import React, { useState } from "react";
import { Mail, Lock, User, Building, ArrowRight } from "lucide-react";
import { RainbowButton } from "@/components/ui/rainbow-button";
import ShinyText from "@/components/ShinyText";
import Link from "next/link";
import { registerUser } from "@/lib/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassWord] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const handelRegister = async () => {
    setLoading(true);
    const user = await registerUser(name, email, password, role);
    if (!user) {
      toast.error("User Already Exsit!!!");
      setLoading(false);
      return;
    }
    toast.success("Register SuccessFull !!!!");
    router.push("/login");
    setLoading(false);
  };

  return (
    // Background using your   oklch variable directly
    <div className="min-h-screen bg-[oklch(0.12_0.01_250)] flex items-center justify-center px-4 py-12 font-sans">
      {/* Main Card with Glassmorphism */}
      <div className="w-full max-w-md space-y-8 p-10 rounded-[0.5rem] border border-white/10 bg-white/2 backdrop-blur-md shadow-2xl">
        {/* Logo / Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary mb-4 shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]">
            <span className="text-white font-bold text-2xl">H</span>
          </div>
          <h2 className="text-4xl font-extrabold text-white tracking-tighter">
            Join HireFlow<span className="text-primary">+</span>
          </h2>
          <p className="text-[oklch(0.80_0_0)] text-sm">
            Create an account to start building your elite team.
          </p>
        </div>

        {/* Form Container */}
        <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4">
            {/* Full Name Input */}
            <div className="group relative">
              <label className="text-xs font-medium text-white/50 ml-1 mb-1 block uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Mrinal Mondal"
                  className="w-full bg-white/3 border border-white/10 rounded-[0.5rem] py-3 pl-10 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-primary focus:border-(--primary)/50 transition-all"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="group relative">
              <label className="text-xs font-medium text-white/50 ml-1 mb-1 block uppercase tracking-wider">
                Work Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primary transition-colors" />
                {/* input input  */}
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-white/3 border border-white/10 rounded-[0.5rem] py-3 pl-10 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:border-(--primary)/50 transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="group relative">
              <label className="text-xs font-medium text-white/50 ml-1 mb-1 block uppercase tracking-wider">
                Create Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 `group-focus-within:text-primary transition-colors" />
                <input
                  type="password"
                  placeholder="••••••••"
                  onChange={(e) => setPassWord(e.target.value)}
                  className="w-full bg-white/3 border border-white/10 rounded-[0.5rem] py-3 pl-10 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
            </div>
          </div>
          <select
            onChange={(e) => setRole(e.target.value)}
            className="w-full bg-white/3 border border-white/10 rounded-[0.5rem] py-3 px-4 text-white"
          >
            <option value="user">User</option>
            <option value="recruiter">Recruiter</option>
          </select>

          {/* Action Button */}
          <div className="pt-2">
            <RainbowButton
              onClick={handelRegister}
              disabled={loading}
              type="button"
              className="w-full py-4 rounded-[0.5rem] flex items-center justify-center gap-2 group border-none"
            >
              <ShinyText
                text={loading ? "Creating...." : "Create Account"}
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
            <span className="w-full border-t border-white/5"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <Link
              href="/login"
              className="bg-[#121212] cursor-pointer px-2 text-white/30"
            >
              Already have an account?{" "}
              <span className="text-white ml-1">Login</span>
            </Link>
          </div>
        </div>

        {/* Fine Print */}
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

export default Register;
