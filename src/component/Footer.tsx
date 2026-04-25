"use client";
import React from "react";
import Link from "next/link";
// Using Font Awesome (fa6) for brand logos
import { 
  FaLinkedinIn, 
  FaGithub, 
  FaXTwitter, 
  FaInstagram 
} from "react-icons/fa6";
// Using Lucide for functional UI icons
import { Mail, MapPin, Phone, Send, ExternalLink } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Platform: [
      { name: "Browse Jobs", href: "/Jobs" },
      { name: "Companies", href: "/companies" },
      { name: "Salaries", href: "/salaries" },
    ],
    Recruiters: [
      { name: "Post a Job", href: "/post-job" },
      { name: "Talent Pool", href: "/talent" },
      { name: "Pricing", href: "/pricing" },
    ],
    Support: [
      { name: "Help Center", href: "/help" },
      { name: "Privacy", href: "/privacy" },
      { name: "Terms", href: "/terms" },
    ],
  };

  return (
    <footer className="w-full bg-[oklch(0.12_0.01_250)] border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Newsletter */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-2xl font-black text-white tracking-tighter">
              HIREFLOW<span className="text-white">+</span>
            </h2>
            <p className="text-sm text-white/50 leading-relaxed">
              Connecting elite talent with world-class opportunities through AI-driven precision.
            </p>
            
            <div className="flex items-center gap-4">
              <Link href="#" className="p-2.5 rounded-lg bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all">
                <FaLinkedinIn className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2.5 rounded-lg bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all">
                <FaGithub className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2.5 rounded-lg bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all">
                <FaXTwitter className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
                {title}
              </h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-1 group"
                    >
                      {link.name}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-y border-white/5 mb-10">
          <div className="flex items-center gap-3 text-xs text-white/40">
            <div className="p-2 rounded-full bg-white/5"><MapPin className="w-3.5 h-3.5 text-gray/5" /></div>
            Asansol, West Bengal
          </div>
          <div className="flex items-center gap-3 text-xs text-white/40">
            <div className="p-2 rounded-full bg-white/5"><Mail className="w-3.5 h-3.5 text-gray/5" /></div>
            hello@hireflow.plus
          </div>
          <div className="flex items-center gap-3 text-xs text-white/40">
            <div className="p-2 rounded-full bg-white/5"><Phone className="w-3.5 h-3.5 text-gray/5" /></div>
            +91 (0) 341 234 5678
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="text-center md:text-left">
          <p className="text-[10px] uppercase tracking-widest text-white/20">
            © {currentYear} HireFlow+ Recruitment Platform. Built by <span className="text-white/40 font-bold">Mrinal Mondal</span>.
          </p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;