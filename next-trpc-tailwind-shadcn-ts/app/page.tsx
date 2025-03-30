import Hello from '@/components/Hello'

export default function HomePage () {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1>Welcome to tRPC + App Router</h1>
      <Hello />
    </div>
  )
}
