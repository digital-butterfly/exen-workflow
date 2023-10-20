import { prisma } from './db'

export const getAdmins = async () => {
  const admins = await prisma.admin.findMany()
  return admins
}

export const getAdminById = async (id: number) => {
  const admin = await prisma.admin.findUnique({
    where: {
      id: id,
    },
  })
  return admin
}

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

export const createAdmin = async (data: any) => {
  const admin = await prisma.admin.create({
    data,
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
