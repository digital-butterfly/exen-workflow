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

export async function getAssociePdps(id: any) {
  try {
    const pdps = await prisma.associe.findUnique({
      where: { id: Number(id) },
      select: {
        PDP: true,
      },
    })
    console.log(pdps)
    return { pdps }
  } catch (error) {
    console.log(error)
  }
}

export async function createAssocie(data: any) {
  try {
    const newAssocie = await prisma.associe.create({
      data,
    })
    console.log(newAssocie)
    return { newAssocie }
  } catch (error) {
    console.log(error)
  }
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
