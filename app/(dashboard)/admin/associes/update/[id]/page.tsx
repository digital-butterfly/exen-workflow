import PdpTable from '@/components/PdpTable'
import DeleteAssocieButton from '@/components/admin/DeleteAssocieButton'
import UpdateAssocieForm from '@/components/admin/UpdateAssociForm'
import { getAssocieById, getAssociePdps } from '@/utils/associe'
import Link from 'next/link'

const UpdateAssociePage = async ({ params }: any) => {
  const { associe } = await getAssocieById(params.id)
  const { pdps } = await getAssociePdps(params.id)

  return (
    <div>
      <div className="mt-10 flex items-center justify-between ">
        <h1 className="text-3xl">
          Modifier associe ({associe.nom} {associe.prenom})
        </h1>

        <DeleteAssocieButton id={associe.id} />
      </div>

      <div className="mt-10">
        <UpdateAssocieForm associe={associe} />
      </div>

      <h1 className="mb-6 mt-10 text-2xl">List des pdp</h1>
      <PdpTable pdp={pdps.PDP} path="admin/pdp/update" />
    </div>
  )
}

export default UpdateAssociePage
