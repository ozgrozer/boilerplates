'use client'

import { TodoList } from '@/components/TodoList'

export default function Home () {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto py-10'>
        <TodoList />
      </div>
    </div>
  )
}
