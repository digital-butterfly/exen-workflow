'use server'

import { createPdp, deletePdp, updatePdp } from '@/utils/pdp'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPdpAction(pdp: any) {
  await createPdp(pdp)
  // add here revalidatePath('/path') if needed
  revalidatePath('/admin/pdp')
}

export async function updatePdpAction(id: any, pdp: any) {
  await updatePdp(id, pdp)

  console.log(`/admin/pdp/${id}`)
  revalidatePath(`/admin/pdp/${id}`)
}

export async function deletePdpAction(id: any) {
  await deletePdp(id)

  // redirect to /admin/pdp
  redirect('/admin/pdp')
}
