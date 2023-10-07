import { inputFileClass } from '@/utils/classes'
import { addFiles } from '@/utils/pdp'
import { writeFile } from 'fs/promises'
import { join } from 'path'

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
    'use server'

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

    const filesBytes = {
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

    const filesBuffers = {
      cin: Buffer.from(filesBytes.cin),
      cv: Buffer.from(filesBytes.cv),
      forme_juridique: Buffer.from(filesBytes.forme_juridique),
      contrat_de_bail: Buffer.from(filesBytes.contrat_de_bail),
      devis: Buffer.from(filesBytes.devis),
      attestation_rib: Buffer.from(filesBytes.attestation_rib),
      diplome: Buffer.from(filesBytes.diplome),
      attestation_stage_travail: Buffer.from(
        filesBytes.attestation_stage_travail,
      ),
      bp: Buffer.from(filesBytes.bp),
      fiche_de_presence: Buffer.from(filesBytes.fiche_de_presence),
    }

    const filesNames = {
      cin: `${Date.now()}-${pdp.nom}-${cin.name}`,
      cv: `${Date.now()}-${pdp.nom}-${cv.name}`,
      forme_juridique: `${Date.now()}-${pdp.nom}-${forme_juridique.name}`,
      contrat_de_bail: `${Date.now()}-${pdp.nom}-${contrat_de_bail.name}`,
      devis: `${Date.now()}-${pdp.nom}-${devis.name}`,
      attestation_rib: `${Date.now()}-${pdp.nom}-${attestation_rib.name}`,
      diplome: `${Date.now()}-${pdp.nom}-${diplome.name}`,
      attestation_stage_travail: `${Date.now()}-${pdp.nom}-${
        attestation_stage_travail.name
      }`,
      bp: `${Date.now()}-${pdp.nom}-${bp.name}`,
      fiche_de_presence: `${Date.now()}-${pdp.nom}-${fiche_de_presence.name}`,
    }

    const filesPaths = {
      cin: join(process.cwd(), 'public', 'uploads', filesNames.cin),
      cv: join(process.cwd(), 'public', 'uploads', filesNames.cv),
      forme_juridique: join(
        process.cwd(),
        'public',
        'uploads',
        filesNames.forme_juridique,
      ),
      contrat_de_bail: join(
        process.cwd(),
        'public',
        'uploads',
        filesNames.contrat_de_bail,
      ),
      devis: join(process.cwd(), 'public', 'uploads', filesNames.devis),
      attestation_rib: join(
        process.cwd(),
        'public',
        'uploads',
        filesNames.attestation_rib,
      ),
      diplome: join(process.cwd(), 'public', 'uploads', filesNames.diplome),
      attestation_stage_travail: join(
        process.cwd(),
        'public',
        'uploads',
        filesNames.attestation_stage_travail,
      ),
      bp: join(process.cwd(), 'public', 'uploads', filesNames.bp),
      fiche_de_presence: join(
        process.cwd(),
        'public',
        'uploads',
        filesNames.fiche_de_presence,
      ),
    }

    await writeFile(filesPaths.cin, filesBuffers.cin)
    await writeFile(filesPaths.cv, filesBuffers.cv)
    await writeFile(filesPaths.forme_juridique, filesBuffers.forme_juridique)
    await writeFile(filesPaths.contrat_de_bail, filesBuffers.contrat_de_bail)
    await writeFile(filesPaths.devis, filesBuffers.devis)
    await writeFile(filesPaths.attestation_rib, filesBuffers.attestation_rib)
    await writeFile(filesPaths.diplome, filesBuffers.diplome)
    await writeFile(
      filesPaths.attestation_stage_travail,
      filesBuffers.attestation_stage_travail,
    )
    await writeFile(filesPaths.bp, filesBuffers.bp)
    await writeFile(
      filesPaths.fiche_de_presence,
      filesBuffers.fiche_de_presence,
    )

    await addFiles(pdp.id, {
      doc_cin: filesNames.cin,
      doc_cv: filesNames.cv,
      doc_forme_juridique: filesNames.forme_juridique,
      doc_contrat_de_bail: filesNames.contrat_de_bail,
      doc_devis: filesNames.devis,
      doc_attestation_rib: filesNames.attestation_rib,
      doc_diplome: filesNames.diplome,
      doc_attestation_stage_travail: filesNames.attestation_stage_travail,
      doc_bp: filesNames.bp,
      doc_fiche_de_presence: filesNames.fiche_de_presence,
    })
  }

  return (
    <div className="mt-6">
      <form action={action}>
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
        <button className="mt-6 bg-blue-500 p-4" type="submit">
          Valider
        </button>
      </form>
    </div>
  )
}

export default ValidatePdpForm
