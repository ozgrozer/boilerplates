'use client'

import { useState, useEffect } from 'react'

import { trpc } from '@/utils/trpc'

export default function TodoApp () {
  const [newTodo, setNewTodo] = useState('')
  const [localTodos, setLocalTodos] = useState<
    { id: string; text: string; completed: boolean }[]
  >([])

  const { data: serverTodos, isLoading } = trpc.todo.getAll.useQuery()

  useEffect(() => {
    if (serverTodos) {
      setLocalTodos(serverTodos)
    }
  }, [serverTodos])

  const addTodo = trpc.todo.add.useMutation({
    onSuccess: newTodo => {
      setLocalTodos(prev => [...prev, newTodo])
    }
  })

  const toggleTodo = trpc.todo.toggle.useMutation({
    onSuccess: updatedTodo => {
      setLocalTodos(prev =>
        prev.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo))
      )
    }
  })

  const deleteTodo = trpc.todo.delete.useMutation({
    onSuccess: (_, variables) => {
      setLocalTodos(prev => prev.filter(todo => todo.id !== variables.id))
    }
  })

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim()) {
      addTodo.mutate({ text: newTodo })
      setNewTodo('')
    }
  }

  return (
    <div className='max-w-md mx-auto p-4 bg-white rounded-lg shadow-md'>
      <h1 className='text-2xl font-bold mb-4 text-center'>Todo App</h1>

      {/* Form to add new todos */}
      <form onSubmit={handleAddTodo} className='mb-4 flex'>
        <input
          type='text'
          value={newTodo}
          disabled={addTodo.isPending}
          placeholder='Add a new todo'
          onChange={e => setNewTodo(e.target.value)}
          className='flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <button
          type='submit'
          disabled={addTodo.isPending}
          className='bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300'
        >
          {addTodo.isPending ? 'Adding...' : 'Add'}
        </button>
      </form>

      {/* Todo list */}
      <ul className='space-y-2'>
        {localTodos.map(todo => (
          <li
            key={todo.id}
            className='flex items-center justify-between p-3 border rounded-lg'
          >
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                checked={todo.completed}
                disabled={toggleTodo.isPending}
                onChange={() => toggleTodo.mutate({ id: todo.id })}
                className='h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500'
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
              disabled={deleteTodo.isPending}
              onClick={() => deleteTodo.mutate({ id: todo.id })}
              className='text-red-500 hover:text-red-700 focus:outline-none disabled:text-red-300'
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Empty state */}
      {localTodos.length === 0 && (
        <p className='text-center text-gray-500 mt-4'>
          No todos yet. Add one above!
        </p>
      )}
    </div>
  )
}
