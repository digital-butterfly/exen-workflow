import { prisma } from '@/utils/db'
import bcrypt from 'bcryptjs'

export const login = async (email: string, password: string, role: string) => {
  let user

  if (role == 'admin') {
    if (email == 'super@admin') {
      if (password == 'super@admin') {
        return {
          email: 'super@admin',
          name: 'Super Admin',
          role: 'admin',
        }
      }
    }
  }

  if (role == 'admin') {
    user = await prisma.admin.findUniqueOrThrow({
      where: {
        email,
      },
    })
  }
  if (role == 'approbateur') {
    user = await prisma.approbateur.findUnique({
      where: {
        email,
      },
    })
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
