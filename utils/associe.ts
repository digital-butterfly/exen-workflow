import { prisma } from './db'

export async function getAssocies() {
  try {
    const associes = await prisma.associe.findMany({
      orderBy: [{ id: 'asc' }],
    })
    return { associes }
  } catch (error) {
    console.log(error)
  }
}

export async function getAssocieById(id: any) {
  try {
    const associe = await prisma.associe.findUnique({
      where: { id: Number(id) },
    })
    return { associe }
  } catch (error) {
    console.log(error)
  }
}

export async function getAssocieByEmail(email: string) {
  try {
    const associe = await prisma.associe.findUnique({
      where: { email: email },
    })
    return associe
  } catch (error) {
    console.log(error)
  }
}

export async function getAssociePdps(id: any) {
  try {
    const pdps = await prisma.associe.findUnique({
      where: { id: Number(id) },
      select: {
        PDP: true,
      },
    })
    return { pdps }
  } catch (error) {
    console.log(error)
  }
}

export async function getAssociePdpsByEmail(email: string) {
  try {
    const pdps = await prisma.associe.findUnique({
      where: { email: email },
      select: {
        PDP: true,
      },
    })
    return pdps
  } catch (error) {
    console.log(error)
  }
}

export async function createAssocie(data: any) {
  // formate date
  data.date_debut = new Date(data.date_debut)
  const newAssocie = await prisma.associe.create({
    data: {
      ...data,
      delai: parseInt(data.delai),
    },
  })
  return { newAssocie }
}

export async function updateAssocie(id: any, data: any) {
  try {
    const associe = await prisma.associe.update({
      where: { id: Number(id) },
      data,
    })
    console.log(associe)
    return { associe }
  } catch (error) {
    console.log(error)
  }
}

export async function deleteAssocie(id: any) {
  try {
    const associe = await prisma.associe.delete({
      where: { id: Number(id) },
    })
    return { associe }
  } catch (error) {
    console.log(error)
  }
}
