import * as z from 'zod'
import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormItem,
  FormField,
  FormMessage,
  FormControl
} from '@/components/ui/form'

const formSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: 'Todo title is required.'
    })
    .max(50, {
      message: 'Todo title must be less than 50 characters.'
    })
})

type TodoFormProps = {
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>
}

export function TodoForm ({ onSubmit }: TodoFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: ''
    }
  })

  async function handleSubmit (values: z.infer<typeof formSchema>) {
    await onSubmit(values)
    form.reset()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='flex gap-2 w-full'
      >
        <FormField
          name='title'
          control={form.control}
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormControl>
                <Input
                  placeholder='Add a new todo...'
                  className='h-9 text-sm focus-visible:ring-blue-500'
                  {...field}
                />
              </FormControl>
              <FormMessage className='text-xs' />
            </FormItem>
          )}
        />
        <Button type='submit' size='sm' className='h-9 px-3'>
          <Plus className='h-4 w-4 mr-1' />
          Add
        </Button>
      </form>
    </Form>
  )
}
