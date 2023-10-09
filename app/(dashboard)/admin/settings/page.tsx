import UpdateAdminForm from '@/components/admin/UpdateAdminForm'
import { getAdmin } from '@/utils/admin'

const SettingsPage = async () => {
  const admin = await getAdmin()
  return (
    <div className="mt-10">
      <h1 className="text-3xl">Paramètre</h1>

      <div className="mt-6">
        <UpdateAdminForm admin={admin} />
      </div>
    </div>
  )
}

export default SettingsPage
