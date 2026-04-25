"use client"

import { NuqsAdapter } from "nuqs/adapters/next/app"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import { getQueryClient } from "@/lib/query-client"
import { ThemeProvider } from "@/components/theme-provider"

export function Providers({ children }: { children: React.ReactNode }): React.ReactNode {
  const queryClient = getQueryClient()

  return (
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </NuqsAdapter>
  )
}
