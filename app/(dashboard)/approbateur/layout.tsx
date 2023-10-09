import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import UserButton from '@/components/UserButton'
import { getServerSession } from 'next-auth'
import Image from 'next/image'

import Logo from '/public/imgs/transparent-logo.png'
import { redirect } from 'next/navigation'
import Link from 'next/link'

type Session = {
  user: {
    name: string
    role: string
  } | null
}

const ApprobateurLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const session: Session = (await getServerSession(authOptions)) || {
    user: null,
  }

  if (!session.user) {
    redirect('/auth/signin')
  } else if (session.user.role !== 'approbateur') {
    redirect('/')
  }

  return (
    <div className="relative h-screen w-screen">
      <nav className="border-gray-200 bg-white ">
        <div className="flex h-[60px] flex-wrap items-center justify-between border-b-2 px-10">
          <Link href={'/approbateur'}>
            <Image src={Logo} height={100} width={100} alt="logo" />
          </Link>

          <div id="navbar-default">
            <ul className="mt-0 flex flex-row space-x-8 rounded-lg border-0 p-0 font-medium">
              <li>
                <UserButton token={session.user} />
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="p-10">{children}</main>
    </div>
  )
}

export default ApprobateurLayout
