'use client'

import { updatePdpAction } from '@/app/_actions'
import {
  communes,
  experiences,
  formJuridiques,
  provinces,
  regions,
} from '@/utils/formOptionsInfo'
import { useState } from 'react'
import Swal from 'sweetalert2'

const UpdatePdpForm = ({ pdp }: any) => {
  const [pdpState, setPdpState] = useState({
    ...pdp,
    date_naissance: new Date(pdp.date_naissance).toLocaleDateString('fr-FR'),
    date_form_juridique: new Date(pdp.date_form_juridique).toLocaleDateString(
      'fr-FR',
    ),
  })
  // console.log(pdpState)

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setPdpState({ ...pdpState, [name]: value })
  }

  async function action(data: FormData) {
    // call a server action to create a todo
    try {
      await updatePdpAction(pdpState.id, pdpState)
    } catch (error) {
      console.log(error)
    }
    // reset the form
    setPdpState({ ...pdpState })
    Swal.fire({
      icon: 'success',
      title: 'Pdp modifié',
      showConfirmButton: false,
      timer: 1500,
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    // validate the form
    action(pdpState)
  }
  //  Ajouter Region

  return (
    <div>
      <div className="mt-5">
        <p>
          Créer le: {pdpState.createdAt.toLocaleString('fr-FR').substr(0, 10)}{' '}
          par{' '}
          <span className="font-semibold">
            {pdpState?.Admin?.nom} {pdpState?.Admin?.prenom}
          </span>
        </p>
        {/* <p>
          Dernière modification:{' '}
          {pdpState.updatedAt.toLocaleString('fr-FR').substr(0, 10)}
        </p> */}
      </div>

      <hr className="mx-auto mt-6 h-1 w-48 rounded border-0 bg-gray-100 md:my-10" />

      <form action={action} onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col">
            <label className="font-semibold">Irchad Réf candidature</label>
            <input
              className="mt-2 border p-2"
              type="number"
              placeholder="Irchad Référence"
              onChange={handleChange}
              value={pdpState.irchad_id}
              name="irchad_id"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Nom</label>
            <input
              className="mt-2 border p-2"
              type="text"
              placeholder="nom"
              onChange={handleChange}
              value={pdpState.nom}
              name="nom"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Prenom</label>
            <input
              className="mt-2 border p-2"
              type="text"
              placeholder="prenom"
              onChange={handleChange}
              value={pdpState.prenom}
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
              value={pdpState.sexe}
              required
            >
              <option value="homme">Homme</option>
              <option value="femme">Femme</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Date de naissance</label>
            <input
              className="mt-2 border p-2"
              type="text"
              onChange={handleChange}
              value={pdpState.date_naissance}
              name="date_naissance"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">CIN</label>
            <input
              className="mt-2 border p-2"
              type="text"
              placeholder="CIN"
              onChange={handleChange}
              value={pdpState.num_cin}
              name="num_cin"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Telephone</label>
            <input
              className="mt-2 border p-2"
              type="text"
              placeholder="Telephone"
              onChange={handleChange}
              value={pdpState.tel}
              name="tel"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Email</label>
            <input
              className="mt-2 border p-2"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              value={pdpState.email}
              name="email"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Type de form juridique</label>
            <select
              name="type_form_juridique"
              className="mt-2 border p-2"
              required
              onChange={handleChange}
              value={pdpState.type_form_juridique}
            >
              {formJuridiques.map(formJuridique => (
                <option key={formJuridique} value={formJuridique}>
                  {formJuridique}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Date de form juridique</label>
            <input
              className="mt-2 border p-2"
              type="text"
              onChange={handleChange}
              value={pdpState.date_form_juridique}
              name="date_form_juridique"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Region</label>
            <select
              name="region"
              className="mt-2 border p-2"
              required
              onChange={handleChange}
              value={pdpState.region}
            >
              {regions.map(region => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Commune</label>
            <select
              name="commune"
              className="mt-2 border p-2"
              required
              onChange={handleChange}
              value={pdpState.commune}
            >
              {communes[
                pdpState.region.toLowerCase() as keyof typeof communes
              ].map(commune => (
                <option key={commune} value={commune}>
                  {commune}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Province</label>
            <select
              name="province"
              className="mt-2 border p-2"
              required
              onChange={handleChange}
              value={pdpState.province}
            >
              {provinces[
                pdpState.commune.toLowerCase() as keyof typeof provinces
              ].map(province => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Experience 1</label>
            <select
              name="experience_1"
              className="mt-2 border p-2"
              required
              onChange={handleChange}
              value={pdpState.experience_1}
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
            <label className="font-semibold">Experience 2</label>
            <select
              name="experience_2"
              className="mt-2 border p-2"
              required
              onChange={handleChange}
              value={pdpState.experience_2}
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

        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="font-semibold">Intitulé projet</label>
            <input
              className="mt-2 border p-2"
              type="text"
              placeholder="Nom du projet"
              onChange={handleChange}
              value={pdpState.nom_projet}
              name="nom_projet"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Secteur du projet</label>
            <input
              className="mt-2 border p-2"
              type="text"
              placeholder="Secteur du projet"
              onChange={handleChange}
              value={pdpState.secteur_projet}
              name="secteur_projet"
              required
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
    </div>
  )
}

export default UpdatePdpForm
