/**
 * Data Simulasi Papan Pameran Kelas 4 Bab 2 Sub-Bab E "Papan Pameran Bu Tuti", akhir cerita Sanggar Batik Kampung Mekar.
 * Data berbeda dari Story (0,75 dan 75 persen, 0,4 dan 40 persen, 0,6 dan 60 persen, 30, 55, 25, 80, 90 persen) dan dari tugas CPA.
 * Mind-map dan Infografis memakai data kartu (data-kartu.ts). Diuji: scripts/uji-pameran-k4b2e.mjs.
 */

/** Kisi: warnai kotak pada kisi seratus sampai persen sasaran (banyak kotak berwarna sama dengan persennya). */
export type SasaranKisi = { p: number };
export const KISI_SIM: readonly SasaranKisi[] = [{ p: 36 }, { p: 82 }];

/** Geser: ubah desimal ke persen (kanan) atau persen ke desimal (kiri) dengan menggeser koma dua tempat. Sasaran bergantian kanan dan kiri. */
export type SasaranGeser = { p: number; arah: "kanan" | "kiri" };
export const GESER_SIM: readonly SasaranGeser[] = [
  { p: 14, arah: "kanan" },
  { p: 57, arah: "kiri" },
  { p: 9, arah: "kanan" },
  { p: 48, arah: "kiri" },
];

/** Baca: kisi sudah berwarna sebanyak `p` kotak; pilih persen dan desimal yang cocok. Indeks pilihan benar dihitung dari `p`. */
export type SasaranBaca = { p: number; persen: [string, string, string]; desimal: [string, string, string] };
export const BACA_SIM: readonly SasaranBaca[] = [
  { p: 24, persen: ["42%", "24%", "2,4%"], desimal: ["0,24", "2,4", "0,024"] },
  { p: 71, persen: ["17%", "710%", "71%"], desimal: ["7,1", "0,71", "0,071"] },
];

export const MISI_PAMERAN_TEKS = "Warnai kisi seratus, geser koma ke persen dan sebaliknya, lalu baca kisi. Urutannya bebas.";
