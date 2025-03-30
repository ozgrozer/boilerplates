import { z } from 'zod'
import { type Todo as PrismaTodo } from '@prisma/client'

export const todoFormSchema = z.object({
  title: z.string().min(1, {
    message: 'Todo title cannot be empty.'
  })
})

export const todoSchema = z.object({
  id: z.string(),
  title: z.string(),
  completed: z.boolean()
})

export type TodoFormValues = z.infer<typeof todoFormSchema>

export type Todo = PrismaTodo
