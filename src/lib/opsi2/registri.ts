import type { SoalInstans, SoalSpec, Tahap, Tindakan } from "./tipe";

/** Registri tindakan. Tiap berkas tindakan mendaftar sendiri saat dimuat (lihat index.ts). */
const DAFTAR = new Map<string, Tindakan>();

/**
 * Mendaftarkan satu tindakan. Id yang sama dengan tahap yang sama menimpa (aman untuk muat ulang cepat);
 * id yang sama dengan tahap lain ditolak.
 */
export function registrasiTindakan(t: Tindakan): void {
  const ada = DAFTAR.get(t.id);
  if (ada && ada.tahap !== t.tahap) throw new Error(`Tindakan "${t.id}" sudah terdaftar di tahap ${ada.tahap}, bukan ${t.tahap}.`);
  DAFTAR.set(t.id, t);
}

/** Semua tindakan terdaftar di satu tahap (urutan pendaftaran). */
export const daftarTindakan = (tahap: Tahap): Tindakan[] => [...DAFTAR.values()].filter((t) => t.tahap === tahap);

export const ambilTindakan = (id: string): Tindakan | undefined => DAFTAR.get(id);

/** Membangkitkan satu soal dari spesifikasinya. Galat bila tindakan tidak terdaftar. */
export function buatSoal(spec: SoalSpec, benih: number): SoalInstans {
  const t = DAFTAR.get(spec.tindakan);
  if (!t) throw new Error(`Tindakan "${spec.tindakan}" belum terdaftar.`);
  return t.buat(spec, benih);
}
