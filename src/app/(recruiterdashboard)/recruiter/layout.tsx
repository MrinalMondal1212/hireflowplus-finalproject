import React from "react";
import Link from "next/link";
import { User, Calendar, Briefcase, LogOut, LayoutDashboard, Edit } from "lucide-react";

export default function RecuriterDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuItems = [
    // Added Dashboard button at the top of the list
    { name: "Dashboard", icon: LayoutDashboard, href: "/recruiter" },
    { name: "Applicant", icon: User, href: "/recruiter/applicant" },
    { name: "Post Jobs", icon: Calendar, href: "/recruiter/postjobs" },
    { name: "Edit / Delete", icon: Edit, href: "/recruiter/editdeletejobs" },  
  ];

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar - Fixed to the left */}
      <aside className="w-72 border-r border-white/10 bg-slate-950/50 backdrop-blur-xl flex flex-col fixed h-full z-20">
        <div className="p-8">
          <h2 className="text-xl font-bold bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            HireFlow+
          </h2>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">Recruiter Portal</p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all group"
            >
              {/* Icon color changes on hover to match your brand indigo */}
              <item.icon className="w-5 h-5 group-hover:text-indigo-400 transition-colors" />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom Section (Logout) */}
        <div className="p-4 border-t border-white/10">
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-all">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-72">
        <div className="max-w-6xl mx-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}