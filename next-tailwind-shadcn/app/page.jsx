'use client'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

export default () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <Button
        variant='outline'
        onClick={() => {
          toast('This is a toast message')
        }}
      >
        Show Toast
      </Button>
    </div>
  )
}
