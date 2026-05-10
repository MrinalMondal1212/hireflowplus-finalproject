import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export const useRecruiterAnalytics = (
  recruiterId: string
) => {
  return useQuery({
    queryKey: ["recruiter-analytics", recruiterId],

    queryFn: async () => {
      // get recruiter jobs
      const { data: jobs, error: jobsError } =
        await supabase
          .from("jobs")
          .select("id")
          .eq("recruiter_id", recruiterId);

      if (jobsError) throw jobsError;

      if (!jobs?.length) {
        return {
          totalJobs: 0,
          totalApplicants: 0,
          shortlisted: 0,
          rejected: 0,
          interviews: 0,
          hired: 0,
        };
      }

      const jobIds = jobs.map((job) => job.id);

      // get applications
      const { data: applications, error } =
        await supabase
          .from("applications")
          .select("*")
          .in("job_id", jobIds);

      if (error) throw error;

      const shortlisted = applications.filter(
        (a) => a.status === "shortlisted"
      ).length;

      const rejected = applications.filter(
        (a) => a.status === "rejected"
      ).length;

      const interviews = applications.filter(
        (a) =>
          a.interview_status === "scheduled"
      ).length;

      const hired = applications.filter(
        (a) => a.status === "hired"
      ).length;

      return {
        totalJobs: jobs.length,
        totalApplicants: applications.length,
        shortlisted,
        rejected,
        interviews,
        hired,
      };
    },

    enabled: !!recruiterId,
  });
};