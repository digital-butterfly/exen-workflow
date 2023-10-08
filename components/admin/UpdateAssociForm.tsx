'use client'

import { updateAssocieAction } from '@/app/_actions'
import { useState } from 'react'
import Swal from 'sweetalert2'

const UpdateAssocieForm = ({ associe }: any) => {
  const [associeState, setAssocieState] = useState(associe)

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setAssocieState({ ...associeState, [name]: value })
  }

  async function action(data: FormData) {
    try {
      await updateAssocieAction(associeState.id, associeState)
    } catch (error) {
      console.log(error)
    }

    setAssocieState({ ...associeState })
    Swal.fire({
      icon: 'success',
      title: 'Associe modifié',
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
            placeholder="Nom d'Associe"
            onChange={handleChange}
            value={associeState?.nom}
            name="nom"
          />
        </div>

        <div className="flex flex-col">
          <label>Prenom</label>
          <input
            type="text"
            className="mt-2 border p-2"
            placeholder="Prenom d'Associe"
            onChange={handleChange}
            value={associeState?.prenom}
            name="prenom"
          />
        </div>

        <div className="flex flex-col">
          <label>CIN</label>
          <input
            type="text"
            className="mt-2 border p-2"
            placeholder="CIN d'Associe"
            onChange={handleChange}
            value={associeState?.cin}
            name="cin"
          />
        </div>

        <div className="flex flex-col">
          <label>Telephone</label>
          <input
            type="text"
            className="mt-2 border p-2"
            placeholder="Telephone d'Associe"
            onChange={handleChange}
            value={associeState?.tel}
            name="telephone"
          />
        </div>

        <div className="flex flex-col">
          <label>E-mail</label>
          <input
            type="email"
            className="mt-2 border p-2"
            placeholder="E-mail d'Associe"
            onChange={handleChange}
            value={associeState?.email}
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

export default UpdateAssocieForm
