import TodoApp from '@/components/Todo'

export default function HomePage () {
  return (
    <div className='flex flex-col items-center min-h-screen py-20'>
      <h1 className='text-3xl font-bold mb-8'>Todo App with tRPC</h1>
      <TodoApp />
    </div>
  )
}
