import { create } from "zustand";

interface SavedJobsState {
  savedJobs: string[];
  addSavedJob: (jobId: string) => void;
  removeSavedJob: (jobId: string) => void;
}

export const useSavedJobsStore = create<SavedJobsState>((set) => ({
  savedJobs: [],

  addSavedJob: (jobId) =>
    set((state) => ({
      savedJobs: [...state.savedJobs, jobId],
    })),

  removeSavedJob: (jobId) =>
    set((state) => ({
      savedJobs: state.savedJobs.filter((id) => id !== jobId),
    })),
}));