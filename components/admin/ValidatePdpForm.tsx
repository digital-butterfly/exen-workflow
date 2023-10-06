import { inputFileClass } from '@/utils/classes'

const ValidatePdpForm = async ({ pdp }: any) => {
  const inputs = [
    { label: 'CIN', name: 'doc_cin' },
    { label: 'Cv', name: 'doc_cv' },
    { label: 'Form Juridique', name: 'doc_forme_juridique' },
    { label: 'Contrat de bail', name: 'doc_contrat_de_bail' },
    { label: 'Devis', name: 'doc_devis' },
    { label: 'Attestation de RIB', name: 'doc_attestation_rib' },
    { label: 'Diplôme', name: 'doc_diplome' },
    {
      label: 'Attestation de stage / travail',
      name: 'doc_attestation_stage_travail',
    },
    { label: 'Business Plan ', name: 'doc_bp' },
    { label: 'Fiche de presence', name: 'doc_fiche_de_presence' },
  ]

  async function action(data: FormData) {
    const cin: File | null = data.get('doc_cin') as File
    const cv: File | null = data.get('doc_cv') as File
    const forme_juridique: File | null = data.get('doc_forme_juridique') as File
    const contrat_de_bail: File | null = data.get('doc_contrat_de_bail') as File
    const devis: File | null = data.get('doc_devis') as File
    const attestation_rib: File | null = data.get('doc_attestation_rib') as File
    const diplome: File | null = data.get('doc_diplome') as File
    const attestation_stage_travail: File | null = data.get(
      'doc_attestation_stage_travail',
    ) as File
    const bp: File | null = data.get('doc_bp') as File
    const fiche_de_presence: File | null = data.get(
      'doc_fiche_de_presence',
    ) as File

    const fileBytes = {
      cin: await cin.arrayBuffer(),
      cv: await cv.arrayBuffer(),
      forme_juridique: await forme_juridique.arrayBuffer(),
      contrat_de_bail: await contrat_de_bail.arrayBuffer(),
      devis: await devis.arrayBuffer(),
      attestation_rib: await attestation_rib.arrayBuffer(),
      diplome: await diplome.arrayBuffer(),
      attestation_stage_travail: await attestation_stage_travail.arrayBuffer(),
      bp: await bp.arrayBuffer(),
      fiche_de_presence: await fiche_de_presence.arrayBuffer(),
    }

    const fileNames = {
      cin: `${pdp.id}-${pdp.nom}-${cin.name}`,
    }
  }

  return (
    <div className="mt-6">
      <form action="">
        {/* add files and change pdp state to valid */}
        <div className="grid grid-cols-2 gap-6 gap-y-10">
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
      </form>
    </div>
  )
}

export default ValidatePdpForm
