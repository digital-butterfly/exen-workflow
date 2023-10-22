import AddButton from '@/components/AddButton'
import ShowAssocies from '@/components/associes/ShowAssocies'
import { getAssocies } from '@/utils/associe'
import Link from 'next/link'

const AssociesPage = async () => {
  const { associes }: any = await getAssocies()
  return (
    <div>
      <div className="mt-10 flex justify-between">
        <h1 className="text-3xl">Liste des projets</h1>

        <AddButton path={'associes/create'} />
      </div>

      <div className="relative mt-10 overflow-x-auto">
        <ShowAssocies associes={associes} path="/admin/associes/update" />
      </div>
    </div>
  )
}

export default AssociesPage
