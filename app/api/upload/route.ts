import { addFiles } from '@/utils/pdp'
import { s3Client } from '@/utils/s3Client'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { File } from 'buffer'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const form = await req.formData()
    const pdp = form.get('pdp_name')
    const pdpId = form.get('pdp_id')

    const files = [
      { file: form.get('doc_cin'), type: 'doc_cin' },
      { file: form.get('doc_cv'), type: 'doc_cv' },
      { file: form.get('doc_forme_juridique'), type: 'doc_forme_juridique' },
      { file: form.get('doc_contrat_de_bail'), type: 'doc_contrat_de_bail' },
      { file: form.get('doc_devis'), type: 'doc_devis' },
      { file: form.get('doc_attestation_rib'), type: 'doc_attestation_rib' },
      {
        file: form.get('doc_attestation_stage_travail'),
        type: 'doc_attestation_stage_travail',
      },
      { file: form.get('doc_bp'), type: 'doc_bp' },
      {
        file: form.get('doc_fiche_de_presence'),
        type: 'doc_fiche_de_presence',
      },
    ]

    const uploadedFiles = await Promise.all(
      files.map(async ({ file, type }) => {
        if (!file) return { success: false }

        const isFile = file instanceof File

        if (!isFile) return { success: false }

        const buffer = await file.arrayBuffer()

        const name = `${pdp}/${Date.now()}-${file.name}`

        const data = await s3Client.send(
          new PutObjectCommand({
            Bucket: process.env.SPACES_NAME,
            Key: name,
            Body: Buffer.from(buffer),
            ACL: 'public-read',
            ContentType: 'application/pdf',
          }),
        )

        return { [type]: name }
      }),
    )

    await addFiles(pdpId, uploadedFiles)

    return NextResponse.json({ message: 'success' })
  } catch (reason) {
    console.log(reason)
    return NextResponse.json({ message: 'failure' })
  }
}
