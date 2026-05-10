"use client";

import React, { useState } from "react";

import {
  Search,
  Ban,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Clock,
} from "lucide-react";

import { useToggleUserStatus } from "@/hooks/useToggelUserStatus";
import { useAllUser } from "@/hooks/useAllUsers";

export default function AllUsers() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: users = [], isLoading } = useAllUser();

  const toggleStatus = useToggleUserStatus();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading users...
      </div>
    );
  }

  const filteredUsers = users.filter((user: any) => {
    return (
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          User Management
        </h1>

        <p className="text-slate-400 mt-2">
          Manage all job seekers on the platform
        </p>
      </div>

      {/* Search */}
      <div className="bg-slate-900/30 border border-white/10 rounded-2xl p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />

          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-slate-900/30 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50 border-b border-white/10">
              <tr>
                <th className="text-left p-4 text-slate-400 font-medium">
                  User
                </th>

                <th className="text-left p-4 text-slate-400 font-medium">
                  Contact
                </th>

                <th className="text-left p-4 text-slate-400 font-medium">
                  Activity
                </th>

                <th className="text-left p-4 text-slate-400 font-medium">
                  Status
                </th>

                <th className="text-left p-4 text-slate-400 font-medium">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user: any) => (
                <tr
                  key={user.id}
                  className={`
                    border-b border-white/5 transition
                    ${
                      user.status === "blocked"
                        ? "bg-red-500/5 opacity-70"
                        : "hover:bg-white/5"
                    }
                  `}
                >
                  {/* User */}
                  <td className="p-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-white font-medium">
                          {user.full_name || "Unknown User"}
                        </p>

                        {user.status === "blocked" && (
                          <span className="px-2 py-0.5 text-[10px] rounded-full bg-red-500/20 text-red-400 border border-red-500/20">
                            BLOCKED
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-400">
                        ID: #{user.id?.slice(0, 8)}
                      </p>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="p-4">
                    <div className="space-y-1">

                      {/* Email */}
                      <div
                        className={`flex items-center gap-2 text-sm ${
                          user.status === "blocked"
                            ? "text-slate-500"
                            : "text-slate-300"
                        }`}
                      >
                        <Mail className="w-3 h-3" />
                        {user.email}
                      </div>

                      {/* Phone */}
                      {user.phone && (
                        <div className="flex items-center gap-2 text-slate-400 text-xs">
                          <Phone className="w-3 h-3" />
                          {user.phone}
                        </div>
                      )}

                      {/* Location */}
                      {user.location && (
                        <div className="flex items-center gap-2 text-slate-400 text-xs">
                          <MapPin className="w-3 h-3" />
                          {user.location}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Activity */}
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-white">
                        <Briefcase className="w-3 h-3" />
                        Job Seeker
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Clock className="w-3 h-3" />
                        Joined Recently
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === "blocked"
                          ? "bg-red-500/10 text-red-400"
                          : "bg-emerald-500/10 text-emerald-400"
                      }`}
                    >
                      {user.status || "active"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-4">
                    {user.status === "blocked" ? (
                      <button
                        onClick={() =>
                          toggleStatus.mutate({
                            userId: user.id,
                            status: "active",
                          })
                        }
                        className="p-2 bg-emerald-600/20 hover:bg-emerald-600/30 rounded-lg transition cursor-pointer"
                      >
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          toggleStatus.mutate({
                            userId: user.id,
                            status: "blocked",
                          })
                        }
                        className="p-2 bg-red-600/20 hover:bg-red-600/30 rounded-lg transition cursor-pointer"
                      >
                        <Ban className="w-4 h-4 text-red-400" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-10 text-slate-500"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}