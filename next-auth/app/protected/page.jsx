import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import SignOutButton from './SignOutButton'

export default async function Protected () {
  const session = await getServerSession()

  if (!session) {
    redirect('/signin')
  }

  return (
    <div>
      <h1>Protected Page</h1>
      <p>Hello, {session.user.name || session.user.email}!</p>
      <p>You can see this page because you are signed in.</p>
      <SignOutButton />
    </div>
  )
}
