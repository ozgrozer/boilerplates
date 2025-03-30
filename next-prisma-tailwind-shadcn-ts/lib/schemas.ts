import * as z from 'zod'

export const todoSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: 'Todo title is required.'
    })
    .max(50, {
      message: 'Todo title must be less than 50 characters.'
    })
})

export type TodoFormValues = z.infer<typeof todoSchema>
