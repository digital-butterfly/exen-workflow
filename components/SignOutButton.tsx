'use client'

import { signOut } from 'next-auth/react'

const SignOutButton = () => {
  return (
    <button
      onClick={() => {
        signOut()
      }}
    >
      Déconnexion
    </button>
  )
}

export default SignOutButton
