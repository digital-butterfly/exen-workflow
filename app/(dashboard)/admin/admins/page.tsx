import NewAdminForm from '@/components/admin/NewAdminForm'
import { getAdmins } from '@/utils/admin'
import Link from 'next/link'

const AdminsPage = async () => {
  const admins = await getAdmins()
  console.log(admins)
  return (
    <div className="m-10">
      <h1 className="text-3xl">Admins page</h1>

      <NewAdminForm />

      <h1 className="mt-10 text-3xl">List des admins</h1>

      <div className="mt-10">
        <table className="w-full text-left text-sm text-gray-500 ">
          <thead className="text-xs uppercase text-gray-700">
            <tr className="text-base">
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
                Tel
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin: any) => (
              <tr key={admin.id} className="border-b bg-white">
                <td className="px-4 py-2">{admin.nom}</td>
                <td className="px-4 py-2">{admin.prenom}</td>
                <td className="px-4 py-2">{admin.cin}</td>
                <td className="px-4 py-2">{admin.tel}</td>
                <td className="px-4 py-2">{admin.email}</td>
                <td>
                  <Link
                    href={`/admin/admins/${admin.id}`}
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

export default AdminsPage
