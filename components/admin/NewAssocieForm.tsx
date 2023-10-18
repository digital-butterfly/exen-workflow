'use client'

import { createAssocieAction } from '@/app/_actions'
import { useState } from 'react'
import Swal from 'sweetalert2'

const NewAssocieForm = () => {
  const [formData, setFormData] = useState({
    num_marche: '',
    organisme: '',
    region: '',
    objet_marche: '',
    appellation: '',
    delai: '',
    date_debut: '',
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const action = async (data: FormData) => {
    await createAssocieAction(formData)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Projet créé avec succès',
        })
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue',
        })
      })

    setFormData({
      num_marche: '',
      organisme: '',
      region: '',
      objet_marche: '',
      appellation: '',
      delai: '',
      date_debut: '',
    })
  }

  return (
    <form action={action} className="mt-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="flex flex-col">
          <label>N° de Marché</label>
          <input
            className="mt-2 border p-2"
            type="text"
            name="num_marche"
            onChange={handleChange}
            value={formData.num_marche}
            placeholder="Numéro de Marché"
            required
          />
        </div>

        <div className="flex flex-col">
          <label>Organism</label>
          <input
            className="mt-2 border p-2"
            type="text"
            name="organisme"
            onChange={handleChange}
            value={formData.organisme}
            placeholder="Organism de projet"
            required
          />
        </div>

        <div className="flex flex-col">
          <label>Region</label>
          <input
            className="mt-2 border p-2"
            type="text"
            name="region"
            onChange={handleChange}
            value={formData.region}
            placeholder="Region de projet"
            required
          />
        </div>

        <div className="flex flex-col">
          <label>Objet de Marché</label>
          <input
            className="mt-2 border p-2"
            type="text"
            name="objet_marche"
            onChange={handleChange}
            value={formData.objet_marche}
            placeholder="Objet de Marché"
            required
          />
        </div>

        <div className="flex flex-col">
          <label>Appellation</label>
          <input
            className="mt-2 border p-2"
            type="text"
            name="appellation"
            onChange={handleChange}
            value={formData.appellation}
            placeholder="Appellation du projet"
            required
          />
        </div>

        <div className="flex flex-col">
          <label>Délai de Marché</label>
          <input
            className="mt-2 border p-2"
            type="text"
            name="delai"
            onChange={handleChange}
            value={formData.delai}
            placeholder="Délai de Marché"
            required
          />
        </div>

        <div className="flex flex-col">
          <label>Date de début</label>
          <input
            className="mt-2 border p-2"
            type="date"
            name="date_debut"
            onChange={handleChange}
            value={formData.date_debut}
            placeholder="Date de début"
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
