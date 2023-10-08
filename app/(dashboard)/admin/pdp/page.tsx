import AddButton from '@/components/AddButton'
import { getPdp } from '@/utils/pdp'
import Link from 'next/link'

const PdpPage = async () => {
  const { pdp } = await getPdp()

  return (
    <div>
      <div className="mt-10 flex items-center justify-between">
        <h1 className="text-3xl">List des porteurs de projets</h1>

        <AddButton path={'pdp/create'} />
      </div>

      <div className="relative mt-10 overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 ">
          <thead className="text-xs uppercase text-gray-700">
            <tr className="text-base">
              <th scope="col" className="px-6 py-3">
                Odr
              </th>
              <th scope="col" className="px-6 py-3">
                Référence Irchad
              </th>
              <th scope="col" className="px-6 py-3">
                Nom
              </th>
              <th scope="col" className="px-6 py-3">
                Prénom
              </th>
              <th scope="col" className="px-6 py-3">
                CIN
              </th>
              <th scope="col" className="px-6 py-3">
                Telephone
              </th>
              <th scope="col" className="px-6 py-3">
                Projet
              </th>
            </tr>
          </thead>
          <tbody>
            {pdp?.map(e => (
              <tr key={e.id} className="border-b bg-white">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                >
                  {e.id}
                </th>
                <td className="px-6 py-4">{e.irchad_id}</td>
                <td className="px-6 py-4">{e.nom}</td>
                <td className="px-6 py-4">{e.prenom}</td>
                <td className="px-6 py-4">{e.num_cin}</td>
                <td className="px-6 py-4">{e.tel}</td>
                <td className="px-6 py-4">{e.nom_projet}</td>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/pdp/update/${e.id}`}
                    className="rounded-lg bg-sky-200 p-2"
                  >
                    Voir Info
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PdpPage
