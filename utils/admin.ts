import { prisma } from './db'

export const getAdminByEmail = async (email: string) => {
  const admin = await prisma.admin.findUnique({
    where: {
      email: email,
    },
  })
  return admin
}

export const getAdmin = async () => {
  const admin = await prisma.admin.findUnique({
    where: {
      id: 1,
    },
  })
  return admin
}

export const updateAdmin = async (id: number, data: any) => {
  try {
    const admin = await prisma.admin.update({
      where: {
        id: id,
      },
      data: data,
    })
    return admin
  } catch (error) {
    console.error(error)
  }
}

export const resetAdminPassword = async (id: number, password: any) => {
  try {
    const admin = await prisma.admin.update({
      where: {
        id: id,
      },
      data: {
        password: password,
      },
    })
    return admin
  } catch (error) {
    console.error(error)
  }
}
