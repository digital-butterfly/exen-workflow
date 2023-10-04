import DeletePdpButton from '@/components/admin/DeletePdpButton'
import UpdatePdpForm from '@/components/admin/UpdatePdpForm'
import { getPdpById } from '@/utils/pdp'
import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

const PdpPageId = async ({ params }: any) => {
  const { pdp } = await getPdpById(params.id)
  return (
    <div>
      <Link
        className="rounded-lg border p-4 text-gray-400 transition-all hover:bg-gray-100"
        href={'/admin/pdp'}
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="mr-2"
          style={{ width: '1em', display: 'inline' }}
        />
        Retourner au list pdp
      </Link>
      <main className="mt-10">
        <div className="flex justify-between">
          <h1 className="text-3xl">Pdp Info</h1>
          <DeletePdpButton pdpId={pdp?.id} />
        </div>

        <div>
          <UpdatePdpForm pdp={pdp} />
        </div>
      </main>
    </div>
  )
}

export default PdpPageId
