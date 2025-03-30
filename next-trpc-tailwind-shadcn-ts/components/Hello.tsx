'use client'

import { trpc } from '@/utils/trpc'

export default function Hello () {
  const { data, isLoading } = trpc.hello.getMessage.useQuery({
    name: 'Next.js'
  })

  if (isLoading) return <p>Loading...</p>
  return <p>{data?.message}</p>
}
