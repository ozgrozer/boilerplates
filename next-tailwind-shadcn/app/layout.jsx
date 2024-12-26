import { Toaster } from '@/components/ui/sonner'

import './globals.css'

export const metadata = {
  title: 'next-tailwind-shadcn'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <body>
        {children}
        <Toaster
          theme='dark'
          toastOptions={{}}
          position='bottom-center'
        />
      </body>
    </html>
  )
}
