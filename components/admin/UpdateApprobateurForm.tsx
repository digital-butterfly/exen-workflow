'use client'

import { updateApprobateurAction } from '@/app/_actions'
import { useState } from 'react'
import Swal from 'sweetalert2'

const UpdateApprobateurForm = ({ approbateur }: any) => {
  const [approbateurState, setApprobateurState] = useState(approbateur)

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setApprobateurState({ ...approbateurState, [name]: value })
  }

  async function action(data: FormData) {
    try {
      await updateApprobateurAction(approbateurState.id, approbateurState)
    } catch (error) {
      console.log(error)
    }

    setApprobateurState({ ...approbateurState })
    Swal.fire({
      icon: 'success',
      title: 'Approbateur modifié',
      showConfirmButton: false,
      timer: 1500,
    })
  }

  return (
    <form action={action}>
      <div className="grid grid-cols-3 gap-6">
        <div className="flex flex-col">
          <label>Nom</label>
          <input
            type="text"
            className="mt-2 border p-2"
            placeholder="Nom d'approbateur"
            onChange={handleChange}
            value={approbateurState.nom}
            name="nom"
          />
        </div>

        <div className="flex flex-col">
          <label>Prenom</label>
          <input
            type="text"
            className="mt-2 border p-2"
            placeholder="Prenom d'approbateur"
            onChange={handleChange}
            value={approbateurState.prenom}
            name="prenom"
          />
        </div>

        <div className="flex flex-col">
          <label>CIN</label>
          <input
            type="text"
            className="mt-2 border p-2"
            placeholder="CIN d'approbateur"
            onChange={handleChange}
            value={approbateurState.cin}
            name="cin"
          />
        </div>

        <div className="flex flex-col">
          <label>Telephone</label>
          <input
            type="text"
            className="mt-2 border p-2"
            placeholder="Telephone d'approbateur"
            onChange={handleChange}
            value={approbateurState.tel}
            name="telephone"
          />
        </div>

        <div className="flex flex-col">
          <label>E-mail</label>
          <input
            type="email"
            className="mt-2 border p-2"
            placeholder="E-mail d'approbateur"
            onChange={handleChange}
            value={approbateurState.email}
            name="email"
          />
        </div>
      </div>

      <button
        className="mt-6 rounded-xl bg-sky-400 px-4 py-2 text-white hover:bg-sky-500"
        type="submit"
      >
        Modifier
      </button>
    </form>
  )
}

export default UpdateApprobateurForm
