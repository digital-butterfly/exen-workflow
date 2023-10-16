import { ReturnButtonClass } from '@/utils/classes'
import { getPdpById, updateFile } from '@/utils/pdp'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { unlink } from 'fs'
import { writeFile } from 'fs/promises'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { join } from 'path'
import Swal from 'sweetalert2'

const UpdateFilePage = async ({ params }: any) => {
  let [id, fileType, fileName] = params.data
  fileName = decodeURIComponent(fileName)
  const { pdp } = await getPdpById(id)

  async function update(data: FormData) {
    'use server'

    const newFile: File | null = data.get(fileType) as File

    const oldFile = pdp[fileType]

    if (newFile.name != 'undefined') {
      const newFileBytes = await newFile.arrayBuffer()
      const newFileBuffer = Buffer.from(newFileBytes)

      const newFileName = `${Date.now()}-${pdp?.nom}-${newFile.name}`
      const newFilePath = join(process.cwd(), 'public', 'uploads', newFileName)

      await writeFile(newFilePath, newFileBuffer).then(() => {
        unlink(join(process.cwd(), 'public', 'uploads', oldFile), err => {
          if (err) {
            console.error(err)
            return
          }
          //file removed
        })
      })

      const fileName = { [fileType]: newFileName }

      await updateFile(pdp?.id, fileName)

      Swal.fire({
        icon: 'success',
        title: 'Fichier modifié',
        showConfirmButton: false,
        timer: 1500,
      })

      redirect(`/associe/pdp/update/${id}`)
    } else {
      console.log('no file')
    }
  }

  return (
    <div>
      <Link className={ReturnButtonClass} href={`/admin/pdp/update/${id}`}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="mr-2"
          style={{ width: '1em', display: 'inline' }}
        />
        Retour
      </Link>
      <h1 className="mb-6 mt-10 text-3xl">Changer fichier {fileName} </h1>

      <form action={update}>
        <div className="flex w-full items-center justify-center">
          <label className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">
                  Clicker ici pour modifier {fileName}
                </span>
              </p>
              <p className="text-xs text-red-500 dark:text-gray-400">
                Seulement PDF
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              name={fileType}
              accept="application/pdf"
              className="hidden"
            />
          </label>
        </div>

        <button
          className="mt-4 rounded-lg bg-blue-500 p-4 text-white hover:bg-blue-600"
          type="submit"
        >
          Modifier
        </button>
      </form>
    </div>
  )
}

export default UpdateFilePage
