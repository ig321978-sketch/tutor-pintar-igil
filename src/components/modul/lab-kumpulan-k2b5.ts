/**
 * Lab Kumpulan (Kelas 2 Bab 5, Sub-Bab B): model PhET.
 * Sekumpulan benda (2 sampai 12) dibagi ke dua kelompok dengan mengetuk benda satu per satu. Gambar, hitungan
 * tiap kelompok, pasangan satu-satu, titik, tabel pola, dan kalimat berubah bersama.
 * Setengah dari kumpulan hanya ada bila dua kelompok sama banyak, yaitu bila banyak benda genap.
 * Murni: tanpa React, tanpa jaringan, tanpa impor nilai. Diuji di scripts/uji-lab-k2b5.mjs.
 */

export type JenisKumpulan = "kelereng" | "apel" | "pensil" | "ikan" | "jeruk" | "balon";
export type Kelompok = "kiri" | "kanan";

export const URUT_KUMPULAN: JenisKumpulan[] = ["kelereng", "apel", "pensil", "ikan", "jeruk", "balon"];
export const NAMA_KUMPULAN: Record<JenisKumpulan, string> = { kelereng: "kelereng", apel: "apel", pensil: "pensil", ikan: "ikan", jeruk: "jeruk", balon: "balon" };

export const MIN_N = 2;
export const MAKS_N = 12;
export const AWAL_N = 6;
export const AWAL_JENIS: JenisKumpulan = "kelereng";

export const batasN = (n: number) => Math.max(MIN_N, Math.min(MAKS_N, Math.round(n)));

export const bisaDibagiDua = (n: number) => Number.isInteger(n) && n > 0 && n % 2 === 0;
export const setengahDari = (n: number): number | null => (bisaDibagiDua(n) ? n / 2 : null);

/** Awalnya semua benda ada di kelompok kiri, belum dibagi. */
export const awalGrup = (n: number = AWAL_N): Kelompok[] => Array.from({ length: batasN(n) }, () => "kiri" as Kelompok);

/** Menambah atau mengurangi benda. Benda baru masuk kelompok kiri. */
export function ubahN(grup: readonly Kelompok[], n: number): Kelompok[] {
  const baru = batasN(n);
  if (baru <= grup.length) return grup.slice(0, baru);
  return [...grup, ...Array.from({ length: baru - grup.length }, () => "kiri" as Kelompok)];
}

/** Memindahkan satu benda ke kelompok lain. */
export function pindah(grup: readonly Kelompok[], i: number): Kelompok[] {
  if (i < 0 || i >= grup.length) return [...grup];
  return grup.map((g, j) => (j === i ? (g === "kiri" ? "kanan" : "kiri") : g));
}

/** Membagi satu-satu bergantian: kiri, kanan, kiri, kanan, ... */
export const bagiSatuSatu = (n: number): Kelompok[] => Array.from({ length: batasN(n) }, (_, i) => (i % 2 === 0 ? "kiri" : "kanan") as Kelompok);

export const hitungGrup = (grup: readonly Kelompok[]): { kiri: number; kanan: number } => ({
  kiri: grup.filter((g) => g === "kiri").length,
  kanan: grup.filter((g) => g === "kanan").length,
});

/** Dua kelompok sama banyak dan tidak kosong. */
export function samaBanyak(grup: readonly Kelompok[]): boolean {
  const { kiri, kanan } = hitungGrup(grup);
  return kiri > 0 && kiri === kanan;
}

/** Pasangan satu-satu: benda ke-i di kiri dengan benda ke-i di kanan. Sisanya tanpa pasangan. */
export function pasangan(grup: readonly Kelompok[]): { pasang: [number, number][]; sisa: number[] } {
  const kiri = grup.map((g, i) => (g === "kiri" ? i : -1)).filter((i) => i >= 0);
  const kanan = grup.map((g, i) => (g === "kanan" ? i : -1)).filter((i) => i >= 0);
  const m = Math.min(kiri.length, kanan.length);
  const pasang: [number, number][] = Array.from({ length: m }, (_, i) => [kiri[i], kanan[i]]);
  return { pasang, sisa: [...kiri.slice(m), ...kanan.slice(m)] };
}

/** Tabel pola dari 2 sampai 12: setengahnya, atau null bila ganjil. */
export const tabelPola = (): { n: number; setengah: number | null }[] => Array.from({ length: MAKS_N - MIN_N + 1 }, (_, i) => ({ n: MIN_N + i, setengah: setengahDari(MIN_N + i) }));

export const tandaiBilangan = (sudah: readonly number[], n: number): number[] => (sudah.includes(n) ? [...sudah] : [...sudah, n].sort((a, b) => a - b));

/** Kalimat keadaan kelompok. */
export function kalimatKumpulan(nama: string, grup: readonly Kelompok[]): string {
  const n = grup.length;
  const { kiri, kanan } = hitungGrup(grup);
  if (kiri === n) return `Semua ${n} ${nama} masih di satu kelompok. Pindahkan sebagian ke kelompok kanan.`;
  if (kiri === kanan) return `Dua kelompok sama banyak: ${kiri} dan ${kanan}. Setengah dari ${n} ${nama} adalah ${kiri}.`;
  if (!bisaDibagiDua(n)) {
    return Math.abs(kiri - kanan) === 1
      ? `Kelompok kiri ${kiri}, kelompok kanan ${kanan}. ${n} adalah bilangan ganjil, jadi tidak pernah bisa sama banyak. Selalu ada satu yang tersisa.`
      : `Kelompok kiri ${kiri}, kelompok kanan ${kanan}. Belum sama banyak. Ingat, ${n} adalah bilangan ganjil, jadi tidak bisa dibagi dua sama banyak.`;
  }
  return `Kelompok kiri ${kiri}, kelompok kanan ${kanan}. Belum sama banyak, jadi belum setengah.`;
}

export function ucapanKumpulan(nama: string, grup: readonly Kelompok[]): string {
  return kalimatKumpulan(nama, grup);
}

/** Kalimat ringkas tentang pasangan satu-satu. */
export function kalimatPasangan(grup: readonly Kelompok[]): string {
  const { pasang, sisa } = pasangan(grup);
  if (pasang.length === 0) return "Belum ada pasangan. Bagi benda ke dua kelompok dulu.";
  return sisa.length === 0 ? `Semua benda punya pasangan: ${pasang.length} pasang. Itu tandanya sama banyak.` : `${pasang.length} pasang, dan ${sisa.length} benda tidak punya pasangan. Itu tandanya belum sama banyak.`;
}
