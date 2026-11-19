/**
 * Data Simulasi Meja Pesanan Kelas 3 Bab 1 Sub-Bab D "Pesanan Bu Tuti" (penjumlahan sampai 100), Toko Kelontong Pak Joko.
 * Berbeda dari Story (Story memakai kue lapis, nagasari, donat, bolu, roti dan bilangan 23, 14, 38, 27, 15, 24, 31, 46, 29).
 * Diuji: scripts/uji-tambah-k3b1d.mjs.
 */

export const MISI_PESANAN_TEKS = "Susun pesanan ke bawah, tukar sepuluh butir, uraikan puluhan dan satuan, jumlahkan tiga bilangan, lalu periksa dengan menukar urutan. Urutannya bebas.";

export type PesananSim = { nama: string; emoji: string; a: number; b: number };
/** Tiga pesanan susun pendek: satu tanpa menyimpan (59), dua dengan menyimpan (84 dan 85). */
export const PESANAN_SIM: readonly PesananSim[] = [
  { nama: "pastel", emoji: "\u{1F95F}", a: 34, b: 25 },
  { nama: "lemper", emoji: "\u{1F359}", a: 48, b: 36 },
  { nama: "onde-onde", emoji: "\u{1F361}", a: 57, b: 28 },
];

/** Tukar sepuluh: butir lepas dan batang puluhan di awal (jumlah tetap lima puluh tujuh). */
export const TUKAR_AWAL = { butir: 17, batang: 4 } as const;

/** Susun panjang: dua bilangan yang diuraikan menjadi puluhan dan satuan (jumlah sembilan puluh satu). */
export const PANJANG_SIM = { a: 63, b: 28 } as const;

/** Tiga bilangan dijumlahkan dua-dua (jumlah dua pertama empat puluh lima, seluruhnya tujuh puluh sembilan). */
export const TIGA_SIM = { a: 17, b: 28, c: 34 } as const;

/** Periksa dengan menukar urutan dan kira-kira dulu: dua bilangan, tiga pilihan taksiran (yang tepat sembilan puluh). */
export const PERIKSA_SIM = { a: 36, b: 48, taksir: [80, 90, 100] as readonly number[] } as const;
