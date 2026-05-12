"use client";

import GradientText from "@/components/GradientText";
import Link from "next/link";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { User } from "@supabase/supabase-js";
import { LogOut, LogIn, UserCircle2, Menu, X } from "lucide-react";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

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
    { name: "Home", href: "/" },
    { name: "Jobs", href: "/jobs" },
    { name: "About Us", href: "/aboutus" },
    { name: "Saved Jobs", href: "/saved-jobs" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-4 pointer-events-none">
      <div className="max-w-7xl mx-auto pointer-events-auto">
        <div className="w-full h-18 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-between px-4 md:px-8 relative z-50">
          {/* Logo */}
          <Link href="/">
            <GradientText
              colors={["#4F46E5", "#22D3EE", "#818CF8"]}
              animationSpeed={6}
              showBorder={false}
              className="text-xl md:text-2xl font-bold px-4 py-1.5 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 flex items-center justify-center transition-all hover:bg-white/10"
            >
              HireFlow+
            </GradientText>
          </Link>

          {/* Desktop Nav Links - Hidden on Mobile */}
          <div className="hidden lg:flex gap-1 text-base font-medium text-gray-200">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-indigo-500/20 text-white border border-indigo-500/20"
                      : "hover:bg-white/5 hover:text-white text-slate-300"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Right Side - Desktop Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden sm:flex items-center gap-3">
              {user ? (
                <>
                  <RainbowButton
                    onClick={() => router.push("/dashboard")}
                    className="px-4 py-2 md:px-6 md:py-3 border border-white/10 rounded-xl duration-300 flex items-center gap-2 text-sm md:text-base"
                  >
                    <UserCircle2 size={18} />
                    <span className="hidden md:inline">Dashboard</span>
                  </RainbowButton>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-all cursor-pointer text-sm"
                  >
                    <LogOut size={18} />
                    <span className="hidden md:inline">Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white transition-all text-sm"
                >
                  <LogIn size={18} />
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-white bg-white/5 rounded-lg border border-white/10"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Sidebar/Menu - Slides down */}
        <div
          className={`lg:hidden absolute left-4 right-4 mt-2 p-6 bg-slate-950/95 backdrop-blur-xl border border-white/10 rounded-2xl transition-all duration-300 ease-in-out transform ${
            isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-lg font-medium p-2 rounded-lg ${
                  pathname === item.href ? "text-indigo-400 bg-indigo-500/10" : "text-slate-300"
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            <hr className="border-white/10 my-2" />
            
            {/* Mobile Auth Actions */}
            <div className="flex flex-col gap-3">
              {user ? (
                <>
                  <Link href="/dashboard" className="flex items-center gap-3 text-white p-2">
                    <UserCircle2 size={20} /> Dashboard
                  </Link>
                  <button onClick={handleLogout} className="flex items-center gap-3 text-rose-400 p-2 text-left">
                    <LogOut size={20} /> Logout
                  </button>
                </>
              ) : (
                <Link href="/login" className="flex items-center gap-3 text-white p-2">
                  <LogIn size={20} /> Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;