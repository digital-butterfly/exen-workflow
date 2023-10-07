import { faFile, faFilePdf } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ShowFiles = ({ id, pdp }: any) => {
  const files = [
    { name: 'CIN', path: pdp.doc_cin },
    { name: 'CV', path: pdp.doc_cv },
    { name: 'Form Juridique', path: pdp.doc_forme_juridique },
    { name: 'Contrat de bail', path: pdp.doc_contrat_de_bail },
    { name: 'Devis', path: pdp.doc_devis },
    { name: 'Attestation de RIB', path: pdp.doc_attestation_rib },
    { name: 'Diplôme', path: pdp.doc_diplome },
    {
      name: 'Attestation Stage/Travail',
      path: pdp.doc_attestation_stage_travail,
    },
    { name: 'Business Plan', path: pdp.doc_bp },
    { name: 'Fiche de présence', path: pdp.doc_fiche_de_presence },
  ]
  return (
    <div>
      <h1 className="text-2xl">Fichiers</h1>

      <div className="mt-6 grid grid-cols-2 gap-6">
        {files.map(e => (
          <a
            key={e.name}
            href={`/uploads/${e.path}`}
            className="block rounded border border-slate-400 p-4"
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faFilePdf}
              className="mr-3 text-lg"
              style={{ width: '1.5rem', display: 'inline' }}
            />
            {e.name}
          </a>
        ))}
      </div>
    </div>
  )
}

export default ShowFiles
