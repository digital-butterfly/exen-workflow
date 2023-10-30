import { updateFile } from '@/utils/pdp'
import { s3Client } from '@/utils/s3Client'
import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { File } from 'buffer'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const form = await req.formData()
    const pdp = form.get('pdp-name')
    const id = form.get('pdp-id')
    const fileType: any = form.get('file-type')
    const oldFile: any = form.get('old-file')
    const file: any = form.get('file-input')

    /** Add New File */
    const fileName = `${pdp}/${Date.now()}-${file?.name}`

    if (!file) return NextResponse.json({ message: 'failure' })

    const isFile = file instanceof File

    if (!isFile) return NextResponse.json({ message: 'failure' })

    const buffer = await file.arrayBuffer()

    const data = await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.SPACES_NAME,
        Key: fileName,
        Body: Buffer.from(buffer),
        ACL: 'public-read',
        ContentType: 'application/pdf',
      }),
    )

    /**Add it to database */
    await updateFile(id, { [fileType]: fileName })

    /** Delete Old File */
    if (oldFile) {
      await s3Client.send(
        new DeleteObjectCommand({
          Bucket: process.env.SPACES_NAME,
          Key: oldFile,
        }),
      )
    }

    return NextResponse.json({ message: 'success' })
  } catch (reason) {
    console.log(reason)
    return NextResponse.json({ message: 'failure' })
  }
}
