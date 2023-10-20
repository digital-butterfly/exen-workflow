'use client'

import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const SignInForm = () => {
  const router = useRouter()
  const { status } = useSession()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('admin')

  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    setIsLoading(true)

    try {
      const signInResponse = await signIn('credentials', {
        email,
        password,
        role,
        redirect: false,
        callbackUrl: '/',
      })

      if (signInResponse?.ok) {
        router.refresh()
        setTimeout(() => {
          setMessage('Identifiants invalides')
        }, 2000)
      } else if (signInResponse?.status === 401) {
        setMessage('Identifiants invalides')
      } else {
        setMessage("Quelque chose s'est mal passé")
      }
    } catch (error) {
      setMessage("Quelque chose s'est mal passé")
    }

    setIsLoading(false)
  }

  useEffect(() => {
    if (status === 'authenticated') {
      router.refresh()
      router.push('/')
    }
  }, [status, router])

  return (
    <section className="bg-gray-50">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        {/* form container */}
        <div className=":mt-0 w-full rounded-lg bg-white shadow sm:max-w-md xl:p-0 ">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            {/* form title */}
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Sign in to your account
            </h1>
            {/* Loading message */}
            {isLoading && (
              <div className="w-full rounded-xl bg-blue-200 p-4">
                <h2 className="text-center ">Signing In...</h2>
              </div>
            )}
            {/* Error message */}
            {message != '' && (
              <div className="w-full rounded-xl bg-red-300 p-4">
                <h2 className="text-center text-red-600">{message}</h2>
              </div>
            )}
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {/* form fields */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900 "
                >
                  Your email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 outline-none sm:text-sm"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="password"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 outline-none sm:text-sm"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="role"
                  className="mb-2 block text-sm font-medium text-gray-900 "
                >
                  Role
                </label>
                <select
                  id="role"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 outline-none sm:text-sm"
                  required
                >
                  <option value="admin">Admin</option>
                  <option value="associe">Projet</option>
                  <option value="approbateur">Approbateur</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignInForm
