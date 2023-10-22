'use client'

import { createAssocieAction } from '@/app/_actions'
import { TextInput } from 'flowbite-react'
import { useState } from 'react'
import Swal from 'sweetalert2'

const NewAssocieForm = () => {
  const formInputs = [
    { label: 'N° de Marché', name: 'num_marche', type: 'text', required: true },
    { label: 'Organism', name: 'organisme', type: 'text', required: true },
    { label: 'Zone', name: 'region', type: 'text', required: true },
    {
      label: 'Objet de Marché',
      name: 'objet_marche',
      type: 'text',
      required: true,
    },
    { label: 'Appellation', name: 'appellation', type: 'text', required: true },
    { label: 'Délai de Marché', name: 'delai', type: 'number', required: true },
    {
      label: 'Date de début',
      name: 'date_debut',
      type: 'date',
      required: true,
    },
    { label: 'Email', name: 'email', type: 'email', required: true },
    { label: 'Password', name: 'password', type: 'password', required: true },
  ]

  const [formData, setFormData] = useState({
    num_marche: '',
    organisme: '',
    region: '',
    objet_marche: '',
    appellation: '',
    delai: '',
    date_debut: '',
    email: '',
    password: '',
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
        setFormData({
          num_marche: '',
          organisme: '',
          region: '',
          objet_marche: '',
          appellation: '',
          delai: '',
          date_debut: '',
          email: '',
          password: '',
        })
      })
      .catch(error => {
        // get the last line of the error message
        const errorMessage = error.message.split('\n').pop()

        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: `Erreur survenue: ${errorMessage}`,
        })
      })
  }

  return (
    <form action={action} className="mt-6">
      <div className="grid grid-cols-3 gap-6">
        {formInputs.map((input, index) => (
          <div className="flex flex-col" key={index}>
            <label className="mb-2">{input.label}</label>
            <TextInput
              type={input.type}
              name={input.name}
              onChange={handleChange}
              value={formData[input.name as keyof typeof formData]}
              placeholder={input.label}
              required={input.required}
            />
          </div>
        ))}
      </div>
      <button
        className="float-right mt-6 rounded-xl bg-sky-400 px-4 py-2 text-white hover:bg-sky-500"
        type="submit"
      >
        Créer
      </button>
    </form>
  )
}

export default NewAssocieForm
