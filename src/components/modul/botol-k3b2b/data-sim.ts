/**
 * Data Simulasi Pos Persediaan Kelas 3 Bab 2 Sub-Bab B "Botol Air Pak Darto" (kalimat Matematika pengurangan), akhir cerita Perkemahan Akhir Pekan.
 * Benda persediaan berbeda dari Story (botol dan biskuit): kaleng sarden, senter, apel. Bilangan sasaran berbeda dari Story (90, 35, 55, 40, 28, 68, 100, 45, 60, 27, 72, 80, 32, 48)
 * dan dari tugas CPA. Mind-map dan Infografis memakai data kartu (data-kartu.ts). Diuji: scripts/uji-botol-k3b2b.mjs.
 */
export type BarangPos = {
  id: string;
  nama: string;
  emoji: string;
  /** Nama satuan: benda lepas dan kemasan sepuluh. */
  satuan: readonly [string, string];
};
export const BARANG_POS: readonly BarangPos[] = [
  { id: "kaleng", nama: "kaleng sarden", emoji: "\u{1F96B}", satuan: ["kaleng", "dus"] },
  { id: "senter", nama: "senter", emoji: "\u{1F526}", satuan: ["senter", "kotak"] },
  { id: "apel", nama: "apel", emoji: "\u{1F34E}", satuan: ["apel", "keranjang"] },
];

/** Bagikan: rak punya bilangan awal, anak membagikan benda sampai tersisa sebanyak sasaran (yang dibagikan = awal dikurangi sisa). */
export const TARGET_BAGIKAN: readonly { awal: number; sisa: number }[] = [
  { awal: 57, sisa: 34 },
  { awal: 82, sisa: 46 },
  { awal: 71, sisa: 24 },
];
/** Cari bilangan yang dikurangkan: awal dikurangi titik-titik sama dengan sisa (jawaban awal dikurangi sisa). */
export const TARGET_KURANG: readonly { awal: number; sisa: number }[] = [
  { awal: 93, sisa: 46 },
  { awal: 64, sisa: 38 },
  { awal: 75, sisa: 19 },
];
/** Cari bilangan awal: titik-titik dikurangi dikurangkan sama dengan sisa (jawaban dikurangkan ditambah sisa). */
export const TARGET_AWAL: readonly { kurang: number; sisa: number }[] = [
  { kurang: 29, sisa: 52 },
  { kurang: 34, sisa: 43 },
  { kurang: 17, sisa: 66 },
];
/** Periksa dengan mengurangkan lagi: awal dikurangi dikurangkan harus sama dengan sisa yang dicatat (dua catatan cocok, satu tidak cocok). */
export const TARGET_PERIKSA: readonly { awal: number; kurang: number; sisa: number }[] = [
  { awal: 86, kurang: 37, sisa: 49 },
  { awal: 74, kurang: 29, sisa: 47 },
  { awal: 92, kurang: 58, sisa: 34 },
];
/** Pasangan: bilangan awal seratus, anak mencatat banyaknya yang terjual, sisanya dihitung. */
export const AWAL_PASANGAN = 100;

export const MISI_PERSEDIAAN_TEKS = "Bagikan benda dari rak, cari bilangan yang dikurangkan, cari bilangan awal, lalu periksa hasilnya. Urutannya bebas.";
