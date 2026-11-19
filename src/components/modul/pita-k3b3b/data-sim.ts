/**
 * Data Simulasi Bengkel Pita Kelas 3 Bab 3 Sub-Bab B "Pita Pak Wayan" (hubungan sentimeter dan meter), Kebun Binatang Mini.
 * Ukuran berbeda dari Story (4 m dan 40 cm, 3 m, papan 700 cm, 1 m 22 cm, 4 m 35 cm + 7 m 40 cm, 6 m 50 cm - 2 m 20 cm, 5 m, 150 cm, 2 m 30 cm + 1 m 50 cm)
 * dan dari tugas CPA. Mind-map dan Infografis memakai data kartu (data-kartu.ts). Diuji: scripts/uji-pita-k3b3b.mjs.
 */

/** Tukar: potongan pita [100 cm, 10 cm, 1 cm] yang harus ditukar sampai sepuluh-ke-satu habis (kurang dari sepuluh potongan 10 cm dan kurang dari sepuluh potongan 1 cm). */
export const TARGET_TUKAR: readonly { awal: readonly [number, number, number] }[] = [
  { awal: [1, 14, 23] },
  { awal: [0, 23, 17] },
  { awal: [2, 5, 38] },
];
/** Ubah: meter ke sentimeter (ke-cm: m meter dan c sentimeter menjadi sentimeter) dan sentimeter ke meter (ke-m: 100 m sentimeter menjadi m meter). */
export const TARGET_UBAH: readonly { arah: "ke-cm" | "ke-m"; m: number; c: number }[] = [
  { arah: "ke-cm", m: 6, c: 0 },
  { arah: "ke-m", m: 8, c: 0 },
  { arah: "ke-cm", m: 2, c: 45 },
];
/** Gabung: ukuran dalam sentimeter ditulis dengan meter dan sentimeter bersama. */
export const TARGET_GABUNG: readonly { total: number }[] = [{ total: 317 }, { total: 452 }, { total: 269 }];
/** Sambung: dua pita disambung (tambah) atau dipotong (kurang); hasil ditulis meter dan sentimeter. */
export const TARGET_SAMBUNG: readonly { op: "tambah" | "kurang"; a: readonly [number, number]; b: readonly [number, number] }[] = [
  { op: "tambah", a: [2, 65], b: [1, 90] },
  { op: "kurang", a: [5, 25], b: [2, 60] },
  { op: "tambah", a: [3, 45], b: [2, 70] },
];
/** Bandingkan: tiga pita (sentimeter, dan apakah ditulis meter dan sentimeter bersama); pilih yang paling panjang. */
export const TARGET_BANDING: readonly { ukuran: readonly [number, number, number]; bentuk: readonly [boolean, boolean, boolean] }[] = [
  { ukuran: [285, 258, 301], bentuk: [false, true, false] },
  { ukuran: [404, 440, 412], bentuk: [false, false, true] },
  { ukuran: [617, 625, 591], bentuk: [false, true, false] },
];

export const MISI_PITA_TEKS = "Tukar potongan pita, ubah meter dan sentimeter, tulis ukuran bersama, lalu sambung atau potong pita. Urutannya bebas.";
