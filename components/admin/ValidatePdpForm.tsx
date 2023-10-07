import { inputFileClass } from '@/utils/classes'
import { addFiles } from '@/utils/pdp'
import { writeFile } from 'fs/promises'
import { join } from 'path'

const ValidatePdpForm = async ({ pdp }: any) => {
  // console.log(pdp)
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

    const actionPdp = { id: pdp.id, nom: pdp.nom }

    // Define an array of objects that represent the files to be uploaded
    const files = [
      { name: 'doc_cin', path: 'cin' },
      { name: 'doc_cv', path: 'cv' },
      { name: 'doc_forme_juridique', path: 'forme_juridique' },
      { name: 'doc_contrat_de_bail', path: 'contrat_de_bail' },
      { name: 'doc_devis', path: 'devis' },
      { name: 'doc_attestation_rib', path: 'attestation_rib' },
      { name: 'doc_diplome', path: 'diplome' },
      {
        name: 'doc_attestation_stage_travail',
        path: 'attestation_stage_travail',
      },
      { name: 'doc_bp', path: 'bp' },
      { name: 'doc_fiche_de_presence', path: 'fiche_de_presence' },
    ]

    // Use Promise.all to execute all the arrayBuffer calls in parallel
    // and create an array of objects that contain the file name, buffer, and path
    const filesData = await Promise.all(
      files.map(async file => {
        const fileData = data.get(file.name) as File | null
        if (!fileData) return null
        const buffer = await fileData.arrayBuffer()
        const name = `${Date.now()}-${pdp.nom}-${fileData.name}`
          .replace(/[^a-zA-Z0-9.]/g, '-')
          .replace(/-{2,}/g, '-')
        const path = join(process.cwd(), 'public', 'uploads', name)
        return { name, buffer, path }
      }),
    )

    // Use a for...of loop to iterate over the filesData array and write each file to disk
    for (const fileData of filesData) {
      if (!fileData) continue
      await writeFile(fileData.path, Buffer.from(fileData.buffer))
    }

    // Create an object that maps the file path to the file name
    const filesNames = Object.fromEntries(
      filesData.map((fileData, i) => [files[i].name, fileData?.name]),
    )

    // Call the addFiles function to add the file names to the pdp object
    console.log(filesNames)
    await addFiles(actionPdp.id, filesNames)
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
