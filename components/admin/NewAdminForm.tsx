'use client'

import { createAdminAction } from '@/app/_actions'
import { useState } from 'react'
import Swal from 'sweetalert2'

const NewAdminForm = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    cin: '',
    tel: '',
    email: '',
    password: '',
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const action = async (data: FormData) => {
    await createAdminAction(formData)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Admin Créé avec succès',
        })

        setFormData({
          nom: '',
          prenom: '',
          cin: '',
          tel: '',
          email: '',
          password: '',
        })
      })
      .catch((error: any) => {
        // get the last line of the error message
        const errorMessage = error.message.split('\n').pop()

        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: errorMessage,
        })
      })
  }

  return (
    <form action={action} className="mt-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="flex flex-col">
          <label>Nom</label>
          <input
            type="text"
            className="mt-2 border p-2"
            name="nom"
            onChange={handleChange}
            value={formData.nom}
            placeholder="Nom Admin"
            required
          />
        </div>

        <div className="flex flex-col">
          <label>Prenom</label>
          <input
            type="text"
            className="mt-2 border p-2"
            name="prenom"
            onChange={handleChange}
            value={formData.prenom}
            placeholder="Prenom Admin"
            required
          />
        </div>

        <div className="flex flex-col">
          <label>CIN</label>
          <input
            type="text"
            className="mt-2 border p-2"
            name="cin"
            onChange={handleChange}
            value={formData.cin}
            placeholder="CIN Admin"
            required
          />
        </div>

        <div className="flex flex-col">
          <label>Telephone</label>
          <input
            type="tel"
            className="mt-2 border p-2"
            name="tel"
            onChange={handleChange}
            value={formData.tel}
            placeholder="Telephone Admin"
            required
          />
        </div>

        <div className="flex flex-col">
          <label>E-mail</label>
          <input
            type="email"
            className="mt-2 border p-2"
            name="email"
            onChange={handleChange}
            value={formData.email}
            placeholder="E-mail Admin"
            required
          />
        </div>

        <div className="flex flex-col">
          <label>Password</label>
          <input
            type="password"
            className="mt-2 border p-2"
            name="password"
            onChange={handleChange}
            value={formData.password}
            placeholder="Password Admin"
            required
          />
        </div>
      </div>

      <button
        className="mt-6 rounded-xl bg-sky-400 px-4 py-2 text-white hover:bg-sky-500"
        type="submit"
      >
        Créer
      </button>
    </form>
  )
}

export default NewAdminForm
