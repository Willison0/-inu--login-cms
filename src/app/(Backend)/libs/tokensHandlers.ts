//@ts-check
import * as jose from 'jose';

/**
 *  - Encrypt's secret
 */
const salt = new TextEncoder().encode(process.env.SALT);

export async function signJWT(payload: jose.JWTPayload) {
  const alg = 'HS256';
  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(salt);

  return jwt;
}

export async function checkJWT(jwt: string) {
  try {
    let jwtValue = await jose.jwtVerify(jwt, salt);
    return jwtValue;
  } catch {
    return undefined;
  }
}
