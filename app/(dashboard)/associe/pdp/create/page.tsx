import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import NewPdpForm from '@/components/admin/NewPdpForm'
import { getAssocieByEmail } from '@/utils/associe'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

const CreatePdpPage = async () => {
  const session: any = await getServerSession(authOptions)
  const associe = await getAssocieByEmail(session?.user?.email)

  return (
    <div>
      {/* Go back button */}
      <Link
        className="rounded-lg border p-4 text-gray-400 transition-all hover:bg-gray-100"
        href={'/associe'}
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="mr-2"
          style={{ width: '1em', display: 'inline' }}
        />
        Retour
      </Link>
      <h1 className="mt-10 text-3xl">Créer un porteur de projet</h1>
      <NewPdpForm id={associe?.id} role={session.user.role} />
    </div>
  )
}

export default CreatePdpPage
