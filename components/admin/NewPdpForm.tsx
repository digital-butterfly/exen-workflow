'use client'

import { createPdpAction } from '@/app/_actions'
import {
  communes,
  experiences,
  formJuridiques,
  provinces,
  regions,
  secteurs,
  secteursGlobal,
} from '@/utils/formOptionsInfo'
import { useState } from 'react'
import Swal from 'sweetalert2'

const initialFormData = {
  irchad_id: '',
  nom: '',
  prenom: '',
  sexe: 'homme',
  date_naissance: '',
  num_cin: '',
  tel: '',
  email: '',
  type_form_juridique: 'SARL',
  date_form_juridique: '',
  region: 'Oriental',
  commune: 'Oujda',
  province: '',
  nom_projet: '',
  secteur_projet: '',
  experience_1: '',
  experience_2: '',
  experience_3: '',
  experience_4: '',
  experience_5: '',
}

const NewPdpForm = ({ id, role }: any) => {
  const [formData, setFormData]: any = useState(initialFormData)
  const [secteurGlobal, setSecteurGlobal] = useState('Agriculture')

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  async function action(data: FormData) {
    // call a server action to create a todo
    try {
      await createPdpAction(id, formData, role)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Une erreur est survenue lors de la création du porteur de projet',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }

    Swal.fire({
      title: 'Success!',
      text: 'Le porteur de projet a été crée avec succès',
      icon: 'success',
      confirmButtonText: 'OK',
    })
    // reset the form
    setFormData(initialFormData)
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
            <select
              name="type_form_juridique"
              className="mt-2 border p-2"
              required
              onChange={handleChange}
              value={formData.type_form_juridique}
            >
              {formJuridiques.map(formJuridique => (
                <option key={formJuridique} value={formJuridique}>
                  {formJuridique}
                </option>
              ))}
            </select>
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
            <select
              name="region"
              className="mt-2 border p-2"
              required
              onChange={handleChange}
              value={formData.region}
            >
              {regions.map(region => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label>Commune</label>
            <select
              name="commune"
              className="mt-2 border p-2"
              required
              onChange={handleChange}
              value={formData.commune}
            >
              {communes[
                formData.region.toLowerCase() as keyof typeof communes
              ].map(commune => (
                <option key={commune} value={commune}>
                  {commune}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label>Province</label>
            <select
              name="province"
              className="mt-2 border p-2"
              required
              onChange={handleChange}
              value={formData.province}
            >
              <option value="" disabled>
                -- choisir province --
              </option>
              {provinces[
                formData.commune
                  .toLowerCase()
                  .replace(/\s/g, '') as keyof typeof provinces
              ].map(province => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label>Experience 1</label>
            <select
              name="experience_1"
              className="mt-2 border p-2"
              onChange={handleChange}
              value={formData.experience_1}
            >
              <option value="" disabled>
                -- choisir experience --
              </option>
              {experiences.map(experience => (
                <option key={experience} value={experience}>
                  {experience}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label>Experience 2</label>
            <select
              name="experience_2"
              className="mt-2 border p-2"
              onChange={handleChange}
              value={formData.experience_2}
            >
              <option value="" disabled>
                -- choisir experience --
              </option>
              {experiences.map(experience => (
                <option key={experience} value={experience}>
                  {experience}
                </option>
              ))}
            </select>
          </div>
        </div>

        <hr className="mx-auto mt-6 h-1 w-48 rounded border-0 bg-gray-100 md:my-10" />

        <div className="grid grid-cols-3 gap-6">
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
            <label>Secteur de projet</label>
            <select
              className="mt-2 border p-2"
              value={secteurGlobal}
              onChange={e => setSecteurGlobal(e.target.value)}
            >
              {secteursGlobal?.map(e => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label>Secteur du projet</label>
            <select
              name="secteur_projet"
              className="mt-2 border p-2"
              required
              onChange={handleChange}
              value={formData.secteur_projet}
            >
              <option value="" disabled>
                -- choisir secteur --
              </option>
              {secteurs[
                secteurGlobal
                  .toLowerCase()
                  .replace(/\s/g, '') as keyof typeof secteurs
              ].map(secteur => (
                <option key={secteur} value={secteur}>
                  {secteur}
                </option>
              ))}
            </select>
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
