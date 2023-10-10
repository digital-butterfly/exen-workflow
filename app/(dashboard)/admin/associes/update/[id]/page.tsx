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

      <h1 className="mt-10 text-2xl">List des pdp</h1>
      {pdps?.PDP.length > 0 ? (
        pdps.PDP.map((e: any) => (
          <Link href={`/admin/pdp/update/${e.id}`} key={e.id}>
            <h1 className="p-2 pb-0 hover:underline">
              {e.nom} {e.prenom}
            </h1>
          </Link>
        ))
      ) : (
        <h1 className="mt-2">pas de pdp</h1>
      )}
    </div>
  )
}

export default UpdateAssociePage
