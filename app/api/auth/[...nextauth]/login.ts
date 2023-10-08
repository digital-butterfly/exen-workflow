import { prisma } from '@/utils/db'
import bcrypt from 'bcryptjs'

export const login = async (email: string, password: string, role: string) => {
  let user
  console.log({ email, password, role })

  if (role == 'admin') {
    user = await prisma.admin.findUniqueOrThrow({
      where: {
        email,
      },
    })
  }
  if (role == 'approbateur') {
    console.log('approbateur')
    user = await prisma.approbateur.findUnique({
      where: {
        email,
      },
    })
    console.log(user)
  }
  if (role == 'associe') {
    user = await prisma.associe.findUnique({
      where: {
        email,
      },
    })
  }

  if (!user) {
    return null
  }

  const isValidPassword = await bcrypt.compare(password, user.password)

  if (!isValidPassword) {
    return null
  }

  return {
    email: user.email,
    name: `${user.nom} ${user.prenom}`,
    role,
  }
}
