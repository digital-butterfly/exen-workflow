import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import NewPdpForm from '@/components/admin/NewPdpForm'
import { getAssocieByEmail } from '@/utils/associe'
import { getServerSession } from 'next-auth'

const CreatePdpPage = async () => {
  const session: any = await getServerSession(authOptions)
  const associe = await getAssocieByEmail(session?.user?.email)

  return (
    <div className="mt-10">
      <h1 className="text-3xl">Créer un porteur de projet</h1>
      <NewPdpForm id={associe?.id} role={session.user.role} />
    </div>
  )
}

export default CreatePdpPage
