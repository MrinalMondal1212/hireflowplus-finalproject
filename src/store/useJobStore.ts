import { Search } from "lucide-react";
import { create } from "zustand";

interface JobState {
  search: string;
  setSearch: (value: string) => void;
}

export const useJobStore = create((set) => ({
  seacrh: "",
  setSearch: (value:any) => set({ search: value }),
}));
