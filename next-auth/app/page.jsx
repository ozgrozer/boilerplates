'use client'

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Page () {
  const { data: session } = useSession()

  return (
    <div>
      <h1>Home Page</h1>
      {session ? (
        <>
          <p>Welcome, {session.user.email}!</p>
          <button onClick={() => signOut()}>Sign out</button>
          <br /><br />
          <Link href='/protected'>Go to Protected Page</Link>
        </>
      ) : (
        <>
          <p>You are not signed in.</p>
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
    </div>
  )
}
