/**
 * Data Simulasi Meja Bilah Kelas 3 Bab 4 Sub-Bab A "Rangka Layang-layang Bu Ratih", awal cerita Festival Layang-layang Kampung.
 * Ukuran berbeda dari Story (55 mm, 30 mm, 300 mm, 100 mm, segitiga EFG, kertas persegi, tutup kaleng) dan dari tugas CPA. Penggaris sepanjang seratus milimeter (sepuluh sentimeter).
 * Mind-map dan Infografis memakai data kartu (data-kartu.ts). Diuji: scripts/uji-bilah-k3b4a.mjs.
 */
export type JenisSim = "sinar garis" | "garis" | "ruas garis" | "kurva";

/** Panjang penggaris pada alat Ukur (milimeter). */
export const SKALA_BILAH = 100;

/** Kenali: satu gambar yang ujungnya bisa ditarik; anak memilih jenisnya. Pangkal sinar garis selalu di kiri. */
export type TargetKenali = { benda: string; jenis: JenisSim };
export const TARGET_KENALI: readonly TargetKenali[] = [
  { benda: "bilah kecil", jenis: "ruas garis" },
  { benda: "sinar lampu", jenis: "sinar garis" },
  { benda: "tali panjang", jenis: "garis" },
  { benda: "benang berkelok", jenis: "kurva" },
];

/** Jalan: dua paku dan tiga jalan benang; anak memilih jalan terpendek (selalu yang lurus). Urutan ketiga jalan berganti tiap sasaran. */
export type JalanSim = "lurus" | "lengkung" | "berkelok";
export const TARGET_JALAN: readonly (readonly [JalanSim, JalanSim, JalanSim])[] = [
  ["lengkung", "lurus", "berkelok"],
  ["berkelok", "lengkung", "lurus"],
  ["lurus", "berkelok", "lengkung"],
];

/** Ukur: bilah ditaruh dengan ujung kiri di `awal` milimeter (bukan nol); anak menggesernya ke angka nol, lalu membaca `panjang` milimeter. Kelipatan lima milimeter. */
export type TargetUkur = { benda: string; awal: number; panjang: number };
export const TARGET_UKUR: readonly TargetUkur[] = [
  { benda: "bilah rangka", awal: 20, panjang: 65 },
  { benda: "bilah silang", awal: 25, panjang: 45 },
  { benda: "pita merah", awal: 15, panjang: 80 },
];

/** Ubah: ukuran dalam sentimeter dan milimeter ditulis ulang dalam milimeter saja, atau dalam sentimeter desimal. */
export type TargetUbah = { cm: number; mm: number; bentuk: "mm" | "desimal" };
export const TARGET_UBAH: readonly TargetUbah[] = [
  { cm: 7, mm: 5, bentuk: "mm" },
  { cm: 4, mm: 5, bentuk: "desimal" },
  { cm: 8, mm: 5, bentuk: "mm" },
];

/** Sisi: bangun datar yang titik sudutnya diberi huruf lalu sisinya dihitung (lingkaran tidak punya sisi lurus). */
export type TargetSisi = { benda: string; nama: string; huruf: string[] };
export const TARGET_SISI: readonly TargetSisi[] = [
  { benda: "rangka persegi", nama: "persegi", huruf: ["P", "Q", "R", "S"] },
  { benda: "rangka segilima", nama: "segilima", huruf: ["V", "W", "X", "Y", "Z"] },
  { benda: "gulungan benang", nama: "lingkaran", huruf: [] },
];

export const MISI_BILAH_TEKS = "Kenali jenis garis, ukur bilah dari nol, ubah ukuran, lalu beri huruf dan hitung sisi. Urutannya bebas.";
