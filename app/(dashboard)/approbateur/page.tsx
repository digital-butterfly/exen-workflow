import PdpTable from '@/components/PdpTable'
import { getValidPdp } from '@/utils/pdp'

const ApprobateurPage = async () => {
  const { pdp } = await getValidPdp()

  return (
    <div>
      <h1 className="text-3xl">Liste des porteurs de projet à vérifier</h1>

      <div className="mt-10">
        {pdp && pdp.length > 0 ? (
          <PdpTable pdp={pdp} path="approbateur/pdp" />
        ) : (
          <p className="bg-gray-50 p-4 text-center">Pas de pdp</p>
        )}
      </div>
    </div>
  )
}

export default ApprobateurPage
