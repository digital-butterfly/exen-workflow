import { prisma } from './db'

export async function getApprobateurs() {
  try {
    const approbateurs = await prisma.approbateur.findMany({
      orderBy: [{ id: 'asc' }],
    })
    console.log(approbateurs)
    return { approbateurs }
  } catch (error) {
    console.log(error)
  }
}

export async function getApprobateurById(id: any) {
  try {
    const approbateur = await prisma.approbateur.findUnique({
      where: { id: Number(id) },
    })
    return { approbateur }
  } catch (error) {
    console.log(error)
  }
}

export async function getApprobateurByIdWithPdp(id: any) {
  try {
    const approbateur = await prisma.approbateur.findUnique({
      where: { id: Number(id) },
      include: {
        PDP: true,
      },
    })
    return { approbateur }
  } catch (error) {
    console.log(error)
  }
}

export async function createApprobateur(data: any) {
  try {
    const newApprobateur = await prisma.approbateur.create({
      data,
    })
    return { newApprobateur }
  } catch (error) {
    console.log(error)
  }
}

export async function updateApprobateur(id: any, data: any) {
  try {
    const approbateur = await prisma.approbateur.update({
      where: { id: Number(id) },
      data,
    })
    return { approbateur }
  } catch (error) {
    console.log(error)
  }
}
