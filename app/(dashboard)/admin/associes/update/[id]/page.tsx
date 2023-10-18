import PdpTable from '@/components/PdpTable'
import DeleteAssocieButton from '@/components/admin/DeleteAssocieButton'
import UpdateAssocieForm from '@/components/admin/UpdateAssociForm'
import FormJuridique from '@/components/admin/charts/FormJuridique'
import SecteurProjet from '@/components/admin/charts/SecteurProjet'
import Sexe from '@/components/admin/charts/Sexe'
import State from '@/components/admin/charts/State'
import { getAssocieById, getAssociePdps } from '@/utils/associe'

const UpdateAssociePage = async ({ params }: any) => {
  const { associe } = await getAssocieById(params.id)
  const { pdps } = await getAssociePdps(params.id)

  return (
    <div>
      <div className="mt-10 flex items-center justify-between ">
        <h1 className="text-3xl">
          Modifier Projet ({associe.nom} {associe.prenom})
        </h1>

        <DeleteAssocieButton id={associe.id} />
      </div>

      <div className="mt-10">
        <UpdateAssocieForm associe={associe} />
      </div>

      <h1 className="mb-6 mt-10 text-2xl">List des pdp</h1>
      {pdps.PDP.length > 0 ? (
        <PdpTable pdp={pdps.PDP} path="admin/pdp/update" />
      ) : (
        <p className="text-center">Aucun pdp</p>
      )}

      {/* show stats */}
      {pdps.PDP.length > 0 && (
        <>
          <h1 className="my-10 mt-24 text-2xl">Statistiques</h1>
          <div className="mt-10 grid grid-cols-3 gap-10">
            <State data={pdps.PDP} />
            <Sexe pdp={pdps.PDP} />
            <FormJuridique data={pdps.PDP} />
          </div>
          <div className="mt-10">
            <SecteurProjet data={pdps.PDP} />
          </div>
        </>
      )}
    </div>
  )
}

export default UpdateAssociePage
