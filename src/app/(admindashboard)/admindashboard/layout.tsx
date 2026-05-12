"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { User, LogOut, LayoutDashboard, Delete, User2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const { user, role, loading, logout } = useAuthStore();

  // ✅ PROTECTION ADDED HERE
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (role !== "admin") {
        router.push("/");
      }
    }
  }, [user, role, loading]);

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admindashboard" },
    { name: "All Recruiter", icon: User, href: "/admindashboard/allrecruiter" },
    { name: "All User", icon: User2, href: "/admindashboard/alluser" },
    { name: "Manage Jobs", icon: Delete, href: "/admindashboard/managejobs" },
  ];

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message);
      return;
    }

    logout();
    toast.success("Logout Successful");
    router.push("/login");
  };

  // optional loading UI
  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/10 bg-slate-950/50 backdrop-blur-xl flex flex-col fixed h-full z-20">
        
        <div className="p-8">
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            HireFlow+
          </h2>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">
            Admin Portal
          </p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all border ${
                  isActive
                    ? "bg-indigo-500/15 border-indigo-500/20 text-white"
                    : "border-transparent text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 ${
                    isActive ? "text-indigo-400" : "text-slate-400"
                  }`}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-500/10"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-72">
        <div className="max-w-6xl mx-auto p-8">{children}</div>
      </main>
    </div>
  );
}