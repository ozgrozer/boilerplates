import { z } from 'zod'
import { type Todo as PrismaTodo } from '@prisma/client'

export const todoFormSchema = z.object({
  text: z.string().min(1, {
    message: 'Todo text cannot be empty.'
  })
})

export const todoSchema = z.object({
  id: z.string(),
  text: z.string(),
  completed: z.boolean()
})

export type TodoFormValues = z.infer<typeof todoFormSchema>

// Use Prisma's generated Todo type
export type Todo = PrismaTodo
