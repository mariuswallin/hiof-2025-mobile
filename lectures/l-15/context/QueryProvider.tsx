// context/QueryProvider.tsx

import type React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Opprett en QueryClient-instans
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutter
      retry: 2,
    },
  },
});

type QueryProviderProps = {
  children: React.ReactNode;
};

export const QueryProvider = ({ children }: QueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

// Eksporter queryClient for bruk i andre filer om nødvendig
export { queryClient };
