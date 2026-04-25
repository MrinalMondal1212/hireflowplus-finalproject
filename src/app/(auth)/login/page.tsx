"use client";
import React from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { RainbowButton } from '@/components/ui/rainbow-button';
import ShinyText from '@/components/ShinyText';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


const Login = () => {
  const router = useRouter()
  return (
    // Background using your oklch variable directly
    <div className="min-h-screen bg-[oklch(0.12_0.01_250)] flex items-center justify-center px-4 font-sans">
      
      {/* Main Card with Glassmorphism */}
      <div className="w-full max-w-md space-y-8 p-10 rounded-[0.5rem] border border-white/10 bg-white/2 backdrop-blur-md shadow-2xl">
        
        {/* Logo / Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary mb-4 shadow-[0_0_20px_rgba(112,181,249,0.3)]">
            <span className="text-white font-bold text-2xl">H</span>
          </div>
          <h2 className="text-4xl font-extrabold text-white tracking-tighter">
            HireFlow<span className="text-primary">+</span>
          </h2>
          <p className="text-[oklch(0.80_0_0)] text-sm">
            Enter your details to manage your pipeline.
          </p>
        </div>

        {/* Form Container */}
        <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4">
            
            {/* Email Input */}
            <div className="group relative">
              <label className="text-xs font-medium text-white/50 ml-1 mb-1 block uppercase tracking-wider">Work Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primarytransition-colors" />
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full bg-white/3 border border-white/10 rounded-[0.5rem] py-3 pl-10 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-primay focus:border-(--primary)/50 transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="group relative">
              <div className="flex justify-between items-end mb-1 mr-1">
                <label className="text-xs font-medium text-white/50 ml-1 block uppercase tracking-wider">Password</label>
                <a href="#" className="text-[10px]text-primary hover:text-white transition-colors">Forgot?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primar] transition-colors" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-white/3 border border-white/10 rounded-[0.5rem] py-3 pl-10 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-primaryfocus:border-(--primary)/50 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <RainbowButton className="w-full py-4 rounded-[0.5rem] flex items-center justify-center gap-2 group border-none">
              <ShinyText
                text="Continue to Dashboard" 
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
            <Link href={"/register"} className="bg-[#121212] cursor-pointer px-2 text-white/30">Or Register</Link>
          </div>
        </div>

        {/* Social Login */}
        <button onClick={()=> router.push('/')} className="w-full cursor-pointer flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-3 rounded-[0.5rem] text-white hover:bg-white/10 transition-colors text-sm font-medium">
         Back to Home
        </button>

        {/* Fine Print */}
        <p className="text-center text-[10px] text-white/20 mt-8">
          By signing in, you agree to our <br />
          <span className="text-white/40 underline cursor-pointer hover:text-white">Terms of Service</span> and <span className="text-white/40 underline cursor-pointer hover:text-white">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default Login;