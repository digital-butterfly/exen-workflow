'use client'

import { deleteAssocieAction } from '@/app/_actions'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Swal from 'sweetalert2'

const DeleteAssocieButton = ({ id }: any) => {
  const action = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    Swal.fire({
      title: 'Vous êtes sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async result => {
      if (result.isConfirmed) {
        await deleteAssocieAction(id)

        Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
      }
    })
  }

  return (
    <form onSubmit={action}>
      <button
        type="submit"
        className="rounded-lg bg-red-500 px-4 py-2 text-white transition-all hover:bg-red-400"
      >
        <FontAwesomeIcon
          icon={faTrash}
          className="mr-2"
          style={{ width: '1rem', display: 'inline' }}
        />
        Supprimer
      </button>
    </form>
  )
}

export default DeleteAssocieButton
