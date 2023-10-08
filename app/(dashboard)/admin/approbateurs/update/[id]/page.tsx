import UpdateApprobateurForm from '@/components/admin/UpdateApprobateurForm'
import {
  getApprobateurById,
  getApprobateurByIdWithPdp,
} from '@/utils/approbateur'

const UpdateApprobateurPage = async ({ params }: any) => {
  const { approbateur } = await getApprobateurById(params.id)
  const approbateurWithPdp = await getApprobateurByIdWithPdp(params.id)

  console.log(approbateurWithPdp)
  return (
    <div>
      <h1 className="mt-10 text-3xl">update Approbateur {params.id} </h1>

      <div className="mt-10">
        <UpdateApprobateurForm approbateur={approbateur} />
      </div>
    </div>
  )
}

export default UpdateApprobateurPage
