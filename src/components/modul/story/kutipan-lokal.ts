/**
 * Kutipan buku resmi TIDAK disimpan di repo (hak cipta; repo publik).
 * Teksnya ada di sumber/kutipan.json (di luar git) dan hanya dimuat oleh skrip uji lewat scripts/muat-kutipan-lokal.mjs.
 * Di aplikasi (peramban) fungsi ini selalu mengembalikan daftar kosong; mesin Story tidak memakai kutipan.
 */
export const kutipanLokal = (kunci: string): string[] => {
  const tabel = (globalThis as { __kutipanLokal?: Record<string, string[]> }).__kutipanLokal;
  return tabel?.[kunci] ?? [];
};
