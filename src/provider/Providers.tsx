"use client";

import { useAuthInit } from "@/hooks/useAuthInit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";


export default function Providers({ children }: any) {
   const [queryClient] = useState(() => new QueryClient());

  useAuthInit();

  return (

    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
