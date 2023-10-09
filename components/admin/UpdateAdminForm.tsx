'use client'

import { resetAdminPasswordAction, updateAdminAction } from '@/app/_actions'
import { useState } from 'react'
import Swal from 'sweetalert2'

const UpdateAdminForm = ({ admin }: any) => {
  const [adminState, setAdminState] = useState(admin)

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setAdminState({ ...adminState, [name]: value })
  }

  async function action(data: FormData) {
    try {
      await updateAdminAction(adminState.id, adminState)
    } catch (error) {
      console.log(error)
    }

    setAdminState({ ...adminState })
    Swal.fire({
      icon: 'success',
      title: 'Admin modifié',
      showConfirmButton: false,
      timer: 1500,
    })
  }

  // reset password
  const handleClick = async () => {
    const { value: password } = await Swal.fire({
      title: 'Enter your password',
      input: 'password',
      inputLabel: 'Password',
      inputPlaceholder: 'Enter your password',
      inputAttributes: {
        maxlength: '25',
        autocapitalize: 'off',
        autocorrect: 'off',
      },
      preConfirm: async password => {
        try {
          await resetAdminPasswordAction(adminState.id, password)
        } catch (error) {
          Swal.showValidationMessage(`Request failed: ${error}`)
        }
      },
    })

    if (password) {
      Swal.fire({
        title: 'Mot de passe réinitialisé avec succès',
        icon: 'success',
      })
    }
  }

  return (
    <form action={action}>
      <div className="grid grid-cols-3 gap-6">
        <div className="flex flex-col">
          <label>Nom</label>
          <input
            type="text"
            className="mt-2 border p-2"
            placeholder="Nom d'admin"
            onChange={handleChange}
            value={adminState.nom}
            name="nom"
          />
        </div>
        <div className="flex flex-col">
          <label>Prenom</label>
          <input
            type="text"
            className="mt-2 border p-2"
            placeholder="Prenom d'admin"
            onChange={handleChange}
            value={adminState.prenom}
            name="prenom"
          />
        </div>
        <div className="flex flex-col">
          <label>CIN</label>
          <input
            type="text"
            className="mt-2 border p-2"
            placeholder="CIN d'admin"
            onChange={handleChange}
            value={adminState.cin}
            name="cin"
          />
        </div>
        <div className="flex flex-col">
          <label>Telephone</label>
          <input
            type="text"
            className="mt-2 border p-2"
            placeholder="Telephone d'admin"
            onChange={handleChange}
            value={adminState.tel}
            name="telephone"
          />
        </div>
        <div className="flex flex-col">
          <label>E-mail</label>
          <input
            type="email"
            className="mt-2 border p-2"
            placeholder="E-mail d'admin"
            onChange={handleChange}
            value={adminState.email}
            name="email"
          />
        </div>
      </div>
      <button
        className="mr-2 mt-6 rounded-xl bg-sky-400 px-4 py-2 text-white hover:bg-sky-500"
        type="submit"
      >
        Modifier
      </button>
      <button
        onClick={handleClick}
        type="button"
        className="mt-6 rounded-xl bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        Réinitialisé mot de pass
      </button>
    </form>
  )
}

export default UpdateAdminForm
