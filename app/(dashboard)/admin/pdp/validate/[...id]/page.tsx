import ValidatePdpForm from '@/components/admin/ValidatePdpForm'
import { getPdpById } from '@/utils/pdp'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

const ValidatePage = async ({ params }: any) => {
  const { id } = params
  const { pdp } = await getPdpById(id)

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

      <main className="mt-10">
        <h1 className="text-3xl">
          Valider pdp ({pdp?.nom} {pdp?.prenom})
        </h1>

        <ValidatePdpForm pdp={pdp} />
      </main>
    </div>
  )
}

export default ValidatePage
