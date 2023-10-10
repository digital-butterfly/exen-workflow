import PdpTable from '@/components/PdpTable'
import { getValidPdp } from '@/utils/pdp'
import Link from 'next/link'

const ApprobateurPage = async () => {
  const { pdp } = await getValidPdp()

  return (
    <div>
      <h1 className="text-3xl">List des porteurs de projet à vérifier</h1>

      <div className="mt-10">
        {pdp && pdp.length > 0 ? (
          <PdpTable pdp={pdp} path="approbateur/pdp" />
        ) : (
          <p>Pas de pdp</p>
        )}
      </div>
    </div>
  )
}

export default ApprobateurPage
