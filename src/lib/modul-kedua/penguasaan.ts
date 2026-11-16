import type { CatatanButir, ElemenCP, Kognitif, Level } from "./tipe";

/**
 * Indeks penguasaan. Rumus lengkap dan alasannya: naskah/modul-kedua-penilaian.md.
 *
 *  nilai butir = 0 jika salah; jika benar = faktorPercobaan x faktorPetunjuk
 *  faktorPercobaan: percobaan 1 = 1; percobaan 2 = 0,5; percobaan 3 atau lebih = 0,25
 *  faktorPetunjuk : tanpa petunjuk = 1; memakai petunjuk (berapa kali pun) = 0,75
 *  indeks = 100 x jumlah(bobotLevel x nilaiButir) / jumlah(bobotLevel)
 *  bobotLevel: Dasar 1; Mahir 1,5; Juara 2
 *
 * Waktu pengerjaan TIDAK ikut dihitung (agar adil bagi anak yang membaca lebih pelan);
 * waktu hanya dicatat sebagai data terpisah.
 */

export const AMBANG_TUNTAS = 80;
export const BOBOT_LEVEL: Record<Level, number> = { Dasar: 1, Mahir: 1.5, Juara: 2 };
const FAKTOR_PERCOBAAN = [1, 0.5, 0.25];
const FAKTOR_PETUNJUK = 0.75;

export function nilaiButir(b: Pick<CatatanButir, "benar" | "percobaan" | "petunjuk">): number {
  if (!b.benar) return 0;
  const fp = FAKTOR_PERCOBAAN[Math.min(Math.max(b.percobaan, 1), FAKTOR_PERCOBAAN.length) - 1];
  return fp * (b.petunjuk > 0 ? FAKTOR_PETUNJUK : 1);
}

export function indeks(butir: readonly CatatanButir[]): number | null {
  if (butir.length === 0) return null;
  let atas = 0;
  let bawah = 0;
  for (const b of butir) {
    const w = BOBOT_LEVEL[b.level];
    atas += w * nilaiButir(b);
    bawah += w;
  }
  return Math.round((1000 * atas) / bawah) / 10;
}

export type KelompokIndeks<K extends string> = Partial<Record<K, number>>;

function per<K extends string>(butir: readonly CatatanButir[], kunci: (b: CatatanButir) => K): KelompokIndeks<K> {
  const hasil: KelompokIndeks<K> = {};
  for (const k of new Set(butir.map(kunci))) {
    const v = indeks(butir.filter((b) => kunci(b) === k));
    if (v !== null) hasil[k] = v;
  }
  return hasil;
}

export const indeksPerElemen = (butir: readonly CatatanButir[]) => per<ElemenCP>(butir, (b) => b.elemen);
export const indeksPerKognitif = (butir: readonly CatatanButir[]) => per<Kognitif>(butir, (b) => b.kognitif);
export const indeksPerLevel = (butir: readonly CatatanButir[]) => per<Level>(butir, (b) => b.level);

/** Level penalaran tertinggi yang dikuasai: indeks kognitif >= 80 secara berurutan. */
export function levelPenalaranDikuasai(butir: readonly CatatanButir[]): Kognitif | "belum" {
  const k = indeksPerKognitif(butir);
  if ((k.knowing ?? 0) < AMBANG_TUNTAS) return "belum";
  if ((k.applying ?? 0) < AMBANG_TUNTAS) return "knowing";
  if ((k.reasoning ?? 0) < AMBANG_TUNTAS) return "applying";
  return "reasoning";
}
