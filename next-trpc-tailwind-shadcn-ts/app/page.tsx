import TodoApp from '@/components/Todo'

export default function HomePage () {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4'>
      <h1 className='text-3xl font-bold mb-8'>Todo App with tRPC + Next.js</h1>
      <TodoApp />
    </div>
  )
}
