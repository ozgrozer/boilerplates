'use client'

import { useState } from 'react'
import { httpBatchLink } from '@trpc/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { trpc } from '@/utils/trpc'

export default function Providers ({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: '/api/trpc'
        })
      ]
    })
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
