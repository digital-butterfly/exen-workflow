import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import AddButton from '@/components/AddButton'
import PdpTable from '@/components/PdpTable'
import { getAssociePdpsByEmail } from '@/utils/associe'
import { getServerSession } from 'next-auth'

const AssociePage = async () => {
  const session: any = await getServerSession(authOptions)
  const { PDP }: any = await getAssociePdpsByEmail(session?.user?.email)
  return (
    <div>
      <div className="mt-10 flex items-center justify-between">
        <h1 className="text-3xl">Liste des pdp</h1>

        <AddButton path={'associe/pdp/create'} />
      </div>

      <div className="mt-10">
        {PDP && PDP.length > 0 ? (
          <PdpTable pdp={PDP} path="associe/pdp/update" />
        ) : (
          <p className="bg-gray-50 p-4 text-center">Pas de pdp</p>
        )}
      </div>
    </div>
  )
}

export default AssociePage
