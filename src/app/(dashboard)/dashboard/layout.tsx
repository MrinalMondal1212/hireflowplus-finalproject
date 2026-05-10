"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  User,
  Calendar,
  Briefcase,
  LogOut,
  LayoutDashboard,
  Home,
  House,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { logoutUser } from "@/lib/auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathName = usePathname();

  // ✅ Zustand
  const { user, role, loading } = useAuthStore();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (role !== "user") {
        router.push("/");
      }
    }
  }, [user, role, loading]);

  const handleLogout = async () => {
    await logoutUser();
    router.push("/login");
  };

  const menuItems = [
    {
      name: "Home",
      icon: House,
      href: "/",
      special: true,
    },
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Profile View", icon: User, href: "/dashboard/profile" },
    {
      name: "Interview Schedule",
      icon: Calendar,
      href: "/dashboard/interviews",
    },
    { name: "Jobs Applied", icon: Briefcase, href: "/dashboard/applications" },
  ];

  // ✅ loading state from store
  if (loading) {
    return <p className="text-white p-10">Checking access...</p>;
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/10 bg-slate-950/50 backdrop-blur-xl flex flex-col fixed h-full z-20">
        <div className="p-8">
          <h2 className="text-xl font-bold bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            HireFlow+
          </h2>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">
            Candidate Portal
          </p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathName === item.href;

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
