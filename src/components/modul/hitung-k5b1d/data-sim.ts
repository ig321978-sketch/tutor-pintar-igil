/**
 * Data Simulasi Susun Hitung Kelas 5 Bab 1 Sub-Bab D "Hitungan Penonton Pak Darmo", akhir cerita Hari Pertandingan di Stadion Kota.
 * Data berbeda dari Story (penonton empat tribun 82.517, kursi kosong 7.483, 12 x 5.000, 64.000 : 4), Infografis, dan tugas CPA: Simulasi memakai kios makanan, parkir, lampu sorot, dan tiket.
 * Eksplorasi bebas tanpa skor. Diuji: scripts/uji-hitung-k5b1d.mjs.
 */
export type SasaranHitung = { a: number; b: number; satuan: string; nama: [string, string] };
/** Jumlah bersusun: tulis dan simpan tiap kolom dari kanan. Semua hasil paling banyak 99.999. */
export const JUMLAH_SIM: readonly SasaranHitung[] = [
  { a: 27384, b: 35178, satuan: "porsi", nama: ["Kios sate", "Kios mie"] },
  { a: 46905, b: 19087, satuan: "tiket", nama: ["Tiket pagi", "Tiket sore"] },
  { a: 18649, b: 34763, satuan: "kendaraan", nama: ["Parkir motor", "Parkir mobil"] },
  { a: 52800, b: 39700, satuan: "lampu", nama: ["Lampu utara", "Lampu selatan"] },
];
/** Kurang bersusun: pinjam bila angka atas lebih kecil, termasuk pinjaman yang bergulir melewati nol. */
export const KURANG_SIM: readonly SasaranHitung[] = [
  { a: 80000, b: 25600, satuan: "kursi", nama: ["Kursi VIP", "Kursi terisi"] },
  { a: 63052, b: 28479, satuan: "tiket", nama: ["Tiket dicetak", "Tiket terjual"] },
  { a: 90000, b: 43215, satuan: "porsi", nama: ["Porsi dibuat", "Porsi laku"] },
  { a: 47320, b: 19845, satuan: "kendaraan", nama: ["Kapasitas parkir", "Kendaraan masuk"] },
];
/** Kali: a rupiah sebuah dikali b buah (b dua angka), pengali dipisah lalu hasil bagian dijumlahkan. Semua hasil paling banyak 99.999. */
export const KALI_SIM: readonly SasaranHitung[] = [
  { a: 2400, b: 13, satuan: "rupiah", nama: ["Lampu sorot", "Banyak"] },
  { a: 3200, b: 14, satuan: "rupiah", nama: ["Kursi VIP", "Banyak"] },
  { a: 1500, b: 16, satuan: "rupiah", nama: ["Papan nama", "Banyak"] },
  { a: 4100, b: 12, satuan: "rupiah", nama: ["Tiket parkir", "Banyak"] },
];
/** Bagi per kolom: semua habis dibagi, dari kolom paling kiri. */
export const BAGI_SIM: readonly SasaranHitung[] = [
  { a: 45000, b: 5, satuan: "rupiah", nama: ["Uang kios", "Bagian"] },
  { a: 96000, b: 8, satuan: "rupiah", nama: ["Uang parkir", "Bagian"] },
  { a: 38000, b: 2, satuan: "rupiah", nama: ["Uang tiket", "Bagian"] },
  { a: 27000, b: 3, satuan: "rupiah", nama: ["Uang lampu", "Bagian"] },
];

export const MISI_HITUNG_TEKS = "Jumlahkan dan kurangkan bersusun, pisah pengali lalu kalikan, dan bagi per kolom. Urutannya bebas.";
