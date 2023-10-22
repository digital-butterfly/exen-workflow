import Link from 'next/link'

const ShowAssocies = ({ associes, path, readonly = false }: any) => {
  return (
    <table className="w-full text-left text-sm text-gray-500">
      <thead className="text-xs uppercase text-gray-700">
        <tr className="text-base">
          <th scope="col" className="px-6 py-3">
            N° Marché
          </th>

          <th scope="col" className="px-6 py-3">
            Maitre d&apos;Ouvrage
          </th>

          <th scope="col" className="px-6 py-3">
            Appellation
          </th>

          <th scope="col" className="px-6 py-3">
            Date de début
          </th>

          <th scope="col" className="px-6 py-3">
            Date de fin
          </th>
        </tr>
      </thead>

      <tbody>
        {associes.map((associe: any) => {
          const dateDebut = new Date(associe.date_debut)
          const delai = associe.delai
          const dateFin = new Date(
            dateDebut.getTime() + delai * 24 * 60 * 60 * 1000,
          )
          return (
            <tr key={associe.id}>
              <td className="border-t px-6 py-4">{associe.num_marche}</td>
              <td className="border-t px-6 py-4">
                {associe.organisme}-{associe.region}
              </td>
              <td className="border-t px-6 py-4">{associe.appellation}</td>
              <td className="border-t px-6 py-4">
                {dateDebut.toLocaleDateString()}
              </td>
              <td className="border-t px-6 py-4">
                {dateFin.toLocaleDateString()}
              </td>
              <td className="border-t px-6 py-4">
                <Link
                  href={`${path}/${associe.id}`}
                  className="rounded-lg bg-sky-200 p-2"
                >
                  {readonly ? 'Voir Pdps' : 'Voir plus'}
                </Link>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default ShowAssocies
