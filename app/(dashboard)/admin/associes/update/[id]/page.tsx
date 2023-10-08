import DeleteAssocieButton from '@/components/admin/DeleteAssocieButton'
import UpdateAssocieForm from '@/components/admin/UpdateAssociForm'
import { getAssocieById, getAssociePdps } from '@/utils/associe'

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
          <div key={e.id}>
            <h1>{e.id}</h1>
            <h1>{e.date}</h1>
            <h1>{e.status}</h1>
            <h1>{e.commentaire}</h1>
          </div>
        ))
      ) : (
        <h1>pas de pdp</h1>
      )}
    </div>
  )
}

export default UpdateAssociePage
