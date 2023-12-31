'use client'

import { inputFileClass } from '@/utils/classes'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import Swal from 'sweetalert2'

const ValidatePdpForm = ({ pdp }: any) => {
  const [isLoading, setIsLoading] = useState(false)
  const inputs = [
    { label: 'CIN', name: 'doc_cin' },
    { label: 'Cv', name: 'doc_cv' },
    // replaced form juridique with chachat Al moukawil
    { label: 'Chachat Al Moukawil', name: 'doc_forme_juridique' },
    { label: 'Contrat de bail', name: 'doc_contrat_de_bail' },
    { label: 'Devis', name: 'doc_devis' },
    { label: 'Attestation de RIB', name: 'doc_attestation_rib' },
    // { label: 'Diplôme', name: 'doc_diplome' },
    {
      label: 'Attestation de stage / travail / diplôme',
      name: 'doc_attestation_stage_travail',
    },
    { label: 'Business Plan ', name: 'doc_bp' },
    { label: 'Fiche de presence', name: 'doc_fiche_de_presence' },
  ]

  return (
    <div className="mt-6">
      <form
        method="post"
        onSubmit={e => {
          e.preventDefault()
          setIsLoading(true)
          fetch('/api/upload', {
            method: 'POST',
            body: new FormData(e.currentTarget),
          })
            .then(() => {
              setIsLoading(false)
              Swal.fire({
                icon: 'success',
                html: `
              <p>Fichier modifié avec succès</p>
              <p>Appuyez sur le bouton pour continuer</p>
              <button class="p-4 bg-green-400 rounded-lg mt-6 text-underline text-white" onclick="window.location.href='/associe/pdp/update/${pdp?.id}'">
                  Aller à la page de mise à jour
                </button>
              `,
                showConfirmButton: false,
                allowOutsideClick: false,
              })
            })
            .catch(() => {
              Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Une erreur est survenue',
                showConfirmButton: false,
              })
            })
        }}
      >
        <div className="grid grid-cols-2 gap-6 gap-y-10">
          <input
            type="hidden"
            name="pdp_name"
            value={`${pdp.id}-${pdp.nom}-${pdp.prenom}`}
          />
          <input type="hidden" name="pdp_id" value={pdp.id} />

          {inputs.map(e => (
            <div key={e.name} className="flex flex-col">
              <label className="mb-2 font-semibold">{e.label}</label>
              <input
                type="file"
                className={inputFileClass}
                name={e.name}
                accept=".pdf"
                required
              />
            </div>
          ))}
        </div>
        <button
          className="mt-6 flex items-center gap-2 rounded-lg bg-blue-500 p-4 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
          type="submit"
          disabled={isLoading}
        >
          {isLoading && (
            <div role="status">
              <svg
                aria-hidden="true"
                className="h-6 w-6 animate-spin fill-blue-600 text-white"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}
          Valider
        </button>
      </form>
    </div>
  )
}

export default ValidatePdpForm
