/**
 * Siapa yang boleh menuliskan ulang cache naskah modul.
 *
 * - Composer / skrip kunci naskah: boleh memperbarui cache.
 * - Studio Kreator di dashboard admin: boleh memperbarui cache.
 * - Generate di situs publik (/tutor, /api/tutor, /api/modul tanpa admin):
 *   hanya memakai cache yang sudah ada, tidak menimpa atau menambah baris.
 */
export const SUMBER_TULIS_CACHE_NASKAH = {
  publik: "publik",
  admin: "admin",
  composer: "composer",
} as const;

export type SumberTulisCacheNaskah =
  (typeof SUMBER_TULIS_CACHE_NASKAH)[keyof typeof SUMBER_TULIS_CACHE_NASKAH];

export type OpsiTulisCacheNaskah = {
  tulisCache?: boolean;
  sumber?: SumberTulisCacheNaskah;
};

export const OPSI_TULIS_CACHE_COMPOSER: OpsiTulisCacheNaskah = {
  tulisCache: true,
  sumber: SUMBER_TULIS_CACHE_NASKAH.composer,
};

export const OPSI_TULIS_CACHE_ADMIN: OpsiTulisCacheNaskah = {
  tulisCache: true,
  sumber: SUMBER_TULIS_CACHE_NASKAH.admin,
};

export const OPSI_TULIS_CACHE_PUBLIK: OpsiTulisCacheNaskah = {
  tulisCache: false,
  sumber: SUMBER_TULIS_CACHE_NASKAH.publik,
};

export function bolehPerbaruiCacheNaskah(
  opsi: OpsiTulisCacheNaskah = {},
): boolean {
  if (opsi.tulisCache === false || opsi.sumber === SUMBER_TULIS_CACHE_NASKAH.publik) {
    return false;
  }
  if (opsi.tulisCache === true) return true;
  if (
    opsi.sumber === SUMBER_TULIS_CACHE_NASKAH.admin ||
    opsi.sumber === SUMBER_TULIS_CACHE_NASKAH.composer
  ) {
    return true;
  }
  // Pemanggilan langsung (skrip Composer / admin) tanpa flag: tetap boleh menulis.
  return true;
}
