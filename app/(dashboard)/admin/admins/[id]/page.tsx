import UpdateAdminForm from '@/components/admin/UpdateAdminForm'
import { getAdminById } from '@/utils/admin'

const UpdateAdminPage = async ({ params }: any) => {
  const { id } = params
  const admin = await getAdminById(parseInt(id))
  return (
    <div className="pt-10">
      <h1 className="text-3xl">Update admin page</h1>

      <div className="mt-10">
        <UpdateAdminForm admin={admin} />
      </div>
    </div>
  )
}

export default UpdateAdminPage
