/**
 * Data Simulasi Piktogram Jajanan Kelas 4 Bab 6 Sub-Bab A "Piktogram Jajanan Bu Rini", awal cerita Bazar Kuliner Sekolah.
 * Data berbeda dari Story dan dari tugas CPA. Tiga sasaran tiap alat. Semua jawaban dihitung dari data (logika-data.ts).
 * Mind-map dan Infografis memakai data kartu (data-kartu.ts). Diuji: scripts/uji-jajanan-k4b6a.mjs.
 */
import { IKON as I, pik, type Pik } from "./logika-data";

/** Gambar: tabel data; anak memilih keterangan lalu menambah ikon tiap baris sampai sesuai. Keterangan yang tidak habis membagi data ditolak alat. */
export const TARGET_GAMBAR: readonly Pik[] = [
  pik("Minuman bazar", "gelas", 5, [["jeruk", I.jeruk, 20], ["melon", I.melon, 35], ["mangga", I.mangga, 15]]),
  pik("Pengunjung bazar", "orang", 10, [["jumat", I.orang, 30], ["sabtu", I.orang, 50], ["minggu", I.orang, 40]]),
  pik("Tiket bazar", "lembar", 2, [["anak", I.tiket, 12], ["dewasa", I.tiket, 16], ["pelajar", I.tiket, 8]]),
];
/** Keterangan pilihan pada alat Gambar. */
export const SKALA_GAMBAR: readonly number[] = [2, 5, 10];

/** Baca: piktogram sudah jadi; anak memilih banyak data satu baris. */
export const TARGET_BACA: readonly { p: Pik; i: number }[] = [
  { p: pik("Jajanan bazar", "porsi", 5, [["sate", I.sate, 25], ["siomay", I.siomay, 40], ["cilok", I.cilok, 15]]), i: 1 },
  { p: pik("Minuman bazar", "gelas", 10, [["semangka", I.semangka, 60], ["jeruk", I.jeruk, 30], ["melon", I.melon, 20]]), i: 0 },
  { p: pik("Tiket bazar", "lembar", 2, [["anak", I.tiket, 8], ["dewasa", I.tiket, 6], ["pelajar", I.tiket, 4]]), i: 2 },
];

/** Banding: anak menandai baris dengan ikon paling banyak dan paling sedikit. */
export const TARGET_BANDING: readonly Pik[] = [
  pik("Jajanan bazar", "porsi", 5, [["donat", I.donat, 20], ["sosis", I.sosis, 35], ["jagung", I.jagung, 10], ["sate", I.sate, 25]]),
  pik("Minuman bazar", "gelas", 10, [["melon", I.melon, 40], ["jeruk", I.jeruk, 20], ["mangga", I.mangga, 60]]),
  pik("Balon bazar", "buah", 5, [["merah", I.balon, 30], ["biru", I.balon, 15], ["kuning", I.balon, 40]]),
];

/** Jumlah: anak memasukkan tiap baris ke keranjang, lalu memilih jumlah seluruhnya. */
export const TARGET_JUMLAH: readonly Pik[] = [
  pik("Jajanan bazar", "porsi", 5, [["sate", I.sate, 15], ["siomay", I.siomay, 25], ["cilok", I.cilok, 10]]),
  pik("Minuman bazar", "gelas", 10, [["jeruk", I.jeruk, 30], ["melon", I.melon, 50], ["mangga", I.mangga, 20]]),
  pik("Tiket bazar", "lembar", 2, [["anak", I.tiket, 8], ["dewasa", I.tiket, 6], ["pelajar", I.tiket, 4]]),
];

export const MISI_JAJANAN_TEKS = "Gambar data tabel menjadi piktogram, baca banyak data satu baris, tandai yang paling banyak dan paling sedikit, lalu jumlahkan semuanya. Urutannya bebas.";
