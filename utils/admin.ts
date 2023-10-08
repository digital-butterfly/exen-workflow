import { prisma } from './db'

export const getAdminByEmail = async (email: string) => {
  const admin = await prisma.admin.findUnique({
    where: {
      email: email,
    },
  })
  return admin
}
