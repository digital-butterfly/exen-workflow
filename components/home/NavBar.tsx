'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import SignOutButton from '../SignOutButton'
import Image from 'next/image'

import Logo from '/public/imgs/transparent-logo.png'

const NavBar = ({ token }: any) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isUserSignedIn, setIsUserSignedIn] = useState(!!token)
  const path = `/${token?.user.role}`

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <nav className="border-gray-20 bg-sky-100">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <span className="self-center whitespace-nowrap text-2xl font-semibold">
          <Image
            src="/imgs/transparent-logo.png"
            width={297}
            height={148}
            priority={true}
            alt="logo image"
          />
        </span>
        <div className="flex items-center md:order-2">
          {isUserSignedIn ? (
            <button
              className=" flex items-center justify-center gap-2 rounded-lg p-4 hover:bg-sky-200"
              onClick={toggleDropdown}
            >
              <div className="flex h-7 w-7 items-center justify-center rounded bg-sky-500">
                <FontAwesomeIcon
                  className="font-bold text-white"
                  icon={faUser}
                />
              </div>
              <span>Bonjour: {token.user.name}</span>
            </button>
          ) : (
            <Link href="/auth/signin" className="rounded p-2 hover:bg-sky-200">
              Se connecter
            </Link>
          )}

          {isDropdownOpen && (
            <div className="absolute right-[21rem] top-24 flex w-64 flex-col rounded-2xl  border border-gray-200 bg-white">
              <ul className="flex flex-col gap-1">
                <Link href={path}>
                  <li className="rounded-t-2xl p-4 hover:bg-slate-100">
                    Profile
                  </li>
                </Link>
                <li className="rounded-b-2xl p-4 hover:bg-slate-100">
                  <SignOutButton />
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar
