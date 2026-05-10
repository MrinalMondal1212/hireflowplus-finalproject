import JobsClient from "@/component/jobsClient";
import { Suspense } from "react";


export default function Page() {
  return (
    <Suspense fallback={<div>Loading jobs...</div>}>
      <JobsClient />
    </Suspense>
  );
}