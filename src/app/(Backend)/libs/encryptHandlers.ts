import * as argon from 'argon2';

export async function hashPassword(rawPassword:string) {
  return await argon.hash(rawPassword);
}

export async function verifyPassword(rawPassword:string, hashedPasword:string) {
  return await argon.verify(hashedPasword, rawPassword);
}
