'use client'

import { updatePdpAction } from '@/app/_actions'
import { useState } from 'react'

const UpdatePdpForm = ({ pdp }: any) => {
  const [pdpState, setPdpState] = useState({ ...pdp })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setPdpState({ ...pdpState, [name]: value })
  }

  async function action(data) {
    // call a server action to create a todo
    try {
      await updatePdpAction(pdpState.id, pdpState)
    } catch (error) {
      console.log(error)
    }
    // reset the form
    setPdpState({ ...pdpState })
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
          Créer à: {pdpState.createdAt.toLocaleString('fr-FR').substr(0, 10)}
        </p>
        <p>
          Dernière modification: {pdpState.createdAt.toLocaleString('fr-FR')}
        </p>
      </div>

      <hr className="mx-auto mt-6 h-1 w-48 rounded border-0 bg-gray-100 md:my-10" />

      <form action={action} onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-x-4">
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
          <div className="mt-6 flex flex-col">
            <label className="font-semibold">Date de naissance</label>
            <input
              className="mt-2 border p-2"
              type="date"
              onChange={handleChange}
              value={pdpState.date_naissance.toISOString().substr(0, 10)}
              name="date_naissance"
              required
            />
          </div>
          <div className="mt-6 flex flex-col">
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
          <div className="mt-6 flex flex-col">
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
          <div className="mt-6 flex flex-col">
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
          <div className="mt-6 flex flex-col">
            <label className="font-semibold">Type de form juridique</label>
            <input
              className="mt-2 border p-2"
              type="text"
              placeholder="Type de form juridique"
              onChange={handleChange}
              value={pdpState.type_form_juridique}
              name="type_form_juridique"
              required
            />
          </div>
          <div className="mt-6 flex flex-col">
            <label className="font-semibold">Date de form juridique</label>
            <input
              className="mt-2 border p-2"
              type="date"
              onChange={handleChange}
              value={pdpState.date_form_juridique.toISOString().substr(0, 10)}
              name="date_form_juridique"
              required
            />
          </div>
          <div className="mt-6 flex flex-col">
            <label className="font-semibold">Region</label>
            <input
              className="mt-2 border p-2"
              type="text"
              placeholder="Region"
              onChange={handleChange}
              value={pdpState.region}
              name="region"
              required
            />
          </div>
          <div className="mt-6 flex flex-col">
            <label className="font-semibold">Commune</label>
            <input
              className="mt-2 border p-2"
              type="text"
              placeholder="Commune"
              onChange={handleChange}
              value={pdpState.commune}
              name="commune"
              required
            />
          </div>
          <div className="mt-6 flex flex-col">
            <label className="font-semibold">Province</label>
            <input
              className="mt-2 border p-2"
              type="text"
              placeholder="Province"
              onChange={handleChange}
              value={pdpState.province}
              name="province"
              required
            />
          </div>
          <div className="mt-6 flex flex-col">
            <label className="font-semibold">Experience 1</label>
            <input
              className="mt-2 border p-2"
              type="text"
              placeholder="Experience 1"
              onChange={handleChange}
              value={pdpState.experience_1}
              name="experience_1"
            />
          </div>
          <div className="mt-6 flex flex-col">
            <label className="font-semibold">Experience 2</label>
            <input
              className="mt-2 border p-2"
              type="text"
              placeholder="Experience 2"
              onChange={handleChange}
              value={pdpState.experience_2}
              name="experience_2"
            />
          </div>
        </div>

        <hr className="mx-auto mt-6 h-1 w-48 rounded border-0 bg-gray-100 md:my-10" />

        <div className="grid grid-cols-2 gap-x-4">
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
