import { z } from 'zod'

import { publicProcedure, router } from '../trpc'

let todos: { id: string; text: string; completed: boolean }[] = []

export const todoRouter = router({
  getAll: publicProcedure.query(() => {
    return todos
  }),

  add: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(({ input }) => {
      const newTodo = {
        id: Date.now().toString(),
        text: input.text,
        completed: false
      }
      todos.push(newTodo)
      return newTodo
    }),

  toggle: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      const todo = todos.find(t => t.id === input.id)
      if (todo) {
        todo.completed = !todo.completed
        return todo
      }
      throw new Error('Todo not found')
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      const initialLength = todos.length
      todos = todos.filter(t => t.id !== input.id)
      if (todos.length === initialLength) {
        throw new Error('Todo not found')
      }
      return { success: true }
    })
})
