import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

const AddButton = ({ path }: any) => {
  return (
    <Link
      className="mt-6 flex items-center gap-4 rounded-lg bg-sky-400 p-2 text-white"
      href={path}
    >
      <FontAwesomeIcon
        icon={faPlus}
        style={{ width: '1rem', display: 'inline' }}
      />
      Ajouter
    </Link>
  )
}

export default AddButton
