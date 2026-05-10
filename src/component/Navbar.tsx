"use client";

import GradientText from "@/components/GradientText";
import Link from "next/link";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { User } from "@supabase/supabase-js";
import { LogOut, LogIn, UserCircle2 } from "lucide-react";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // initial session
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    // realtime auth listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error("Logout failed");
      return;
    }

    toast.success("Logged out successfully");

    router.push("/");
  };

  const navItems = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Jobs",
      href: "/jobs",
    },
    {
      name: "About Us",
      href: "/aboutus",
    },
    {
      name: "Saved Jobs",
      href: "/saved-jobs",
    },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-center z-50 p-4 pointer-events-none">
      <div className="w-full max-w-7xl h-18 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-between px-8 pointer-events-auto">
        {/* Logo */}
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

        {/* Nav Links */}
        <div className="flex gap-3 text-lg font-medium text-gray-200">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  px-4 py-2 rounded-xl transition-all duration-300
                  ${
                    isActive
                      ? "bg-indigo-500/20 text-white border border-indigo-500/20"
                      : "hover:bg-white/5 hover:text-white text-slate-300"
                  }
                `}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Right Side */}
        <div className="flex gap-5 items-center">
          {user ? (
            <>
              <RainbowButton
                onClick={() => router.push("/dashboard")}
                className="px-6 py-3 border border-white/10 rounded-xl duration-300 flex items-center gap-2"
              >
                <UserCircle2 size={18} />
                Dashboard
              </RainbowButton>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-all cursor-pointer"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white transition-all"
            >
              <LogIn size={18} />
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
