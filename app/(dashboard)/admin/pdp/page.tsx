import AddButton from '@/components/AddButton'
import PdpTable from '@/components/PdpTable'
import { getPdp } from '@/utils/pdp'

const PdpPage = async () => {
  const { pdp } = await getPdp()

  return (
    <div>
      <div className="mt-10 flex items-center justify-between">
        <h1 className="text-3xl">Liste des porteurs de projets</h1>

        {/* Add pdp button hidden */}
        {/* <AddButton path={'pdp/create'} /> */}
      </div>

      <div className="relative mt-10 overflow-x-auto">
        {pdp && pdp.length > 0 ? (
          <PdpTable pdp={pdp} path="admin/pdp/update" />
        ) : (
          <p>Pas de pdp</p>
        )}
      </div>
    </div>
  )
}

export default PdpPage
