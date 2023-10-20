'use client'

import { updateAssocieAction } from '@/app/_actions'
import { TextInput } from 'flowbite-react'
import { useState } from 'react'
import Swal from 'sweetalert2'

const UpdateAssocieForm = ({ associe }: any) => {
  const [associeState, setAssocieState] = useState(associe)

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
    {
      label: 'Délai de Marché (jours)',
      name: 'delai',
      type: 'text',
      required: true,
    },
    {
      label: 'Date de début',
      name: 'date_debut',
      type: 'text',
      required: true,
      value: new Date(associeState.date_debut).toLocaleDateString(),
    },
    { label: 'Email', name: 'email', type: 'email', required: true },
  ]

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setAssocieState({ ...associeState, [name]: value })
  }

  async function action(data: FormData) {
    await updateAssocieAction(associeState.id, associeState)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Projet modifier avec succès',
        })
        setAssocieState(associeState)
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

  // reset password
  const handleClick = async () => {
    const { value: password } = await Swal.fire({
      title: 'Enter your password',
      input: 'password',
      inputLabel: 'Password',
      inputPlaceholder: 'Enter your password',
      inputAttributes: {
        maxlength: '25',
        autocapitalize: 'off',
        autocorrect: 'off',
      },
      preConfirm: async password => {
        try {
          await updateAssocieAction(associeState.id, { password })
        } catch (error) {
          Swal.showValidationMessage(`Request failed: ${error}`)
        }
      },
    })

    if (password) {
      Swal.fire({
        title: 'Mot de passe réinitialisé avec succès',
        icon: 'success',
      })
    }
  }

  return (
    <form action={action}>
      <div className="grid grid-cols-3 gap-6">
        {formInputs.map((input, index) => (
          <div key={index} className="flex flex-col">
            <label className="mb-2">{input.label}</label>
            <TextInput
              type={input.type}
              onChange={handleChange}
              value={input.value ? input.value : associeState[input.name]}
              name={input.name}
              required={input.required}
            />
          </div>
        ))}
      </div>

      <button
        className="mt-6 rounded-xl bg-sky-400 px-4 py-2 text-white hover:bg-sky-500"
        type="submit"
      >
        Modifier
      </button>
      <button
        onClick={handleClick}
        type="button"
        className="ml-2 mt-6 rounded-xl bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        Réinitialisé mot de pass
      </button>
    </form>
  )
}

export default UpdateAssocieForm
