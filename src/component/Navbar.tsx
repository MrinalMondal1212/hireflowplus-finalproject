"use client";
import GradientText from "@/components/GradientText";
import Link from "next/link";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@base-ui/react/button";
import { toast } from "sonner";
import { User } from "@supabase/supabase-js";

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    checkUser();
  }, []);
  // logout function is hrere??????
  const handelLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    toast.error("Logged Out SuccessFull")
    setUser(null)
  };
  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-center z-50 p-4 pointer-events-none">
      <div className="w-full max-w-7xl h-18 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-between px-8 pointer-events-auto">
        <h1 className="text-2xl font-bold">
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
            Home
          </Link>
          <Link href="/jobs" className="hover:text-white transition">
            Jobs
          </Link>
          <Link href="/aboutus" className="hover:text-white transition">
            About Us
          </Link>
        </div>
        <div className="flex gap-4 items-center">
          {user ? (
            <Button
              className="hover:text-white text-gray/5 text-xl  transition cursor-pointer"
              onClick={handelLogout}
            >
              LogOut
            </Button>
          ) : (
            <Link
              href="/login"
              className="hover:text-white text-gray/5 text-xl  transition"
            >
              Login
            </Link>
          )}

          <RainbowButton
            onClick={() => router.push("/dashboard")}
            className="px-8 py-4 border border-white/10 rounded-xl duration-300"
          >
            My Profile
          </RainbowButton>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
