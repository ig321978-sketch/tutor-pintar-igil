export const TINGKAT_PERLAMBAT = [1, 2, 3] as const;
export type TingkatPerlambat = (typeof TINGKAT_PERLAMBAT)[number];

export const KUNCI_PERLAMBAT_VOICE = "igil-perlambat-voice-v1";

export function normalisasiTingkatPerlambat(nilai: unknown): TingkatPerlambat {
  const angka = Number(nilai);
  if (angka === 2 || angka === 3) return angka;
  return 1;
}

export function lajuPutarDariPerlambat(tingkat: TingkatPerlambat): number {
  return 1 / tingkat;
}

export function bacaPerlambatVoice(): TingkatPerlambat {
  if (typeof window === "undefined") return 1;
  try {
    return normalisasiTingkatPerlambat(
      window.localStorage.getItem(KUNCI_PERLAMBAT_VOICE),
    );
  } catch {
    return 1;
  }
}

export function simpanPerlambatVoice(tingkat: TingkatPerlambat): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KUNCI_PERLAMBAT_VOICE, String(tingkat));
  } catch {
    // abaikan kuota / mode privat
  }
}
