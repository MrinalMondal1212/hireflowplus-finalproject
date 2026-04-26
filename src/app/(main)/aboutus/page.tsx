// app/about/page.tsx
"use client";
import React from 'react';
import { 
  Users, Briefcase, Target, Zap, 
  Shield, Globe, Award, Heart, 
  TrendingUp, Clock, Star, ChevronRight 
} from 'lucide-react';
import Link from 'next/link';
import { AuroraText } from "@/components/ui/aurora-text";

export default function AboutPage() {
  const stats = [
    { label: "Active Users", value: "50,000+", icon: Users, color: "from-indigo-600" },
    { label: "Jobs Posted", value: "10,000+", icon: Briefcase, color: "from-purple-600" },
    { label: "Companies", value: "2,500+", icon: Globe, color: "from-emerald-600" },
    { label: "Success Rate", value: "94%", icon: TrendingUp, color: "from-cyan-600" }
  ];

  const values = [
    {
      title: "Innovation First",
      description: "We continuously evolve our platform with cutting-edge AI and machine learning to deliver the best matching experience.",
      icon: Zap,
      color: "indigo"
    },
    {
      title: "Transparency",
      description: "We believe in honest communication, clear processes, and building trust with every user on our platform.",
      icon: Shield,
      color: "emerald"
    },
    {
      title: "User-Centric",
      description: "Every feature we build is designed with our users' needs at the forefront, ensuring the best possible experience.",
      icon: Heart,
      color: "rose"
    },
    {
      title: "Excellence",
      description: "We strive for excellence in everything we do, from our technology to our customer support.",
      icon: Award,
      color: "amber"
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      bio: "Former tech recruiter with 15+ years of experience building high-performance teams.",
      avatar: "/avatars/sarah.jpg"
    },
    {
      name: "Michael Chen",
      role: "CTO",
      bio: "AI and machine learning expert who built matching algorithms at Google.",
      avatar: "/avatars/michael.jpg"
    },
    {
      name: "Emma Rodriguez",
      role: "Head of Product",
      bio: "Product strategist focused on creating intuitive user experiences.",
      avatar: "/avatars/emma.jpg"
    },
    {
      name: "David Kim",
      role: "Head of Customer Success",
      bio: "Dedicated to ensuring every user gets the support they need.",
      avatar: "/avatars/david.jpg"
    }
  ];

  const milestones = [
    { year: "2022", title: "Founded", description: "HireFlow+ was founded with a mission to revolutionize recruitment" },
    { year: "2023", title: "Launch", description: "Platform launched with 100+ companies on board" },
    { year: "2024", title: "Growth", description: "Reached 10,000+ successful placements" },
    { year: "2025", title: "Expansion", description: "Expanded to 15 countries globally" }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Revolutionizing the way{" "}
            <AuroraText>talent meets opportunity</AuroraText>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to create a world where finding the perfect job or candidate 
            is seamless, fast, and powered by intelligent technology.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="relative group">
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.color} to-transparent rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500`}></div>
              <div className="relative p-6 bg-slate-900/50 border border-white/10 rounded-2xl text-center">
                <stat.icon className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-slate-300">
              <p>
                Founded in 2022, HireFlow+ emerged from a simple observation: 
                the recruiting process was broken. Too much time wasted, too many 
                mismatched opportunities, and too much frustration on both sides.
              </p>
              <p>
                Our founder, Sarah Johnson, experienced these challenges firsthand 
                as a tech recruiter. She saw talented candidates get overlooked and 
                companies struggle to find the right fit. That's when she decided 
                to build something better.
              </p>
              <p>
                Today, HireFlow+ uses proprietary neural matching technology to 
                connect elite talent with the world's most innovative companies. 
                We've helped thousands of professionals find their dream jobs and 
                businesses build extraordinary teams.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl blur-2xl opacity-20"></div>
            <div className="relative bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/10 rounded-3xl p-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center">
                    <Target className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Our Mission</p>
                    <p className="text-sm text-slate-400">Connect talent with opportunity</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Our Vision</p>
                    <p className="text-sm text-slate-400">Revolutionize global recruitment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-slate-950/50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="group p-6 bg-slate-900/30 border border-white/10 rounded-2xl hover:border-indigo-500/50 transition-all">
                <value.icon className={`w-10 h-10 text-${value.color}-400 mb-4`} />
                <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Milestones Timeline */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our Journey
          </h2>
          <p className="text-slate-400 text-lg">Key milestones along the way</p>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {milestones.map((milestone, index) => (
            <div key={milestone.year} className="relative">
              {index < milestones.length - 1 && (
                <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-indigo-500/50 to-transparent" />
              )}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                <div className="relative p-6 bg-slate-900/50 border border-white/10 rounded-2xl text-center group-hover:border-indigo-500/30 transition-all">
                  <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-5 h-5 text-indigo-400" />
                  </div>
                  <p className="text-2xl font-bold text-indigo-400">{milestone.year}</p>
                  <p className="text-white font-semibold mt-2">{milestone.title}</p>
                  <p className="text-xs text-slate-400 mt-1">{milestone.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-slate-950/50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Meet Our Leadership
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Passionate people dedicated to your success
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="group p-6 bg-slate-900/30 border border-white/10 rounded-2xl text-center hover:border-indigo-500/50 transition-all">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                <p className="text-indigo-400 text-sm mb-2">{member.role}</p>
                <p className="text-slate-400 text-xs">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition duration-500"></div>
          <div className="relative bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-cyan-600/10 border border-white/10 rounded-3xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Hiring?
            </h2>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of companies and professionals who trust HireFlow+ for their recruitment needs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/recruiter/postjobs">
                <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25">
                  Post a Job
                </button>
              </Link>
              <Link href="/jobs">
                <button className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-all">
                  Find Jobs
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}