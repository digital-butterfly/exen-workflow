import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/public/imgs/transparent-logo.png'
import UserButton from '@/components/UserButton'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import {
  faUser,
  faUserNurse,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { redirect } from 'next/navigation'

const links = [
  { name: 'PDP', href: '/admin/pdp', icon: faUser },
  { name: 'Associes', href: '/admin/associes', icon: faUserTie },
  { name: 'Approbateurs', href: '/admin/approbateurs', icon: faUserNurse },
]

type Session = {
  user: {
    name: string
    role: string
  } | null
}

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session: Session = (await getServerSession(authOptions)) || {
    user: null,
  }

  if (!session.user) {
    redirect('/auth/signin')
  } else if (session.user.role !== 'admin') {
    redirect('/')
  }

  return (
    <div className="relative h-screen w-screen">
      <aside className="absolute left-0 top-0 h-full w-[300px] border-r border-black/10">
        <div className="my-4 px-4">
          <Link href="/admin">
            <Image
              className="mx-auto pt-2"
              src={Logo}
              width={100}
              height={100}
              alt="Logo image"
            />
          </Link>
        </div>
        <div className="pt-10">
          <ul className="px-4">
            {links.map(link => (
              <Link key={link.name} href={link.href}>
                <li className="my-4 p-2 text-xl transition-all hover:bg-gray-50">
                  <FontAwesomeIcon
                    icon={link.icon}
                    className="mr-5"
                    style={{ width: '1rem', display: 'inline' }}
                  />
                  {link.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </aside>
      <div className="ml-[300px] h-full w-[calc(100vw-300px)]">
        <header className="h-[60px] border-b border-black/10">
          <nav className="h-full px-4">
            <div className="flex h-full items-center justify-end">
              <UserButton token={session.user} />
            </div>
          </nav>
        </header>
        <div className="h-[calc(100vh-60px)] overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
