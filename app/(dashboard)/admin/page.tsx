import { prisma } from '@/utils/db'

const AdminPage = async () => {
  // get count of pdp & associes & approbateurs
  const pdpCount = await prisma.pdp.count()
  const associesCount = await prisma.associe.count()
  const approbateursCount = await prisma.approbateur.count()

  return (
    <div className="mt-10">
      <h1 className="text-3xl">Admin Page</h1>

      <div className="mt-10 grid grid-cols-3 gap-10">
        <div className="rounded-lg bg-gray-100 p-10">
          <h2 className="text-2xl">Porteurs de projet</h2>
          <p className="text-4xl">{pdpCount}</p>
        </div>
        <div className="rounded-lg bg-gray-100 p-10">
          <h2 className="text-2xl">Associes</h2>
          <p className="text-4xl">{associesCount}</p>
        </div>
        <div className="rounded-lg bg-gray-100 p-10">
          <h2 className="text-2xl">Approbateurs</h2>
          <p className="text-4xl">{approbateursCount}</p>
        </div>
      </div>
    </div>
  )
}

export default AdminPage
