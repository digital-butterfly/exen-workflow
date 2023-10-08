import DeleteApprobateurButton from '@/components/admin/DeleteApprobateurButton'
import UpdateApprobateurForm from '@/components/admin/UpdateApprobateurForm'
import { getApprobateurById, getApprobateurPdps } from '@/utils/approbateur'

const UpdateApprobateurPage = async ({ params }: any) => {
  const { approbateur } = await getApprobateurById(params.id)
  const { pdps } = await getApprobateurPdps(params.id)

  return (
    <div>
      <div className="mt-10 flex items-center justify-between ">
        <h1 className="text-3xl">
          Modifier aprobateur ({approbateur.nom} {approbateur.prenom})
        </h1>

        <DeleteApprobateurButton id={approbateur.id} />
      </div>

      <div className="mt-10">
        <UpdateApprobateurForm approbateur={approbateur} />
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

export default UpdateApprobateurPage
