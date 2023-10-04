import { prisma } from './db'

export async function getPdp() {
  try {
    const pdp = await prisma.pdp.findMany({
      orderBy: [{ id: 'asc' }],
    })
    return { pdp }
  } catch (error) {
    console.log(error)
    return { error: 'An error occurred while fetching PDPs.' }
  }
}

export async function getPdpById(id: any) {
  try {
    const pdp = await prisma.pdp.findUnique({
      where: { id: parseInt(id) },
    })
    return { pdp }
  } catch (error) {
    console.log(error)
    return { error }
  }
}

export async function createPdp(pdp: any) {
  // turn pdp irchad_id into number
  pdp.irchad_id = parseInt(pdp.irchad_id)

  // turn date_naissance & date_form-juridique into date
  pdp.date_naissance = new Date(pdp.date_naissance)
  pdp.date_form_juridique = new Date(pdp.date_form_juridique)

  try {
    const newPdp = await prisma.pdp.create({
      data: {
        ...pdp,
      },
    })
    // add created by
    return { newPdp }
  } catch (error) {
    console.log(error)
    return { error: 'An error occurred while creating the PDP.' }
  }
}

export async function updatePdp(id: any, pdp: any) {
  try {
    const updatedPdp = await prisma.pdp.update({
      where: { id: parseInt(id) },
      data: {
        ...pdp,
      },
    })
    return { updatedPdp }
  } catch (error) {
    console.log(error)
    return { error }
  }
}

export async function deletePdp(id: any) {
  try {
    const deletedPdp = await prisma.pdp.delete({
      where: { id: parseInt(id) },
    })
    return { deletedPdp }
  } catch (error) {
    console.log(error)
    return { error }
  }
}
