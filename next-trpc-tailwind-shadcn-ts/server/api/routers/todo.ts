import { z } from 'zod'
import { publicProcedure, router } from '../trpc'

// In-memory storage for todos in this example
let todos: { id: string; text: string; completed: boolean }[] = []

export const todoRouter = router({
  // Get all todos
  getAll: publicProcedure.query(() => {
    return todos
  }),

  // Add a new todo
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

  // Toggle todo completion
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

  // Delete a todo
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
