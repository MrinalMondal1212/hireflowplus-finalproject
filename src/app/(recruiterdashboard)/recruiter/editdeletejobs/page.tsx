"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useForm } from "react-hook-form";

import { useRecruiterJobs } from "@/hooks/useRecruiterJobs";
import { useDeleteJob } from "@/hooks/useDeleteJobs";
import { useUpdateJob } from "@/hooks/useUpdateJobs";

const EditandDelete = () => {
  const { data: jobs = [], isLoading } = useRecruiterJobs();
  const { mutate: deleteJob } = useDeleteJob();
  const { mutate: updateJob, isPending } = useUpdateJob();

  const [editOpen, setEditOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  const { register, handleSubmit, reset } = useForm();

  // 🟡 Edit handler
  const handleEdit = (job: any) => {
    setSelectedJob(job);

    reset({
      ...job,
      skills: job.skills?.join(", ") || "",
    });

    setEditOpen(true);
  };

  // 🔴 Delete handler
  const handleDelete = (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    deleteJob(id);
  };

  // 🟢 Submit edit
  const onEditSubmit = (data: any) => {
    const formatted = {
      ...data,
      skills: data.skills
        ? data.skills.split(",").map((s: string) => s.trim())
        : [],
    };

    updateJob(
      {
        id: selectedJob.id,
        data: formatted,
      },
      {
        onSuccess: () => {
          setEditOpen(false);
        },
      }
    );
  };

  if (isLoading) return <p className="text-white">Loading...</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">Your Jobs</h2>

      {jobs.length === 0 && (
        <p className="text-slate-400">No jobs found</p>
      )}

      {jobs.map((job: any) => (
        <div
          key={job.id}
          className="p-4 bg-slate-900 border border-white/10 rounded-xl"
        >
          <h3 className="text-lg font-semibold text-white">{job.title}</h3>
          <p className="text-sm text-slate-400">{job.location}</p>

          <div className="flex gap-3 mt-2">
            <span className="text-xs px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded">
              {job.status}
            </span>
            <span className="text-xs text-slate-400">
              {new Date(job.created_at).toLocaleDateString()}
            </span>
          </div>

          {/* 🔘 Actions */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => handleEdit(job)}
              className="text-indigo-400 text-sm"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(job.id)}
              className="text-rose-400 text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* 🟡 Edit Dialog */}
      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Job</DialogTitle>

        <form onSubmit={handleSubmit(onEditSubmit)}>
          <DialogContent className="space-y-4 flex flex-col">

            <input {...register("title")} className="border p-2 rounded" />

            <input {...register("location")} className="border p-2 rounded" />

            <input {...register("job_type")} className="border p-2 rounded" />

            <textarea {...register("description")} className="border p-2 rounded" />

            <input type="number" {...register("salary_min")} className="border p-2 rounded" />

            <input type="number" {...register("salary_max")} className="border p-2 rounded" />

            <input {...register("skills")} className="border p-2 rounded" />

          </DialogContent>

          <DialogActions>
            <button type="button" onClick={() => setEditOpen(false)}>
              Cancel
            </button>

            <button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save Changes"}
            </button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default EditandDelete;