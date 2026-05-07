"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useCreateJob } from "@/hooks/useCreateJob";
import { useRecruiterJobs } from "@/hooks/useRecruiterJobs";

const PostJobs = () => {
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm();
  const { mutate, isPending } = useCreateJob();

  const { data: jobs = [], isLoading } = useRecruiterJobs();
  const onSubmit = (data: any) => {
    const formatted = {
      ...data,
      skills: data.skills
        ? data.skills.split(",").map((s: string) => s.trim())
        : [],
      status: "draft",
    };

    mutate(formatted, {
      onSuccess: () => {
        setOpen(false);
        reset();
      },
    });
  };

  return (
    <div>
      {/* 🔘 Button */}
      <button
        onClick={() => setOpen(true)}
        className="bg-indigo-600 px-4 py-2 rounded text-white"
      >
        Post Job
      </button>

      {/* 📦 Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Post a Job</DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent className="space-y-4 flex flex-col">
            <input
              {...register("title")}
              placeholder="Job Title"
              className="border p-2 rounded"
            />
            <input
              {...register("company")}
              placeholder="Company Name"
              className="border p-2 rounded"
            />

            <input
              {...register("location")}
              placeholder="Location"
              className="border p-2 rounded"
            />

            <input
              {...register("job_type")}
              placeholder="Job Type"
              className="border p-2 rounded"
            />

            <textarea
              {...register("description")}
              placeholder="Description"
              className="border p-2 rounded"
            />

            <input
              type="number"
              {...register("salary_min")}
              placeholder="Min Salary"
              className="border p-2 rounded"
            />

            <input
              type="number"
              {...register("salary_max")}
              placeholder="Max Salary"
              className="border p-2 rounded"
            />

            <input
              {...register("skills")}
              placeholder="React, Node, SQL"
              className="border p-2 rounded"
            />
          </DialogContent>

          <DialogActions>
            <button type="button" onClick={() => setOpen(false)}>
              Cancel
            </button>

            <button type="submit" disabled={isPending}>
              {isPending ? "Posting..." : "Post Job"}
            </button>
          </DialogActions>
        </form>
      </Dialog>
      <div className="mt-6 space-y-4">
        <h2 className="text-xl font-bold text-white">Your Jobs</h2>

        {isLoading && <p className="text-white">Loading...</p>}

        {jobs.length === 0 && (
          <p className="text-slate-400">No jobs posted yet</p>
        )}

        {jobs.map((job: any) => (
          <div
            key={job.id}
            className="p-4 bg-slate-900 border border-white/10 rounded-xl"
          >
            <h3 className="text-lg font-semibold text-white">{job.title}</h3>
            <p className="text-xl text-slate-400">{job.company}</p>
            <p className="text-sm text-slate-400">{job.location}</p>

            <div className="flex gap-3 mt-2">
              <span className="text-xs px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded">
                {job.status}
              </span>

              <span className="text-xs text-slate-400">
                {new Date(job.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostJobs;
