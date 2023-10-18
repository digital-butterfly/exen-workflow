import AddButton from '@/components/AddButton'
import { getAssocies } from '@/utils/associe'
import Link from 'next/link'

const AssociesPage = async () => {
  const { associes } = await getAssocies()
  return (
    <div>
      <div className="mt-10 flex justify-between">
        <h1 className="text-3xl">Liste des projets</h1>

        <AddButton path={'associes/create'} />
      </div>

      <div className="relative mt-10 overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="text-xs uppercase text-gray-700">
            <tr className="text-base">
              <th scope="col" className="px-6 py-3">
                ID
              </th>

              <th scope="col" className="px-6 py-3">
                Nom
              </th>

              <th scope="col" className="px-6 py-3">
                Prenom
              </th>

              <th scope="col" className="px-6 py-3">
                CIN
              </th>

              <th scope="col" className="px-6 py-3">
                Telephone
              </th>

              <th scope="col" className="px-6 py-3">
                E-mail
              </th>
            </tr>
          </thead>
          <tbody>
            {associes?.map(e => (
              <tr key={e.id} className="border-b bg-white">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                >
                  {e.id}
                </th>

                <td className="px-6 py-4">{e.nom}</td>

                <td className="px-6 py-4">{e.prenom}</td>

                <td className="px-6 py-4">{e.cin}</td>

                <td className="px-6 py-4">{e.tel}</td>

                <td className="px-6 py-4">{e.email}</td>

                <td className="px-6 py-4">
                  <Link
                    href={`/admin/associes/update/${e.id}`}
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

export default AssociesPage
