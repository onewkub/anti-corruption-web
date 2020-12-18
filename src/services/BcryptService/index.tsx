import bcrypt from 'bcryptjs'

const salt = bcrypt.genSaltSync(10)

export async function hashPassword(plainTextPassword: string) {
  const hash = await bcrypt.hash(plainTextPassword, salt)
  return hash
}

export async function comparePassword(plainTextPassword: string, hash: string) {
  const rlt = await bcrypt.compare(plainTextPassword, hash)
  return rlt
}
