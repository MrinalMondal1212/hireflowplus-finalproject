"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  User,
  Calendar,
  LogOut,
  LayoutDashboard,
  Edit,
} from "lucide-react";

import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";

export default function RecuriterDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = useAuthStore((s: any) => s.logout);

  const handleLogout = async () => {
    await supabase.auth.signOut();

    logout();

    toast.success("Logged out successfully");

    router.push("/login");
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      href: "/recruiter",
    },
    {
      name: "Applicant",
      icon: User,
      href: "/recruiter/applicant",
    },
    {
      name: "Post Jobs",
      icon: Calendar,
      href: "/recruiter/postjobs",
    },
    {
      name: "Edit / Delete",
      icon: Edit,
      href: "/recruiter/editdeletejobs",
    },
  ];

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/10 bg-slate-950/50 backdrop-blur-xl flex flex-col fixed h-full z-20">
        <div className="p-8">
          <h2 className="text-xl font-bold bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            HireFlow+
          </h2>

          <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">
            Recruiter Portal
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all group
                  ${
                    isActive
                      ? "bg-indigo-500/15 text-white border border-indigo-500/20"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                <item.icon
                  className={`
                    w-5 h-5 transition-colors
                    ${
                      isActive
                        ? "text-indigo-400"
                        : "group-hover:text-indigo-400"
                    }
                  `}
                />

                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer"
          >
            <LogOut className="w-5 h-5" />

            <span className="font-medium">Logout</span>
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