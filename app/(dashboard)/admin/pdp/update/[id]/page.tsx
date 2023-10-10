import DeletePdpButton from '@/components/admin/DeletePdpButton'
import ShowFiles from '@/components/admin/ShowFiles'
import UpdatePdpForm from '@/components/admin/UpdatePdpForm'
import { getPdpById } from '@/utils/pdp'
import { faArrowLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

const PdpPageId = async ({ params }: any) => {
  const { pdp } = await getPdpById(params.id)

  return (
    <div>
      {/* Go back button */}
      <Link
        className="rounded-lg border p-4 text-gray-400 transition-all hover:bg-gray-100"
        href={'/admin/pdp'}
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="mr-2"
          style={{ width: '1em', display: 'inline' }}
        />
        Retour
      </Link>

      {/* Pdp info */}
      <main className="mt-10">
        <div className="flex justify-between">
          <h1 className="text-3xl">
            Pdp Info ({pdp?.nom} {pdp?.prenom}){' '}
          </h1>
          <div className="flex gap-4">
            {pdp?.etat == 'sourcing' && (
              <Link
                href={`/admin/pdp/validate/${pdp?.id}`}
                className="rounded-lg bg-green-500 px-4 py-2 text-white transition-all hover:bg-green-400"
              >
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="mr-2"
                  style={{ width: '1em', display: 'inline' }}
                />
                Validé pdp
              </Link>
            )}
            {/* Delete pdp button */}
            {(pdp?.etat == 'valid' || pdp?.etat == 'sourcing') && (
              <DeletePdpButton pdp={pdp} />
            )}
          </div>
        </div>

        {/* Validation Message */}
        {pdp?.etat == 'tenu_commite' && (
          <p className="mt-6 flex flex-col rounded-xl bg-green-100 p-4 text-xl text-green-500">
            <span>
              Validé par:{' '}
              <span className="font-semibold">
                {pdp.Approbateur?.nom} {pdp.Approbateur?.prenom}
              </span>
            </span>
          </p>
        )}

        {/* Error Message */}
        {pdp?.commentaire && (
          <p className="mt-6 flex flex-col rounded-xl bg-red-100 p-4 text-xl text-red-500">
            <span>
              Refusé par:{' '}
              <span className="font-semibold">
                {pdp.Approbateur?.nom} {pdp.Approbateur?.prenom}
              </span>
            </span>
            {pdp?.commentaire}
          </p>
        )}

        <div>
          <UpdatePdpForm pdp={pdp} />
        </div>
        {pdp?.etat != 'sourcing' && (
          <div className="mt-6">
            <ShowFiles id={pdp?.id} pdp={pdp} />
          </div>
        )}
      </main>
    </div>
  )
}

export default PdpPageId
