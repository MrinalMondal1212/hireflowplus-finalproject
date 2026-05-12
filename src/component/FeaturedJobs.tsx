"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // Assuming Shadcn
import {
  MapPin,
  Briefcase,
  Clock,
  ArrowUpRight,
  SquarePlus,
} from "lucide-react";
import Orb from "@/components/Orb"; // Your Orb component
import GradientText from "@/components/GradientText";
import { useJobs } from "@/hooks/useJobs";
import Link from "next/link";

const FeaturedJobs = () => {
  const router = useRouter();
  const { data: jobs, isLoading, isError } = useJobs();

  if (isLoading) return <p>Loading....</p>;
  if (isError) return <p>Error....</p>;

  return (
    <section className="w-full py-20 bg-[oklch(0.12_0.01_250)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-5xl font-bold text-white tracking-tight">
            Featured Jobs
          </h2>
          <Button
            onClick={() => router.push("/jobs")}
            variant="link"
            className="border hover:text-white transition-colors text-2xl font-semibold"
          >
            <GradientText
              colors={["#5227FF", "#FF9FFC", "#B497CF"]}
              animationSpeed={8}
              showBorder={false}
              className="custom-class"
            >
              View All Jobs
            </GradientText>
          </Button>
        </div>

        {/* The "Container" for Orb + Grid */}
        <div className="relative w-full min-h-200 flex items-center justify-center">
          {/* Background Orb Layer */}
          <div className="absolute inset-0 z-0 opacity-60">
            <Orb
              hoverIntensity={0.5}
              rotateOnHover
              hue={250} // Matches your blue-ish accent
              forceHoverState={false}
              backgroundColor="transparent" // Vital so it doesn't hide the section bg
            />
          </div>

          {/* Foreground 3x3 Grid Layer */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {jobs?.slice(0,9).map((job: any) => (
              <div
                key={job.id}
                className="group p-6 rounded-2xl bg-white/3 border border-white/10 backdrop-blur-md hover:bg-white/[0.07] hover:border-(--primary)/40 transition-all duration-500 cursor-pointer shadow-2xl"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-(--primary)/10 rounded-lg">
                    <Briefcase color="white" className="w-5 h-5 " />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-xl font-bold text-white mb-1">
                  {job.title}
                </h3>
                <p className=" text-sm text-white font-medium mb-4">
                  {job.company}
                </p>

                <div className="flex items-center gap-4 text-sm text-[oklch(0.80_0_0)]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {job.job_type}
                  </span>
                  <Link
                    href={`/jobs/${job.id}`}
                    className="flex border border-white/10 backdrop-blur-md p-2 rounded-2xl items-center gap-1 hover:bg-white/10 transition"
                  >
                    <SquarePlus className="w-4 h-4" />
                    Apply
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
