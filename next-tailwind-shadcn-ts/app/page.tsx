'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'

export default function Home () {
  const [count, setCount] = useState(0)

  return (
    <div className='flex items-center justify-center min-h-screen flex-col gap-4'>
      Hello world! {count}
      <div className='flex gap-2'>
        <Button variant='outline' onClick={() => setCount(prev => prev - 1)}>
          Decrease
        </Button>
        <Button variant='outline' onClick={() => setCount(prev => prev + 1)}>
          Increase
        </Button>
      </div>
    </div>
  )
}
