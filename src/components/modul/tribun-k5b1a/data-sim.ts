/**
 * Data Simulasi Tabel Tribun Kelas 5 Bab 1 Sub-Bab A "Tiket Tribun Bu Ningsih", awal cerita Hari Pertandingan di Stadion Kota.
 * Data berbeda dari Story dan dari tugas CPA (parkir, kios makanan, kursi VIP, bendera, lampu sorot, peluit). Tiga sasaran tiap alat.
 * Semua jawaban dihitung dari bilangan lewat logika-data.ts. Diuji: scripts/uji-tribun-k5b1a.mjs.
 */

/** Isi: bilangan diucapkan, anak mengisi angka tiap kolom pada papan. */
export type SasaranIsi = { n: number; benda: string; satuan: string };
export const TARGET_ISI: readonly SasaranIsi[] = [
  { n: 12405, benda: "motor di parkiran", satuan: "motor" },
  { n: 7361, benda: "kursi VIP yang terjual", satuan: "kursi" },
  { n: 58232, benda: "bendera klub", satuan: "bendera" },
];

/** Nol: sebagian angka sudah tertulis (yang disebut), anak mengisi nol penjaga pada kolom yang tidak disebut. */
export type SasaranNol = { n: number; benda: string; satuan: string };
export const TARGET_NOL: readonly SasaranNol[] = [
  { n: 40200, benda: "porsi di kios makanan", satuan: "porsi" },
  { n: 6008, benda: "peluit di gudang", satuan: "peluit" },
  { n: 70050, benda: "lampu di sekeliling stadion", satuan: "lampu" },
];

/** Titik: deret angka polos, anak memasang titik pemisah lalu memilih bacaannya. */
export type SasaranTitik = { n: number; benda: string; satuan: string };
export const TARGET_TITIK: readonly SasaranTitik[] = [
  { n: 63041, benda: "pengunjung kios", satuan: "orang" },
  { n: 7306, benda: "mobil di parkiran", satuan: "mobil" },
  { n: 100000, benda: "tiket yang dicetak sepanjang musim", satuan: "tiket" },
];

/** Urai: anak memilih banyak yang diwakili satu angka menurut kolomnya. */
export type SasaranUrai = { n: number; k: number; benda: string; satuan: string };
export const TARGET_URAI: readonly SasaranUrai[] = [
  { n: 36204, k: 3, benda: "kendaraan di parkiran", satuan: "kendaraan" },
  { n: 85913, k: 1, benda: "tiket dalam gudang", satuan: "tiket" },
  { n: 41760, k: 2, benda: "kursi di tribun", satuan: "kursi" },
];

export const MISI_TRIBUN_TEKS = "Isi tabel tempat dari bilangan yang diucapkan, jaga nol, pasang titik dan baca per periode, lalu pilih uraiannya. Urutannya bebas.";
