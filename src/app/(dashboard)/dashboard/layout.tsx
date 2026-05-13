"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  User,
  Calendar,
  Briefcase,
  LogOut,
  LayoutDashboard,
  House,
  Menu,
  X,
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
  const { user, role, loading } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (role !== "user") {
        router.push("/");
      }
    }
  }, [user, role, loading, router]);

  // Close sidebar when navigating on mobile
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathName]);

  const handleLogout = async () => {
    await logoutUser();
    router.push("/login");
  };

  const menuItems = [
    { name: "Home", icon: House, href: "/" },
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Profile View", icon: User, href: "/dashboard/profile" },
    { name: "Interview Schedule", icon: Calendar, href: "/dashboard/interviews" },
    { name: "Jobs Applied", icon: Briefcase, href: "/dashboard/applications" },
  ];

  if (loading) return <p className="text-white p-10">Checking access...</p>;

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-slate-950 border-b border-white/10 p-4 flex justify-between items-center z-30">
        <h2 className="text-xl font-bold bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          HireFlow+
        </h2>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-400">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 w-72 border-r border-white/10 bg-slate-950 flex flex-col z-50 transition-transform duration-300 lg:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="p-8">
          <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            HireFlow+
          </h2>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">Candidate Portal</p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathName === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group
                  ${isActive ? "bg-indigo-500/15 text-white border border-indigo-500/20" : "text-slate-400 hover:text-white hover:bg-white/5"}
                `}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-indigo-400" : "group-hover:text-indigo-400"}`} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-all">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 pt-20 lg:pt-0">
        <div className="max-w-6xl mx-auto p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}