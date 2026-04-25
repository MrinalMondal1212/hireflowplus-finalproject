"use client";
import React from "react";
import LogoLoop from "@/components/LogoLoop";
// Import the specific icons from the 'si' (Simple Icons) folder
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
} from "react-icons/si";

const TechLogos = () => {
  const techLogos = [
    {
      node: (
        <SiReact className="text-white opacity-70 hover:opacity-100 transition-opacity" />
      ),
      title: "React",
      href: "https://react.dev",
    },
    {
      node: (
        <SiNextdotjs className="text-white opacity-70 hover:opacity-100 transition-opacity" />
      ),
      title: "Next.js",
      href: "https://nextjs.org",
    },
    {
      node: (
        <SiTypescript className="text-white opacity-70 hover:opacity-100 transition-opacity" />
      ),
      title: "TypeScript",
      href: "https://www.typescriptlang.org",
    },
    {
      node: (
        <SiTailwindcss className="text-white opacity-70 hover:opacity-100 transition-opacity" />
      ),
      title: "Tailwind CSS",
      href: "https://tailwindcss.com",
    },
  ];

  return (
    <div className="w-full mt-10 flex items-center bg-[oklch(0.12_0.01_250)] py-10">
      <div className="relative  overflow-hidden">
        {/* Basic horizontal loop */}
        <LogoLoop
          logos={techLogos}
          speed={80}
          direction="left"
          logoHeight={50}
          gap={80}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          // Fixed: Changed from #ffffff to match your Dark Veil background
          fadeOutColor="oklch(0.12 0.01 250)"
          ariaLabel="Technology partners"
        />
      </div>
    </div>
  );
};

export default TechLogos;
