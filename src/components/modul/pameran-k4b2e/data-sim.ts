/**
 * Data Simulasi Papan Pameran Kelas 4 Bab 2 Sub-Bab E "Papan Pameran Bu Tuti", akhir cerita Sanggar Batik Kampung Mekar.
 * Data berbeda dari Story (0,75 dan 75 persen, 0,4 dan 40 persen, 0,6 dan 60 persen, 30, 55, 25, 80, 90 persen, 20 dari 50, 1,2) dan dari tugas CPA.
 * Cakupan Sub-Bab E menurut kurikulum: persen di atas seratus (alat Geser) dan pecahan berpenyebut lain menjadi persen (alat Baca dengan kisi dua puluh lima kotak).
 * Mind-map dan Infografis memakai data kartu (data-kartu.ts). Diuji: scripts/uji-pameran-k4b2e.mjs.
 */

/** Kisi: warnai kotak pada kisi seratus sampai persen sasaran (banyak kotak berwarna sama dengan persennya). */
export type SasaranKisi = { p: number };
export const KISI_SIM: readonly SasaranKisi[] = [{ p: 36 }, { p: 82 }];

/**
 * Geser: ubah desimal ke persen (kanan) atau persen ke desimal (kiri) dengan menggeser koma dua tempat. Sasaran bergantian kanan dan kiri.
 * Dua sasaran terakhir di atas seratus persen: 2,15 menjadi 215% dan 126% menjadi 1,26.
 */
export type SasaranGeser = { p: number; arah: "kanan" | "kiri" };
export const GESER_SIM: readonly SasaranGeser[] = [
  { p: 14, arah: "kanan" },
  { p: 57, arah: "kiri" },
  { p: 215, arah: "kanan" },
  { p: 126, arah: "kiri" },
];

/**
 * Baca: kisi sudah berwarna; pilih persen dan desimal yang cocok. Indeks pilihan benar dihitung dari `p`.
 * Tanpa `peny` kisinya seratus kotak dan `p` kotak berwarna. Dengan `peny` kisinya hanya `peny` kotak dan yang berwarna adalah pembilangnya (p kali peny dibagi seratus),
 * jadi pecahan harus disamakan penyebutnya menjadi seratus dulu.
 */
export type SasaranBaca = { p: number; persen: [string, string, string]; desimal: [string, string, string]; peny?: number };
export const BACA_SIM: readonly SasaranBaca[] = [
  { p: 24, persen: ["42%", "24%", "2,4%"], desimal: ["0,24", "2,4", "0,024"] },
  { p: 44, peny: 25, persen: ["11%", "4,4%", "44%"], desimal: ["4,4", "0,44", "0,044"] },
];
/** Banyak kotak kisi Baca dan banyak yang berwarna untuk satu sasaran. */
export const kisiBaca = (t: SasaranBaca): { jumlah: number; warna: number; kolom: number } => {
  const jumlah = t.peny ?? 100;
  return { jumlah, warna: t.peny ? (t.p * t.peny) / 100 : t.p, kolom: jumlah === 25 ? 5 : 10 };
};

export const MISI_PAMERAN_TEKS = "Warnai kisi seratus, geser koma ke persen dan sebaliknya, lalu baca kisi pecahan. Urutannya bebas.";
