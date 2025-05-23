import prisma from '@/lib/prisma'
import { publicProcedure, router } from '../trpc'
import { todoSchema, todoFormSchema } from '@/types/schemas/todo'

export const todoRouter = router({
  getAll: publicProcedure.query(async () => {
    return prisma.todo.findMany({
      orderBy: { createdAt: 'desc' }
    })
  }),

  add: publicProcedure.input(todoFormSchema).mutation(async ({ input }) => {
    return prisma.todo.create({
      data: {
        completed: false,
        title: input.title
      }
    })
  }),

  toggle: publicProcedure
    .input(todoSchema.pick({ id: true }))
    .mutation(async ({ input }) => {
      const todo = await prisma.todo.findUnique({
        where: { id: input.id }
      })

      if (!todo) {
        throw new Error('Todo not found')
      }

      return prisma.todo.update({
        where: { id: input.id },
        data: { completed: !todo.completed }
      })
    }),

  delete: publicProcedure
    .input(todoSchema.pick({ id: true }))
    .mutation(async ({ input }) => {
      try {
        await prisma.todo.delete({
          where: { id: input.id }
        })
        return { success: true }
      } catch (error) {
        throw new Error('Todo not found')
      }
    })
})
