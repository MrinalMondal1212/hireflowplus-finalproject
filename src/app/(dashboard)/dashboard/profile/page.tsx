"use client";

import React, { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Edit3,
  Save,
  X,
  Download,
  Eye,
  Award,
} from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
} from "@mui/material";
import { useProfile } from "@/hooks/userProfile";
import { useUpdataProfile } from "@/hooks/useUpdataProfile";

import { useAuthStore } from "@/store/useAuthStore";
import { Profile } from "@/type/Profile";
import { useUploadResume } from "@/hooks/useUploadResume";

// 1. Define Validation Schema
const profileSchema = yup.object({
  name: yup.string().required("Full name is required").min(3, "Too short!"),
  education: yup.string().required("Education is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  skills: yup.string().required("Please list at least one skill"),
  location: yup.string().required("Location is required"),
  bio: yup.string().nullable().optional(),
  experience: yup.string().nullable().optional(),
  phone: yup.string().nullable().optional(), // Add phone field
});

export default function ProfilePage() {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useProfile();
  const { mutate } = useUpdataProfile();
  const user = useAuthStore((s) => s.user);
  const { mutate: uploadResume, isPending } = useUploadResume();

  // 2. Initialize Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Profile>({
    resolver: yupResolver(profileSchema) as any,
  });

  useEffect(() => {
    if (data) {
      reset({
        ...data,
        skills: Array.isArray(data.skills)
          ? data.skills.join(", ")
          : data.skills || "",
      });
    }
  }, [data, reset]);
  const skillsArray = Array.isArray(data?.skills)
    ? data.skills
    : typeof data?.skills === "string"
      ? data.skills.split(",").map((s) => s.trim())
      : [];

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset();
  };
 const onSubmit: SubmitHandler<Profile> = (formData) => {
  console.log("FORM SUBMITTED ✅", formData);
  
  // Check for validation errors first
  if (Object.keys(errors).length > 0) {
    console.log("Validation errors:", errors);
    return;
  }
  
  const formattedData = {
    ...formData,
    skills: formData.skills
      ? formData.skills
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean)
      : [],
    // Ensure null values are handled
    phone: formData.phone || null,
    experience: formData.experience || null,
    bio: formData.bio || null,
  };

  mutate(formattedData, {
    onSuccess: () => {
      setOpen(false);
    },
    onError: (error) => {
      console.error("Update failed:", error);
    },
  });
};

  if (isLoading) return <p className="text-white">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Your Profile</h1>
        {data?.resume_url && (
          <div className="flex text-white  gap-4 mt-4">
            <a
              href={data.resume_url}
              target="_blank"
              className="bg-green-600 flex gap-3 px-4 py-2 rounded"
            >
              <Eye size={18} />
              View Resume
            </a>

            <a
              href={data.resume_url}
              download
              className="bg-blue-600 flex gap-3 px-4 py-2 rounded"
            >
              <Download size={18} /> Download Resume
            </a>
          </div>
        )}
        <button
          onClick={handleOpen}
          className="flex items-center gap-2 px-5 py-2.5 p-3 cursor-pointer bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all text-sm font-semibold shadow-lg shadow-indigo-500/20"
        >
          <Edit3 className="w-4 h-4" /> Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-1 bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-10 text-center backdrop-blur-sm">
          <div className="w-32 h-32 bg-linear-to-br from-indigo-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl font-bold border-4 border-[#020617] shadow-2xl">
            {data?.name || "no name "}
          </div>
          <h2 className="text-2xl font-bold text-white">{data?.name}</h2>
          <p className="text-indigo-400 font-medium mt-1">{data?.education}</p>

          <div className="mt-10 space-y-5 text-left border-t border-white/5 pt-8">
            <ContactInfo icon={<Mail />} text={data?.email} />
            <ContactInfo icon={<Phone />} text={data?.phone ?? undefined} />
            <ContactInfo icon={<MapPin />} text={data?.location} />
            <ContactInfo icon={<Award />} text={data?.experience} />
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          <Section cardTitle="About Me">
            <p className="text-slate-400 leading-relaxed text-lg">
              {data?.bio}
            </p>
          </Section>

          {/* here is the skills section */}
          <Section cardTitle="Skills">
            <div className="flex flex-wrap  gap-3">
              {skillsArray?.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="px-5 py-2 p-3 bg-white/5 border border-white/10 rounded-2xl text-sm font-medium text-slate-300 hover:border-indigo-500/50 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Section>
        </div>
      </div>

      {/* --- MUI EDIT DIALOG --- */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        slotProps={{
          paper: {
            className:
              "bg-slate-950 border border-white/10 text-white rounded-3xl p-4",
            style: { backgroundColor: "#020617" },
          },
        }}
      >
        <DialogTitle className="flex justify-between items-center border-b border-white/10 pb-4">
          <span className="text-xl text-white font-bold">Update Profile</span>
          <IconButton
            onClick={handleClose}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </IconButton>
        </DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent className="space-y-5 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Full Name"
                name="name"
                register={register}
                error={errors.name}
              />
              <FormInput
                label="education"
                name="education"
                register={register}
                error={errors.education}
              />
            </div>

            <FormInput
              label="Email Address"
              name="email"
              register={register}
              error={errors.email}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Phone"
                name="phone"
                register={register}
                error={errors.phone}
              />
              <FormInput
                label="Location"
                name="location"
                register={register}
                error={errors.location}
              />
              <FormInput
                label="Experience"
                name="experience"
                register={register}
                error={errors.experience}
              />
            </div>
            <div className="mt-6">
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (file) {
                    // ✅ validation
                    if (file.type !== "application/pdf") {
                      alert("Only PDF allowed");
                      return;
                    }

                    if (file.size > 2 * 1024 * 1024) {
                      alert("Max file size is 2MB");
                      return;
                    }

                    uploadResume(file);
                  }
                }}
                className="hidden"
                id="resumeUpload"
              />

              <label
                htmlFor="resumeUpload"
                className="cursor-pointer  bg-indigo-600 px-4 py-2 rounded-lg inline-block"
              >
                {isPending ? "Uploading..." : "Upload Resume"}
              </label>
            </div>
            {/* this is the skills section */}
            {/* --- Skills Section --- */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Skills (comma separated)
              </label>
              <textarea
                {...register("skills")}
                className={`w-full bg-white/5 text-white border ${
                  errors.skills ? "border-rose-500" : "border-white/10"
                } rounded-xl p-3 text-sm focus:border-indigo-500 outline-none h-20 transition-all`}
                placeholder="React, Next.js, TypeScript"
              />
              {errors.skills && (
                <Typography
                  sx={{ color: "#ef4444", fontSize: "12px", fontWeight: 500 }}
                >
                  {errors.skills.message}
                </Typography>
              )}
            </div>

            {/* --- Bio Section --- */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Bio
              </label>
              <textarea
                {...register("bio")}
                className={`w-full bg-white/5 text-white border ${
                  errors.bio ? "border-rose-500" : "border-white/10"
                } rounded-xl p-3 text-sm focus:border-indigo-500 outline-none h-32 transition-all`}
                placeholder="Tell recruiters about yourself..."
              />
              {errors.bio && (
                <Typography
                  sx={{ color: "#ef4444", fontSize: "12px", fontWeight: 500 }}
                >
                  {errors.bio.message}
                </Typography>
              )}
            </div>
          </DialogContent>

          <DialogActions className="p-6 border-t border-white/10">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2.5 text-sm cursor-pointer font-medium text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 cursor-pointer px-8 py-2.5 p-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-500/20"
            >
              {isSubmitting ? (
                "Saving..."
              ) : (
                <>
                  <Save className="w-4 h-4" /> Save Changes
                </>
              )}
            </button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

// --- SUB-COMPONENTS FOR CLEANER CODE ---

const ContactInfo = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text?: string;
}) => (
  <div className="flex items-center gap-4 text-slate-400 group">
    <div className="p-2 bg-white/5 rounded-lg group-hover:text-indigo-400 transition-colors">
      {icon}
    </div>
    <span className="text-sm">{text}</span>
  </div>
);

const Section = ({
  cardTitle,
  children,
}: {
  cardTitle: string;
  children: React.ReactNode;
}) => (
  <div className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-10 backdrop-blur-sm">
    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">
      {cardTitle}
    </h3>
    {children}
  </div>
);

type FormINputvalidation = {
  label: string;
  name: keyof Profile;
  register: any;
  error?: any;
};
const FormInput = ({ label, name, register, error }: FormINputvalidation) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
      {label}
    </label>
    <input
      {...register(name)}
      className={`bg-white/5 text-white border ${
        error ? "border-rose-500 ring-1 ring-rose-500/20" : "border-white/10"
      } rounded-xl p-3 text-sm focus:border-indigo-500 outline-none transition-all`}
    />
  {error && (
  <Typography sx={{ color: '#ef4444', fontSize: '12px', fontWeight: 500 }}>
    {error.message}
  </Typography>
)}
  </div>
);
