import type { CookieOptions } from "@supabase/ssr";

/**
 * Cookie sesi browser: tanpa maxAge/expires supaya hilang saat browser ditutup.
 * Capaian tetap di server (Supabase), bukan di cookie.
 */
export function opsiCookieSesiBrowser(options?: CookieOptions): CookieOptions {
  const dasar: CookieOptions = { ...(options ?? {}) };
  delete dasar.maxAge;
  delete dasar.expires;
  return {
    ...dasar,
    path: dasar.path ?? "/",
    sameSite: dasar.sameSite ?? "lax",
    httpOnly: dasar.httpOnly ?? true,
    secure: dasar.secure ?? process.env.NODE_ENV === "production",
  };
}
