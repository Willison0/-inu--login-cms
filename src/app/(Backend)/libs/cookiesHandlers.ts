import {
  ResponseCookies,
  ResponseCookie,
} from 'next/dist/compiled/@edge-runtime/cookies';
import { checkJWT, signJWT } from './tokensHandlers';

export const accessTokenName = 'accessTokenJWT';
export const currentProductToken = 'previousMatchId';

export async function getPayloadFromCookie(cookie: ResponseCookie | undefined) {
  if (!cookie) return undefined;
  return await checkJWT(cookie.value);
}

export async function setupSessionCookie(
  CookiePayload: Object,
  cookies: ResponseCookies,
  cookieName: string = accessTokenName
) {
  const eightHoursinSeconds = 60 * 60 * 8 * 1;
  return cookies.set(cookieName, await signJWT({ ...CookiePayload }), {
    sameSite: 'strict',
    maxAge: eightHoursinSeconds,
    path: '/',
  });
}
