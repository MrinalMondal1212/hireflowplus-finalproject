import { fetchJobs } from "@/lib/job"
import {useQuery} from "@tanstack/react-query"


export const useJobs =()=>{
    return useQuery({
        queryKey : ["jobs"],
        queryFn : fetchJobs
    })
}