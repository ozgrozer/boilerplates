'use client'

import { useState } from 'react'

import { trpc } from '@/utils/trpc'

export default function TodoApp () {
  const [newTodo, setNewTodo] = useState('')

  // Query to get all todos
  const { data: todos, isLoading, refetch } = trpc.todo.getAll.useQuery()

  // Mutations for CRUD operations
  const addMutation = trpc.todo.add.useMutation({
    onSuccess: () => refetch()
  })

  const toggleMutation = trpc.todo.toggle.useMutation({
    onSuccess: () => refetch()
  })

  const deleteMutation = trpc.todo.delete.useMutation({
    onSuccess: () => refetch()
  })

  // Handler to add a new todo
  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim()) {
      addMutation.mutate({ text: newTodo })
      setNewTodo('')
    }
  }

  if (isLoading) {
    return (
      <div className='max-w-md mx-auto p-4 bg-white rounded-lg shadow-md'>
        <h1 className='text-2xl font-bold mb-4 text-center'>Todo App</h1>
        <p className='text-center text-gray-500'>Loading todos...</p>
      </div>
    )
  }

  return (
    <div className='max-w-md mx-auto p-4 bg-white rounded-lg shadow-md'>
      <h1 className='text-2xl font-bold mb-4 text-center'>Todo App</h1>

      {/* Form to add new todos */}
      <form onSubmit={handleAddTodo} className='mb-4 flex'>
        <input
          type='text'
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder='Add a new todo'
          className='flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          disabled={addMutation.isPending}
        />
        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300'
          disabled={addMutation.isPending}
        >
          {addMutation.isPending ? 'Adding...' : 'Add'}
        </button>
      </form>

      {/* Todo list */}
      <ul className='space-y-2'>
        {todos?.map(todo => (
          <li
            key={todo.id}
            className='flex items-center justify-between p-3 border rounded-lg'
          >
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                checked={todo.completed}
                onChange={() => toggleMutation.mutate({ id: todo.id })}
                className='h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500'
                disabled={toggleMutation.isPending}
              />
              <span
                className={`${
                  todo.completed ? 'line-through text-gray-400' : ''
                }`}
              >
                {todo.text}
              </span>
            </div>
            <button
              onClick={() => deleteMutation.mutate({ id: todo.id })}
              className='text-red-500 hover:text-red-700 focus:outline-none disabled:text-red-300'
              disabled={deleteMutation.isPending}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Empty state */}
      {todos?.length === 0 && (
        <p className='text-center text-gray-500 mt-4'>
          No todos yet. Add one above!
        </p>
      )}
    </div>
  )
}
