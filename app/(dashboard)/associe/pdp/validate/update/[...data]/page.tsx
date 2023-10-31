import UpdateAdminForm from '@/components/admin/UpdateAdminForm'
import UpdatePdpFileForm from '@/components/admin/UpdatePdpFileForm'
import { ReturnButtonClass } from '@/utils/classes'
import { getPdpById } from '@/utils/pdp'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

const UpdateFilePage = async ({ params }: any) => {
  let [id, fileType, fileName] = params.data
  fileName = decodeURIComponent(fileName)
  const { pdp }: any = await getPdpById(id)

  return (
    <div>
      <Link className={ReturnButtonClass} href={`/associe/pdp/update/${id}`}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="mr-2"
          style={{ width: '1em', display: 'inline' }}
        />
        Retour
      </Link>
      <h1 className="mb-6 mt-10 text-3xl">Changer fichier {fileName} </h1>

      <UpdatePdpFileForm pdp={pdp} fileType={fileType} fileName={fileName} />
    </div>
  )
}

export default UpdateFilePage
