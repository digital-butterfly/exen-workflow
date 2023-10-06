import DeletePdpButton from '@/components/admin/DeletePdpButton'
import UpdatePdpForm from '@/components/admin/UpdatePdpForm'
import { getPdpById } from '@/utils/pdp'
import {
  faArrowLeft,
  faCheck,
  faCheckCircle,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
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
          <h1 className="text-3xl">Pdp Info</h1>
          <div className="flex gap-4">
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
            {/* Delete pdp button */}
            <DeletePdpButton pdpId={pdp?.id} />
          </div>
        </div>

        <div>
          <UpdatePdpForm pdp={pdp} />
        </div>
      </main>
    </div>
  )
}

export default PdpPageId
