'use client'

import { faFilePdf } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'flowbite-react'
import Link from 'next/link'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const ShowFiles = ({ id, pdp, isApprobateur = false }: any) => {
  const files = [
    { name: 'CIN', path: pdp?.doc_cin, key: 'doc_cin' },
    { name: 'CV', path: pdp?.doc_cv, key: 'doc_cv' },
    {
      name: 'Form Juridique',
      path: pdp?.doc_forme_juridique,
      key: 'doc_forme_juridique',
    },
    {
      name: 'Contrat de bail',
      path: pdp?.doc_contrat_de_bail,
      key: 'doc_contrat_de_bail',
    },
    { name: 'Devis', path: pdp?.doc_devis, key: 'doc_devis' },
    {
      name: 'Attestation de RIB',
      path: pdp?.doc_attestation_rib,
      key: 'doc_attestation_rib',
    },
    // { name: 'Diplôme', path: pdp?.doc_diplome, key: 'doc_diplome' },
    {
      name: 'Attestation Stage/Travail/Diplôme',
      path: pdp?.doc_attestation_stage_travail,
      key: 'doc_attestation_stage_travail',
    },
    { name: 'Business Plan', path: pdp?.doc_bp, key: 'doc_bp' },
    {
      name: 'Fiche de présence',
      path: pdp?.doc_fiche_de_presence,
      key: 'doc_fiche_de_presence',
    },
  ]

  const MySwal = withReactContent(Swal)

  const handleClick = (e: any) => {
    MySwal.fire({
      title: <strong>{e.name}</strong>,
      showCloseButton: true,
      showConfirmButton: false,
      html: (
        <div className="flex justify-center gap-4">
          <Button onClick={() => showFile(e.path)}>Voir document</Button>
          {!isApprobateur && (
            <Button>
              <Link href={`../validate/update/${id}/${e.key}/${e.name}`}>
                Changer document
              </Link>
            </Button>
          )}
        </div>
      ),
      icon: 'question',
    })
  }

  const showFile = (path: any) => {
    MySwal.fire({
      showCloseButton: true,
      showConfirmButton: false,
      html: (
        <div className="flex justify-center gap-4">
          <iframe src={`/uploads/${path}`} width="100%" height="500px"></iframe>
        </div>
      ),
    })
  }

  return (
    <div className="mt-10">
      <h1 className="text-2xl">Fichiers</h1>

      <div className="mt-6 grid grid-cols-5 gap-6">
        {files.map(e => (
          <button
            onClick={() => handleClick(e)}
            key={e.name}
            // href={`/uploads/${e.path}`}
            className="flex flex-col items-center rounded-2xl border border-slate-400 p-4"
            // target="_blank"
          >
            <FontAwesomeIcon
              icon={faFilePdf}
              className="mb-3 text-5xl"
              style={{ width: '3rem', display: 'inline' }}
            />
            {e.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ShowFiles
