import Provider from './provider'

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
