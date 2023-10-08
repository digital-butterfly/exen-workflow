'use server'

import {
  createApprobateur,
  deleteApprobateur,
  getApprobateurs,
  updateApprobateur,
} from '@/utils/approbateur'
import { createPdp, deletePdp, updatePdp } from '@/utils/pdp'
import { unlink } from 'fs'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { join } from 'path'
import bcryptjs from 'bcryptjs'

// pdp
export async function createPdpAction(id: any, pdp: any, role: any) {
  await createPdp(id, pdp, role)
  // add here revalidatePath('/path') if needed
  revalidatePath('/admin/pdp')
}

export async function updatePdpAction(id: any, pdp: any) {
  await updatePdp(id, pdp)

  console.log(`/admin/pdp/${id}`)
  revalidatePath(`/admin/pdp/${id}`)
}

export async function deletePdpAction(id: any, pdp: any) {
  await deletePdp(id)

  if (pdp?.doc_cin) {
    unlink(join(process.cwd(), 'public', 'uploads', pdp?.doc_cin), err => {
      if (err) {
        console.error(err)
        return
      }
    })
  }

  if (pdp?.doc_cv) {
    unlink(join(process.cwd(), 'public', 'uploads', pdp?.doc_cv), err => {
      if (err) {
        console.error(err)
        return
      }
    })
  }

  if (pdp?.doc_forme_juridique) {
    unlink(
      join(process.cwd(), 'public', 'uploads', pdp?.doc_form_juridique),
      err => {
        if (err) {
          console.error(err)
          return
        }
      },
    )
  }

  if (pdp?.doc_contrat_de_bail) {
    unlink(
      join(process.cwd(), 'public', 'uploads', pdp?.contrat_de_bail),
      err => {
        if (err) {
          console.error(err)
          return
        }
      },
    )
  }

  if (pdp?.doc_devis) {
    unlink(join(process.cwd(), 'public', 'uploads', pdp?.doc_devis), err => {
      if (err) {
        console.error(err)
        return
      }
    })
  }

  if (pdp?.doc_attestation_rib) {
    unlink(
      join(process.cwd(), 'public', 'uploads', pdp?.doc_attestation_rib),
      err => {
        if (err) {
          console.error(err)
          return
        }
      },
    )
  }

  if (pdp?.doc_diplome) {
    unlink(join(process.cwd(), 'public', 'uploads', pdp?.doc_diplome), err => {
      if (err) {
        console.error(err)
        return
      }
    })
  }

  if (pdp?.doc_attestation_stage_travail) {
    unlink(
      join(
        process.cwd(),
        'public',
        'uploads',
        pdp?.doc_attestation_stage_travail,
      ),
      err => {
        if (err) {
          console.error(err)
          return
        }
      },
    )
  }

  if (pdp?.doc_bp) {
    unlink(join(process.cwd(), 'public', 'uploads', pdp?.doc_bp), err => {
      if (err) {
        console.error(err)
        return
      }
    })
  }

  if (pdp?.doc_fiche_de_presence) {
    unlink(
      join(process.cwd(), 'public', 'uploads', pdp?.doc_fiche_de_presence),
      err => {
        if (err) {
          console.error(err)
          return
        }
      },
    )
  }

  // redirect to /admin/pdp
  redirect('/admin/pdp')
}

// approbateur

export async function createApprobateurAction(approbateur: any) {
  // encrypt password
  approbateur.password = await bcryptjs.hash(approbateur.password, 10)
  const test = await createApprobateur(approbateur)

  revalidatePath('/admin/approbateurs')
}

export async function updateApprobateurAction(id: any, approbateur: any) {
  await updateApprobateur(id, approbateur)

  revalidatePath(`/admin/approbateurs/${id}`)
}

export async function deleteApprobateurAction(id: any) {
  // delete approbateur
  deleteApprobateur(id)
  // redirect to /admin/approbateurs
  redirect('/admin/approbateurs')
}
