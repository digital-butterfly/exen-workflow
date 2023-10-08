'use client'

import { validatePdpAction } from '@/app/_actions'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Swal from 'sweetalert2'

const ValidateButton = ({ id }: any) => {
  const handleClick = async () => {
    await validatePdpAction(id)
      .then(() => {
        Swal.fire({
          title: 'Pdp validé avec succès',
          icon: 'success',
        })
      })
      .catch(error => {
        Swal.showValidationMessage(`Request failed: ${error}`)
      })
  }

  return (
    <button
      className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-400"
      onClick={handleClick}
    >
      <FontAwesomeIcon
        icon={faCheckCircle}
        className="mr-2"
        style={{ width: '1rem', display: 'inline' }}
      />
      Valider
    </button>
  )
}

export default ValidateButton
