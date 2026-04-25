"use client";
import GradientText from "@/components/GradientText";
import ShinyText from "@/components/ShinyText";
import Link from "next/link";
import  { RainbowButton } from "@/components/ui/rainbow-button"

import React from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter()
  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-center z-50 p-4 ">
      <div className="w-full max-w-7xl h-18 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-between px-8">
        <h1 className="text-2xl font-bold ">
          <GradientText
            colors={["#4F46E5", "#22D3EE", "#818CF8"]}
            animationSpeed={6}
            showBorder={false}
            className="px-4 py-1.5 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 flex items-center justify-center transition-all hover:bg-white/10"
          >
            HireFlow+
          </GradientText>
        </h1>
        <div className="flex gap-6 text-xl font-semibold text-gray-200">
          <Link href="/" className="hover:text-white transition">
            <ShinyText
              text="Home"
              speed={3}
              delay={0}
              color="#b5b5b5"
              shineColor="#ffffff"
              spread={120}
              direction="left"
              yoyo={false}
              pauseOnHover={false}
              disabled={false}
            />
          </Link>
          <Link href="/Jobs" className="hover:text-white transition">
            <ShinyText
              text="Jobs"
              speed={3}
              delay={0}
              color="#b5b5b5"
              shineColor="#ffffff"
              spread={120}
              direction="left"
              yoyo={false}
              pauseOnHover={false}
              disabled={false}
            />
          </Link>
          <Link href="/" className="hover:text-white transition">
            <ShinyText
              text="Companies"
              speed={3}
              delay={0}
              color="#b5b5b5"
              shineColor="#ffffff"
              spread={120}
              direction="left"
              yoyo={false}
              pauseOnHover={false}
              disabled={false}
            />
          </Link>
          <Link href="/" className="hover:text-white transition">
            <ShinyText
              text="Salaries"
              speed={3}
              delay={0}
              color="#b5b5b5"
              shineColor="#ffffff"
              spread={120}
              direction="left"
              yoyo={false}
              pauseOnHover={false}
              disabled={false}
            />
          </Link>
        </div>
        <div className="flex gap-4 items-center">
          <button onClick={()=> router.push("/login")} className="text-gray-200 text-xl cursor-pointer font-semibold hover:text-white">
            {" "}
            <ShinyText
              text="Login"
              speed={2}
              delay={0}
              color="#b5b5b5"
              shineColor="#ffffff"
              spread={120}
              direction="left"
              yoyo={false}
              pauseOnHover={false}
              disabled={false}
            />
          </button>
          <RainbowButton className="px-8 py-4 border border-white/10 rounded-xl  duration-300">
            <ShinyText
              text="Your Profile"
              disabled={false}
              speed={3} // Slightly faster for a "snappier" feel
              className="text-xl font-bold" // Pass font styles directly if ShinyText supports className
              color="#ffffff" // Base color is now white
              shineColor="#A97CF8" // Match your 'Dark Veil' primary accent!
            />
          </RainbowButton>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
