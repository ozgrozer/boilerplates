import { publicProcedure, router } from '../trpc'
import { todoFormSchema, Todo, todoSchema } from '@/types/schemas/todo'

let todos: Todo[] = []

export const todoRouter = router({
  getAll: publicProcedure.query(() => {
    return todos
  }),

  add: publicProcedure.input(todoFormSchema).mutation(({ input }) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: input.text,
      completed: false
    }
    todos.push(newTodo)
    return newTodo
  }),

  toggle: publicProcedure
    .input(todoSchema.pick({ id: true }))
    .mutation(({ input }) => {
      const todo = todos.find(t => t.id === input.id)
      if (todo) {
        todo.completed = !todo.completed
        return todo
      }
      throw new Error('Todo not found')
    }),

  delete: publicProcedure
    .input(todoSchema.pick({ id: true }))
    .mutation(({ input }) => {
      const initialLength = todos.length
      todos = todos.filter(t => t.id !== input.id)
      if (todos.length === initialLength) {
        throw new Error('Todo not found')
      }
      return { success: true }
    })
})
