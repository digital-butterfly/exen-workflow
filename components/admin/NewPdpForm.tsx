'use client'

import { createPdpAction } from '@/app/_actions'
import { useState } from 'react'
import Swal from 'sweetalert2'

const NewPdpForm = ({ id }: any) => {
  const [formData, setFormData] = useState({
    irchad_id: '',
    nom: '',
    prenom: '',
    sexe: '',
    date_naissance: '',
    num_cin: '',
    tel: '',
    email: '',
    type_form_juridique: '',
    date_form_juridique: '',
    region: '',
    commune: '',
    province: '',
    nom_projet: '',
    secteur_projet: '',
    experience_1: '',
    experience_2: '',
    experience_3: '',
    experience_4: '',
    experience_5: '',
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  async function action(data: FormData) {
    // call a server action to create a todo
    try {
      await createPdpAction(id, formData, 'admin')
    } catch (error) {
      console.log(error)
    }

    Swal.fire({
      title: 'Success!',
      text: 'Le porteur de projet a été crée avec succès',
      icon: 'success',
      confirmButtonText: 'OK',
    })
    // reset the form
    setFormData({
      irchad_id: '',
      nom: '',
      prenom: '',
      sexe: 'homme',
      date_naissance: '',
      num_cin: '',
      tel: '',
      email: '',
      type_form_juridique: '',
      date_form_juridique: '',
      region: '',
      commune: '',
      province: '',
      nom_projet: '',
      secteur_projet: '',
      experience_1: '',
      experience_2: '',
      experience_3: '',
      experience_4: '',
      experience_5: '',
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    // validate the form
    action(formData)
  }
  //  Ajouter Region

  return (
    <div>
      <hr className="mx-auto mt-6 h-1 w-48 rounded border-0 bg-gray-100 md:my-10" />

      <form action={action} onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col">
            <label>Irchad Réf candidature</label>
            <input
              className="mt-2 border p-2"
              type="number"
              placeholder="Irchad Référence"
              onChange={handleChange}
              value={formData.irchad_id}
              name="irchad_id"
            />
          </div>
          <div className="flex flex-col">
            <label>Nom</label>
            <input
              className="mt-2 border p-2"
              type="text"
              placeholder="nom"
              onChange={handleChange}
              value={formData.nom}
              name="nom"
              required
            />
          </div>
          <div className="flex flex-col">
            <label>Prenom</label>
            <input
              className="mt-2 border p-2"
              type="text"
              placeholder="prenom"
              onChange={handleChange}
              value={formData.prenom}
              name="prenom"
              required
            />
          </div>
          <div className="flex flex-col">
            <label>Sexe</label>
            <select
              name="sexe"
              className="mt-2 border p-2"
              onChange={handleChange}
              value={formData.sexe}
              required
            >
              <option value="homme">Homme</option>
              <option value="femme">Femme</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label>Date de naissance</label>
            <input
              className="mt-2 border p-2"
              type="date"
              onChange={handleChange}
              value={formData.date_naissance}
              name="date_naissance"
              required
            />
          </div>
          <div className="flex flex-col">
            <label>CIN</label>
            <input
              className="mt-2 border p-2"
              type="text"
              placeholder="CIN"
              onChange={handleChange}
              value={formData.num_cin}
              name="num_cin"
              required
            />
          </div>
          <div className="flex flex-col">
            <label>Telephone</label>
            <input
              className="mt-2 border p-2"
              type="text"
              placeholder="Telephone"
              onChange={handleChange}
              value={formData.tel}
              name="tel"
              required
            />
          </div>
          <div className="flex flex-col">
            <label>Email</label>
            <input
              className="mt-2 border p-2"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
              name="email"
              required
            />
          </div>
          <div className="flex flex-col">
            <label>Type de form juridique</label>
            <input
              className="mt-2 border p-2"
              type="text"
              placeholder="Type de form juridique"
              onChange={handleChange}
              value={formData.type_form_juridique}
              name="type_form_juridique"
              required
            />
          </div>
          <div className="flex flex-col">
            <label>Date de form juridique</label>
            <input
              className="mt-2 border p-2"
              type="date"
              onChange={handleChange}
              value={formData.date_form_juridique}
              name="date_form_juridique"
              required
            />
          </div>
          <div className="flex flex-col">
            <label>Region</label>
            <input
              className="mt-2 border p-2"
              type="text"
              placeholder="Region"
              onChange={handleChange}
              value={formData.region}
              name="region"
              required
            />
          </div>
          <div className="flex flex-col">
            <label>Commune</label>
            <input
              className="mt-2 border p-2"
              type="text"
              placeholder="Commune"
              onChange={handleChange}
              value={formData.commune}
              name="commune"
              required
            />
          </div>
          <div className="flex flex-col">
            <label>Province</label>
            <input
              className="mt-2 border p-2"
              type="text"
              placeholder="Province"
              onChange={handleChange}
              value={formData.province}
              name="province"
              required
            />
          </div>
          <div className="flex flex-col">
            <label>Experience 1</label>
            <input
              className="mt-2 border p-2"
              type="text"
              placeholder="Experience 1"
              onChange={handleChange}
              value={formData.experience_1}
              name="experience_1"
            />
          </div>
          <div className="flex flex-col">
            <label>Experience 2</label>
            <input
              className="mt-2 border p-2"
              type="text"
              placeholder="Experience 2"
              onChange={handleChange}
              value={formData.experience_2}
              name="experience_2"
            />
          </div>
        </div>

        <hr className="mx-auto mt-6 h-1 w-48 rounded border-0 bg-gray-100 md:my-10" />

        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label>Intitulé projet</label>
            <input
              className="mt-2 border p-2"
              type="text"
              placeholder="Nom du projet"
              onChange={handleChange}
              value={formData.nom_projet}
              name="nom_projet"
              required
            />
          </div>
          <div className="flex flex-col">
            <label>Secteur du projet</label>
            <input
              className="mt-2 border p-2"
              type="text"
              placeholder="Secteur du projet"
              onChange={handleChange}
              value={formData.secteur_projet}
              name="secteur_projet"
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
    </div>
  )
}

export default NewPdpForm
