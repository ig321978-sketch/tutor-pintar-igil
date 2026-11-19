/**
 * Data Simulasi Papan Tabel Kelas 3 Bab 5 Sub-Bab B "Tabel Bu Wulan", akhir cerita Bengkel Sepeda Pak Hasan.
 * Data berbeda dari Story (ban bocor 13, rantai lepas 10, rem blong 6, salah 15, selisih 7, lampu mati 9) dan dari tugas CPA. Turus paling banyak dua puluh.
 * Mind-map dan Infografis memakai data kartu (data-kartu.ts). Diuji: scripts/uji-tabel-k3b5b.mjs.
 */
export type BarisSim = { nama: string; n: number };

/** Banyak turus paling banyak pada satu jenis. */
export const MAKS_TURUS = 20;

/** Cacah: daftar peminjaman yang dibaca dari atas ke bawah; tiap isi daftar adalah nomor jenis. Anak mengetuk jenis untuk menambah turus (garis kelima otomatis menjadi bundel). */
export type TargetCacah = { judul: string; jenis: [string, string, string]; daftar: number[] };
export const TARGET_CACAH: readonly TargetCacah[] = [
  { judul: "peminjam perlengkapan hari pertama", jenis: ["pita", "bel", "helm"], daftar: [0, 2, 0, 1, 2, 0, 2, 0, 1, 2, 0, 1] },
  { judul: "peminjam perlengkapan hari kedua", jenis: ["botol", "tas", "peta"], daftar: [1, 1, 2, 1, 0, 1, 2, 1, 2, 0, 1, 2, 2] },
];

/** Isi: tabel dengan turus yang sudah ditulis; anak mengisi kolom banyak tiap baris. */
export type TargetIsi = { baris: [BarisSim, BarisSim, BarisSim] };
export const TARGET_ISI: readonly TargetIsi[] = [
  { baris: [{ nama: "pita", n: 11 }, { nama: "bel", n: 4 }, { nama: "helm", n: 8 }] },
  { baris: [{ nama: "botol", n: 16 }, { nama: "tas", n: 3 }, { nama: "peta", n: 12 }] },
];

/** Urut: baris tabel yang belum urut; anak menggeser baris ke atas dan ke bawah sampai urut menurut `arah`. */
export type TargetUrut = { baris: [BarisSim, BarisSim, BarisSim]; arah: "naik" | "turun" };
export const TARGET_URUT: readonly TargetUrut[] = [
  { baris: [{ nama: "pita", n: 11 }, { nama: "bel", n: 4 }, { nama: "helm", n: 8 }], arah: "naik" },
  { baris: [{ nama: "bel", n: 5 }, { nama: "pita", n: 14 }, { nama: "helm", n: 9 }], arah: "turun" },
];

/** Baca: pertanyaan tentang tabel yang sudah jadi (terbanyak, tersedikit, lebih dari acuan, selisih terbanyak dan tersedikit). */
export type SoalBaca = "terbanyak" | "tersedikit" | "lebih" | "selisih";
export type TargetBaca = { soal: SoalBaca; baris: [BarisSim, BarisSim, BarisSim]; acuan: number };
export const TARGET_BACA: readonly TargetBaca[] = [
  { soal: "terbanyak", baris: [{ nama: "pita", n: 12 }, { nama: "bel", n: 5 }, { nama: "helm", n: 8 }], acuan: 0 },
  { soal: "tersedikit", baris: [{ nama: "helm", n: 7 }, { nama: "pita", n: 14 }, { nama: "bel", n: 4 }], acuan: 0 },
  { soal: "lebih", baris: [{ nama: "pita", n: 10 }, { nama: "bel", n: 8 }, { nama: "helm", n: 5 }], acuan: 8 },
  { soal: "selisih", baris: [{ nama: "helm", n: 12 }, { nama: "pita", n: 9 }, { nama: "bel", n: 4 }], acuan: 0 },
];

export const MISI_TABEL_TEKS = "Cacah dengan turus berlima, isi kolom banyak, urutkan baris, lalu baca tabel dan jawab. Urutannya bebas.";
