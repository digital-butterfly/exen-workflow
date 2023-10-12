import FormJuridique from '@/components/admin/charts/FormJuridique'
import PieChart from '@/components/admin/charts/PieChart'
import SecteurProjet from '@/components/admin/charts/SecteurProjet'
import Sexe from '@/components/admin/charts/Sexe'
import State from '@/components/admin/charts/State'
import { prisma } from '@/utils/db'
import { getPdp } from '@/utils/pdp'
import {
  faUser,
  faUserAltSlash,
  faUserGear,
  faUserGraduate,
  faUserNurse,
  faUserShield,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AdminPage = async () => {
  // get count of pdp & associes & approbateurs
  const pdpCount = await prisma.pdp.count()
  const associesCount = await prisma.associe.count()
  const approbateursCount = await prisma.approbateur.count()

  // get all pdp
  const { pdp } = await getPdp()

  return (
    <div className="mt-10">
      <h1 className="text-3xl">Admin Page</h1>

      <div className="mt-10 grid grid-cols-3 gap-10 transition-all">
        <div className="flex items-center gap-4 rounded-lg bg-amber-100 p-10 ">
          <FontAwesomeIcon
            icon={faUser}
            className="rounded-full bg-white p-6 text-2xl"
            style={{ width: '1.5rem', display: 'inline' }}
          />
          <div>
            <h2 className="text-2xl">Porteurs de projet</h2>
            <p className="text-4xl">{pdpCount}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-lg bg-amber-100 p-10">
          <FontAwesomeIcon
            icon={faUserTie}
            className="rounded-full bg-white p-6 text-2xl"
            style={{ width: '1.5rem', display: 'inline' }}
          />
          <div>
            <h2 className="text-2xl">Associes</h2>
            <p className="text-4xl">{associesCount}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-lg bg-amber-100 p-10">
          <FontAwesomeIcon
            icon={faUserShield}
            className="rounded-full bg-white p-6 text-2xl"
            style={{ width: '1.5rem', display: 'inline' }}
          />
          <div>
            <h2 className="text-2xl">Approbateur</h2>
            <p className="text-4xl">{approbateursCount}</p>
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-3 gap-10">
        <State data={pdp} />
        <Sexe pdp={pdp} />
        <SecteurProjet data={pdp} />
      </div>
      <div className="mt-10">
        <FormJuridique data={pdp} />
      </div>
    </div>
  )
}

export default AdminPage
