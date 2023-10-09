import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import UpdateApprobateurForm from '@/components/approbateur/UpdateApprobateurForm'
import { getApprobateurByEmail } from '@/utils/approbateur'
import { getServerSession } from 'next-auth'

const SettingsPage = async () => {
  const session = await getServerSession(authOptions)
  const { approbateur } = await getApprobateurByEmail(session?.user?.email)

  return (
    <div className="mt-10">
      <h1 className="text-3xl">Paramètre</h1>

      <div className="mt-6">
        <UpdateApprobateurForm approbateur={approbateur} />
      </div>
    </div>
  )
}

export default SettingsPage
