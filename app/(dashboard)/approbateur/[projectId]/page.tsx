import PdpTable from '@/components/PdpTable'
import { getAssocieValidPdps } from '@/utils/associe'

const PdpPage = async ({ params }: any) => {
  const { projectId } = params
  const {
    pdps: { PDP },
  }: any = await getAssocieValidPdps(projectId)

  return (
    <div>
      <h1 className="text-3xl">Liste des porteurs de projet à vérifier</h1>

      <div className="mt-10">
        {PDP.length > 0 ? (
          <PdpTable pdp={PDP} path="approbateur/pdp" />
        ) : (
          <p className="bg-gray-50 p-4 text-center">Pas de pdp</p>
        )}
      </div>
    </div>
  )
}

export default PdpPage
