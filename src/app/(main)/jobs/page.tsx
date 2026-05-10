import { Suspense } from "react";
import JobsClient from "../jobsClient/page";


export default function JobsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JobsClient />
    </Suspense>
  );
}