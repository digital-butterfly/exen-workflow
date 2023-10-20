'use client'

import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import SignOutButton from './SignOutButton'
import { useState } from 'react'

const UserButton = ({ token, appellation = null }: any) => {
  const { name, role } = token
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isUserSignedIn, setIsUserSignedIn] = useState(!!token)
  const path = `/${role}`
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <div className="flex items-center md:order-2">
      {isUserSignedIn ? (
        <button
          className=" flex items-center justify-center gap-2 rounded-lg p-4 hover:bg-sky-50"
          onClick={toggleDropdown}
        >
          <div className="flex h-7 w-7 items-center justify-center rounded bg-sky-500">
            <FontAwesomeIcon
              className="font-bold text-white"
              icon={faUser}
              style={{ width: '1rem' }}
            />
          </div>
          <span>Bonjour: {appellation ? appellation : name}</span>
        </button>
      ) : (
        <Link href="/auth/signin" className="rounded p-2 hover:bg-sky-200">
          Se connecter
        </Link>
      )}

      {isDropdownOpen && (
        <div className="absolute right-8 top-16 flex w-64 flex-col rounded-2xl  border border-gray-200 bg-white">
          <ul className="flex flex-col gap-1">
            <Link href={`${path}/settings`}>
              <li className="rounded-t-2xl p-4 hover:bg-slate-100">
                Paramètre
              </li>
            </Link>
            <li className="rounded-b-2xl p-4 hover:bg-slate-100">
              <SignOutButton />
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default UserButton
