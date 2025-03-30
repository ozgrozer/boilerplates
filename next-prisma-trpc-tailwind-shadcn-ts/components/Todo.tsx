'use client'

import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { trpc } from '@/utils/trpc'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { todoFormSchema, TodoFormValues, Todo } from '@/types/schemas/todo'
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormMessage
} from '@/components/ui/form'

export default function TodoApp () {
  const [localTodos, setLocalTodos] = useState<Todo[]>([])

  const { data: serverTodos, isLoading } = trpc.todo.getAll.useQuery()

  useEffect(() => {
    if (serverTodos) {
      const todosWithDateObjects = serverTodos.map(todo => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
        updatedAt: new Date(todo.updatedAt)
      }))
      setLocalTodos(todosWithDateObjects)
    }
  }, [serverTodos])

  const addTodo = trpc.todo.add.useMutation({
    onSuccess: newTodo => {
      setLocalTodos(prev => [
        {
          ...newTodo,
          createdAt: new Date(newTodo.createdAt),
          updatedAt: new Date(newTodo.updatedAt)
        },
        ...prev
      ])
    }
  })

  const toggleTodo = trpc.todo.toggle.useMutation({
    onSuccess: updatedTodo => {
      const todoWithDateObjects = {
        ...updatedTodo,
        createdAt: new Date(updatedTodo.createdAt),
        updatedAt: new Date(updatedTodo.updatedAt)
      }
      setLocalTodos(prev =>
        prev.map(todo =>
          todo.id === updatedTodo.id ? todoWithDateObjects : todo
        )
      )
    }
  })

  const deleteTodo = trpc.todo.delete.useMutation({
    onSuccess: (_, variables) => {
      setLocalTodos(prev => prev.filter(todo => todo.id !== variables.id))
    }
  })

  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {
      title: ''
    }
  })

  const onSubmit = (values: TodoFormValues) => {
    addTodo.mutate({ title: values.title })
    form.reset()
  }

  return (
    <div className='w-[450px] mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100'>
      {/* Shadcn Form to add new todos */}
      <Form {...form}>
        <form
          className='mb-6 flex gap-2'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            name='title'
            control={form.control}
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormControl>
                  <Input
                    placeholder='Add a new todo'
                    disabled={addTodo.isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            disabled={addTodo.isPending}
            className='bg-blue-600 hover:bg-blue-700'
          >
            Add
          </Button>
        </form>
      </Form>

      {/* Todo list */}
      <div className='space-y-3'>
        {localTodos.map(todo => (
          <div
            key={todo.id}
            className='flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors'
          >
            <div className='flex items-center gap-3'>
              <input
                type='checkbox'
                checked={todo.completed}
                disabled={toggleTodo.isPending}
                onChange={() => toggleTodo.mutate({ id: todo.id })}
                className='h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-colors'
              />
              <span
                className={`${
                  todo.completed
                    ? 'line-through text-gray-400'
                    : 'text-gray-700'
                } font-medium transition-colors`}
              >
                {todo.title}
              </span>
            </div>
            <button
              aria-label='Delete'
              disabled={deleteTodo.isPending}
              onClick={() => deleteTodo.mutate({ id: todo.id })}
              className='text-gray-400 hover:text-red-500 focus:outline-none disabled:text-gray-300 transition-colors p-1'
            >
              <svg
                className='h-5 w-5'
                viewBox='0 0 20 20'
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className='flex justify-center my-6'>
          <div className='animate-pulse text-gray-400'>Loading todos...</div>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && localTodos.length === 0 && (
        <div className='text-center p-8'>
          <svg
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            xmlns='http://www.w3.org/2000/svg'
            className='h-12 w-12 mx-auto text-gray-300 mb-3'
          >
            <path
              strokeWidth={2}
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
            />
          </svg>
          <p className='text-gray-500'>
            Your todo list is empty. Add a new task above!
          </p>
        </div>
      )}
    </div>
  )
}
