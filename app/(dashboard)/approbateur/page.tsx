import ShowAssocies from '@/components/associes/ShowAssocies'
import { getAssocies, getAssociesWithValidPdps } from '@/utils/associe'
import { faProjectDiagram } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

const ApprobateurPage = async () => {
  const { associes }: any = await getAssociesWithValidPdps()

  return (
    <div>
      <h1 className="mt-10 text-3xl">Liste des projets </h1>
      <div className="mt-10">
        {/* <ShowAssocies associes={associes} path="/approbateur" readonly={true} /> */}
        <div className="grid grid-cols-6">
          {associes.map((associe: any) => (
            <div
              className="m-2 flex flex-col items-center justify-around gap-2 rounded-2xl border p-4 text-center"
              key={associe.id}
            >
              <FontAwesomeIcon
                icon={faProjectDiagram}
                className="text-4xl"
                style={{ width: '2.5rem' }}
              />
              <h1 className="text-xl">
                {associe.appellation} {`(${associe.PDP.length})`}
              </h1>
              <Link
                href={`/approbateur/${associe.id}`}
                className="rounded-lg bg-sky-100 px-4 py-2"
              >
                Voir Pdps
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ApprobateurPage
