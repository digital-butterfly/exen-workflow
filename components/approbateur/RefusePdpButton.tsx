'use client'

import { refusePdpAction } from '@/app/_actions'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Swal from 'sweetalert2'

const RefusePdpButton = ({ id, approbateurId }: any) => {
  const action = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { value: message } = await Swal.fire({
      title: 'Enter your message',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Send',
      showLoaderOnConfirm: true,
      preConfirm: message => {
        return refusePdpAction(id, message, approbateurId).catch(error => {
          Swal.showValidationMessage(`Request failed: ${error}`)
        })
      },
      allowOutsideClick: () => !Swal.isLoading(),
    })

    if (message) {
      Swal.fire({
        title: 'Pdp refusé avec succès',
        icon: 'success',
      })
    }
  }

  return (
    <form onSubmit={action}>
      <input type="hidden" name="id" value={id} />
      <button className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-400">
        <FontAwesomeIcon
          icon={faTimesCircle}
          className="mr-2"
          style={{ width: '1rem', display: 'inline' }}
        />
        Refuser
      </button>
    </form>
  )
}

export default RefusePdpButton
