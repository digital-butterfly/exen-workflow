import DeleteApprobateurButton from '@/components/admin/DeleteApprobateurButton'
import UpdateApprobateurForm from '@/components/admin/UpdateApprobateurForm'
import { getApprobateurById, getApprobateurPdps } from '@/utils/approbateur'
import Link from 'next/link'

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

export default UpdateApprobateurPage
