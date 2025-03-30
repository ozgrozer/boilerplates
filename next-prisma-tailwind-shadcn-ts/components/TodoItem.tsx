import { useState } from 'react'
import { Check, Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'

type Todo = {
  id: string
  title: string
  completed: boolean
}

type TodoItemProps = {
  todo: Todo
  onToggle: (id: string, completed: boolean) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export function TodoItem ({ todo, onToggle, onDelete }: TodoItemProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleToggle = async () => {
    setIsLoading(true)
    try {
      await onToggle(todo.id, !todo.completed)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      await onDelete(todo.id)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex items-center justify-between p-3 bg-white/80 border rounded-md shadow-sm hover:shadow transition-all'>
      <div className='flex items-center gap-2 flex-1'>
        <Button
          size='icon'
          variant='outline'
          disabled={isLoading}
          onClick={handleToggle}
          className={`h-5 w-5 rounded-full ${
            todo.completed ? 'bg-green-100 border-green-500' : 'bg-transparent'
          }`}
        >
          {todo.completed && <Check className='h-3 w-3 text-green-600' />}
        </Button>
        <span
          className={`text-sm ${
            todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
          }`}
        >
          {todo.title}
        </span>
      </div>
      <Button
        size='icon'
        variant='ghost'
        disabled={isLoading}
        onClick={handleDelete}
        className='h-6 w-6 text-red-500 hover:bg-red-50 hover:text-red-600'
      >
        <Trash className='h-3 w-3' />
      </Button>
    </div>
  )
}
