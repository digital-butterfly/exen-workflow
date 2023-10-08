'use client'

import { createAssocieAction } from '@/app/_actions'
import { useState } from 'react'
import Swal from 'sweetalert2'

const NewAssocieForm = () => {
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
    try {
      await createAssocieAction(formData)
    } catch (error) {
      console.log(error)
    }

    Swal.fire({
      icon: 'success',
      title: 'Succès',
      text: 'Associe créé avec succès',
    })

    setFormData({
      nom: '',
      prenom: '',
      cin: '',
      tel: '',
      email: '',
      password: '',
    })
  }

  return (
    <form action={action} className="mt-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="flex flex-col">
          <label>Nom</label>
          <input
            className="mt-2 border p-2"
            type="text"
            name="nom"
            onChange={handleChange}
            value={formData.nom}
            placeholder="Nom d'Associe"
            required
          />
        </div>

        <div className="flex flex-col">
          <label>Prenom</label>
          <input
            className="mt-2 border p-2"
            type="text"
            name="prenom"
            onChange={handleChange}
            value={formData.prenom}
            placeholder="Prenom d'Associe"
            required
          />
        </div>

        <div className="flex flex-col">
          <label>CIN</label>
          <input
            className="mt-2 border p-2"
            type="text"
            name="cin"
            onChange={handleChange}
            value={formData.cin}
            placeholder="CIN d'Associe"
            required
          />
        </div>

        <div className="flex flex-col">
          <label>Telephone</label>
          <input
            className="mt-2 border p-2"
            type="tel"
            name="tel"
            onChange={handleChange}
            value={formData.tel}
            placeholder="Telephone d'Associe"
            required
          />
        </div>

        <div className="flex flex-col">
          <label>E-mail</label>
          <input
            className="mt-2 border p-2"
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            placeholder="E-mail d'Associe"
            required
          />
        </div>

        <div className="flex flex-col">
          <label>Mot de passe</label>
          <input
            className="mt-2 border p-2"
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            placeholder="Mot de passe d'Associe"
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

export default NewAssocieForm
