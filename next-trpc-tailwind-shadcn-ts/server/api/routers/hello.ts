import { z } from 'zod'

import { publicProcedure, router } from '../trpc'

export const helloRouter = router({
  getMessage: publicProcedure
    .input(z.object({ name: z.string().optional() }))
    .query(({ input }) => {
      return { message: `Hello, ${input.name ?? 'world'}!` }
    })
})
