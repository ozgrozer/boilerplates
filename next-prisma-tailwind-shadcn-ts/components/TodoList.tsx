import { useEffect, useState } from 'react'

import { TodoForm } from '@/components/TodoForm'
import { TodoItem } from '@/components/TodoItem'

type Todo = {
  id: string
  title: string
  completed: boolean
  createdAt: string
}

export function TodoList () {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch todos
  const fetchTodos = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/todos')
      if (!response.ok) {
        throw new Error('Failed to fetch todos')
      }
      const data = await response.json()
      setTodos(data)
    } catch (error) {
      setError('Error loading todos. Please try again.')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  // Add todo
  const addTodo = async (values: { title: string }) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })

      if (!response.ok) {
        throw new Error('Failed to create todo')
      }

      const newTodo = await response.json()
      setTodos([newTodo, ...todos])
    } catch (error) {
      setError('Error adding todo. Please try again.')
      console.error(error)
    }
  }

  // Toggle todo completed status
  const toggleTodo = async (id: string, completed: boolean) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed })
      })

      if (!response.ok) {
        throw new Error('Failed to update todo')
      }

      setTodos(
        todos.map(todo => (todo.id === id ? { ...todo, completed } : todo))
      )
    } catch (error) {
      setError('Error updating todo. Please try again.')
      console.error(error)
    }
  }

  // Delete todo
  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete todo')
      }

      setTodos(todos.filter(todo => todo.id !== id))
    } catch (error) {
      setError('Error deleting todo. Please try again.')
      console.error(error)
    }
  }

  return (
    <div className='w-full max-w-[500px] mx-auto p-4 space-y-6 bg-white/50 backdrop-blur-sm rounded-lg shadow-sm border'>
      <h1 className='text-2xl font-bold text-center'>Todo App</h1>

      <TodoForm onSubmit={addTodo} />

      {error && (
        <div className='bg-red-50 text-red-700 p-3 rounded-md text-sm text-center'>
          {error}
        </div>
      )}

      {isLoading ? (
        <div className='flex justify-center py-4'>
          <div className='animate-spin h-6 w-6 border-3 border-blue-500 rounded-full border-t-transparent'></div>
        </div>
      ) : (
        <div className='space-y-3'>
          {todos.length === 0 ? (
            <p className='text-center text-gray-500 py-4 text-sm'>
              No todos yet. Add one above!
            </p>
          ) : (
            todos.map(todo => (
              <TodoItem
                todo={todo}
                key={todo.id}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}
