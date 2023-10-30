'use server'

import {
  createApprobateur,
  deleteApprobateur,
  updateApprobateur,
} from '@/utils/approbateur'
import {
  createPdp,
  deletePdp,
  refusePdp,
  updatePdp,
  validatePdp,
} from '@/utils/pdp'
import { unlink } from 'fs'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { join } from 'path'
import bcryptjs from 'bcryptjs'
import { createAssocie, deleteAssocie, updateAssocie } from '@/utils/associe'
import { createAdmin, resetAdminPassword, updateAdmin } from '@/utils/admin'

// pdp
export async function createPdpAction(id: any, pdp: any, role: any) {
  await createPdp(id, pdp, role)
  // add here revalidatePath('/path') if needed
  revalidatePath('/admin/pdp')
}

export async function updatePdpAction(id: any, pdp: any) {
  const result = await updatePdp(id, pdp)
  revalidatePath(`/admin/pdp/${id}`)
  return result
}

export async function deletePdpAction(id: any, pdp: any) {
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
      join(process.cwd(), 'public', 'uploads', pdp?.doc_forme_juridique),
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
      join(process.cwd(), 'public', 'uploads', pdp?.doc_contrat_de_bail),
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

  await deletePdp(id)
  // redirect to /admin/pdp
  redirect('..')
}

// approbateur

export async function createApprobateurAction(approbateur: any) {
  // encrypt password
  approbateur.password = await bcryptjs.hash(approbateur.password, 10)
  const test = await createApprobateur(approbateur)

  revalidatePath('/admin/approbateurs')
}

export async function updateApprobateurAction(id: any, approbateur: any) {
  if (approbateur.password) {
    // encrypt password
    approbateur.password = await bcryptjs.hash(approbateur.password, 10)
  }
  await updateApprobateur(id, approbateur)

  revalidatePath(`/admin/approbateurs/${id}`)
}

export async function deleteApprobateurAction(id: any) {
  // delete approbateur
  deleteApprobateur(id)
  // redirect to /admin/approbateurs
  redirect('/admin/approbateurs')
}

export async function validatePdpAction(id: any, approbateurId: any) {
  await validatePdp(id, approbateurId)
  revalidatePath(`/approbateur/pdp/${id}`)
}

export async function refusePdpAction(
  id: any,
  message: any,
  approbateurId: any,
) {
  await refusePdp(id, message, approbateurId)
  revalidatePath(`/approbateur/pdp/${id}`)
}

// associe
export async function createAssocieAction(associe: any) {
  // format data
  associe.delai = parseInt(associe.delai)
  associe.date_debut = new Date(associe.date_debut)
  // encrypt password
  associe.password = await bcryptjs.hash(associe.password, 10)
  const test = await createAssocie(associe)

  revalidatePath('/admin/associes')
  return test
}

export async function deleteAssocieAction(id: any) {
  // delete Associe
  deleteAssocie(id)
  // redirect to /admin/Associes
  redirect('/admin/associes')
}

export async function updateAssocieAction(id: any, associe: any) {
  // format data
  if (associe.delai) {
    associe.delai = parseInt(associe.delai)
  }
  if (associe.date_debut) {
    associe.date_debut = new Date(associe.date_debut)
  }
  // encrypt password
  if (associe.password) {
    associe.password = await bcryptjs.hash(associe.password, 10)
  }

  const newAssocie = await updateAssocie(id, associe)

  // revalidatePath(`/admin/associes/${id}`)
  return newAssocie
}

// admin

export async function createAdminAction(admin: any) {
  const newAdmin = await createAdmin(admin)
  revalidatePath('/admin/admins')
  return newAdmin
}

export async function updateAdminAction(id: any, admin: any) {
  await updateAdmin(id, admin)

  revalidatePath(`/admin/settings`)
}

export async function resetAdminPasswordAction(id: any, password: any) {
  // encrypt password
  password = await bcryptjs.hash(password, 10)
  await resetAdminPassword(id, password)

  revalidatePath(`/admin/settings`)
}
