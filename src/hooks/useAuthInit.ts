"use cleint"
import { getUserRole } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/useAuthStore"
import { useEffect } from "react";




export const useAuthInit =()=>{
    const setAuth = useAuthStore((s)=> s.setAuth);
    const setLoading = useAuthStore((s)=> s.setLoading)

    useEffect(()=>{
        const init = async () =>{
            const {data} = await supabase.auth.getUser();

            if(data.user){
                const role = await getUserRole(data.user.id);
                setAuth(data.user,role);

            }else{
                setLoading(false)
            }
        }
        init()
    },[])

}