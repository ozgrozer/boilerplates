import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
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
        className='flex gap-2 w-full max-w-md'
      >
        <FormField
          name='title'
          control={form.control}
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormControl>
                <Input placeholder='Add a new todo...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Add</Button>
      </form>
    </Form>
  )
}
