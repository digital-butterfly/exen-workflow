import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import NewPdpForm from '@/components/admin/NewPdpForm'
import { getAdminByEmail } from '@/utils/admin'
import { getServerSession } from 'next-auth'

const CreatePdpPage = async () => {
  const session = await getServerSession(authOptions)
  const admin = await getAdminByEmail(session?.user?.email)

  return (
    <div>
      <h1 className="text-3xl">Créer un porteur de projet</h1>
      <NewPdpForm id={admin?.id} />
    </div>
  )
}

export default CreatePdpPage
