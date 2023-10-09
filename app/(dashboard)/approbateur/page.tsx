import { getValidPdp } from '@/utils/pdp'
import Link from 'next/link'

const ApprobateurPage = async () => {
  const { pdp } = await getValidPdp()

  return (
    <div>
      <h1 className="text-3xl">List des porteurs de projet à vérifier</h1>

      <div className="mt-10">
        {pdp?.length <= 0 ? (
          <h2 className="bg-gray-50 p-4 text-center text-xl">vide</h2>
        ) : (
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
                      href={`/approbateur/pdp/${e.id}`}
                      className="rounded-lg bg-sky-200 p-2"
                    >
                      Voir Info
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default ApprobateurPage
