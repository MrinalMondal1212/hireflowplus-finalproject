import path from "path";
import { supabase } from "./supabase";


// get profile data
export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

    if (error && error.code !== "PGRST116") {
    throw new Error(error.message);
  }
  return data
};


// upset profile means user can insert and update  data 
export const upsertProfile = async (profile: any) => {
  const { data, error } = await supabase
    .from("profiles").upsert(profile,{onConflict:"user_id"})
    if(error) throw new Error(error.message);
    return data
};

// upload resume 


export const uploadResume = async(file : File, user_id: string)=>{
  const filePath = `resumes/${user_id}/${file.name}`;
  const {error} = await supabase.storage.from("resumes").upload(filePath,file,{upsert:true})

  if(error) throw new Error(error.message);
  const {data} = supabase.storage.from("resumes").getPublicUrl(filePath)
  return data.publicUrl

}
