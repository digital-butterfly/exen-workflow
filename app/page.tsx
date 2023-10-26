import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import NavBar from '@/components/home/NavBar'

import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
  const session: any = await getServerSession(authOptions)
  return (
    <main className="w-full">
      <NavBar token={session} />

      <div className="container mx-auto mt-20 flex flex-wrap p-8">
        <div className="flex w-full items-center lg:w-1/2">
          <div className="mb-8 max-w-2xl">
            <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight">
              Accompagnement des porteurs de projets
            </h1>
            <p className="py-5 text-xl leading-normal text-gray-500 dark:text-gray-300 lg:text-xl xl:text-2xl">
              Gérer facilement les porteurs de projets et les accompagner dans
              leur parcours.
            </p>

            <div className="flex flex-col items-start space-y-3 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
              {session ? (
                <Link
                  href={`/${session?.user?.role}`}
                  className="rounded-md bg-sky-400 px-8 py-4 text-center text-lg font-medium text-white transition-all hover:bg-sky-500 "
                >
                  Commencer
                </Link>
              ) : (
                <Link
                  href="/auth/signin"
                  className="rounded-md bg-sky-400 px-8 py-4 text-center text-lg font-medium text-white transition-all hover:bg-sky-500 "
                >
                  Se connecter
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-center lg:w-1/2">
          <div className="">
            <Image
              src="/imgs/hero.png"
              width={1080}
              height={1080}
              className={'object-cover'}
              alt="Hero Illustration"
              priority={false}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
