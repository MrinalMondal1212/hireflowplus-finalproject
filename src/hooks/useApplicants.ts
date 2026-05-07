import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export const useApplicants = (recruiterId: string) => {
  return useQuery({
    queryKey: ["applicants", recruiterId],

    queryFn: async () => {
      // Step 1
      const { data: jobs, error: jobsError } = await supabase
        .from("jobs")
        .select("id")
        .eq("recruiter_id", recruiterId);

      if (jobsError) throw jobsError;

      if (!jobs || jobs.length === 0) {
        return [];
      }

      const jobIds = jobs.map((job) => job.id);

      // Step 2
      const { data: applications, error: appsError } = await supabase
        .from("applications")
        .select(`
          id,
          status,
          created_at,
          job_id,
          user_id,
          recruiter_note,
          recruiter_rating,
          interview_date,
          interview_status,
          meeting_link,

          profile:profiles!applications_user_id_fkey (
            id,
            user_id,
            name,
            email,
            education,
            skills
          ),

          job:job_id (
            id,
            title,
            recruiter_id,
            company
          )
        `)
        .in("job_id", jobIds);

      if (appsError) throw appsError;

      return applications;
    },

    enabled: !!recruiterId,
  });
};