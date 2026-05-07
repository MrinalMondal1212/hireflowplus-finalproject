export type Profile = {
  id?: string;
  name: string;
  education: string;
  email: string;
  phone?: string | null;
  location: string;
  bio?: string | null;
  resume_url : string;
  skills? : string;
  experience? : string
};