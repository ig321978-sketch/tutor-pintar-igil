import type { Obj } from "../logika-story";
import { W, bulat, emo, garis, kotak, teks, type Tokoh } from "./dasar";

/**
 * Dunia cerita Kelas 1 (Opsi 2): Kampung Cemara. Acuan: naskah/kitab-dunia-k1.md (versi 2, disetujui pemilik).
 * Dunia keseharian anak; benda nyata digambar sebagai gambar (emoji atau bentuk dasar) yang pada tahap interaktif bisa diklik dan diseret.
 * Semua nama tokoh dan judul dibaca dari berkas ini; mengganti nama cukup di sini.
 */

export const LINTANG: Tokoh = { slug: "lintang", nama: "Lintang", warna: "#FDE68A" };
export const NIKO: Tokoh = { slug: "niko", nama: "Niko", warna: "#FDBA74" };
export const TALA: Tokoh = { slug: "tala", nama: "Tala", warna: "#C4B5FD" };
export const IGIL: Tokoh = { slug: "igil", nama: "Igil", warna: "#FBCFE8", ikon: "\u{1F989}" };

/** Semua tokoh Kelas 1. Paling banyak empat, termasuk Igil (maskot tetap semua kelas). */
export const TOKOH_K1: readonly Tokoh[] = [LINTANG, NIKO, TALA, IGIL];

export const KATA_KHAS_K1 = { mulai: "Ayo hitung!", igil: "Satu per satu, pelan-pelan!", hampir: "Hampir pas!" } as const;
/** Kalimat kunci Sub-Bab A, diucapkan utuh oleh Igil (delapan kata). */
export const KALIMAT_KUNCI_1A = "Hitung satu per satu, yang terakhir adalah banyaknya.";
/** Nama Metode IGIL Sub-Bab A (empat langkah, bahasa Indonesia). Dipakai sebagai subjudul video. */
export const NAMA_METODE_K1A = "Tunjuk, Geser, Isi, Tulis";

/** Judul baru (tampil) per bab dan sub-bab Kelas 1, dari Kitab versi 2 bagian 5 dan 6. Penanda topik kurikulum tidak disimpan di sini. */
export const JUDUL_BAB_K1: Record<number, string> = {
  1: "Penolong Pesta: Menghitung sampai Sepuluh",
  2: "Pasar Pagi: Belanjaan yang Bertambah",
  3: "Kebun Sore: Yang Dipetik dan Yang Tersisa",
  4: "Dapur Nenek: Bentuk di Sekitar Kita",
  5: "Lapangan Kampung: Menghitung sampai Dua Puluh",
  6: "Warung Pesta: Tambah Kurang yang Lebih Besar",
  7: "Tali dan Spanduk: Panjang dan Pendek",
  8: "Malam Pesta: Catatan Kesukaan Kampung",
};
export const JUDUL_SUB_K1: Record<string, string> = {
  "1A": "Apel di Keranjang: Hitung, Baca, Tulis Bilangan",
  "1B": "Piring dan Gelas: Mana yang Lebih Banyak?",
  "1C": "Tangga Pohon Beringin: Naik dan Turun",
  "1D": "Dua Kotak Kue: Memasangkan Bilangan",
  "2A": "Dua Keranjang Jadi Satu",
  "2B": "Tiga Jalan Menuju Jumlah",
  "2C": "Cerita dari Pasar: Menambah Belanjaan",
  "3A": "Jeruk Dimakan, Sisa Berapa?",
  "3B": "Tiga Jalan Menuju Sisa",
  "3C": "Dua Arah Satu Cerita: Tambah dan Kurang Berpasangan",
  "3D": "Cerita dari Kebun: Mengurangi Hasil Panen",
  "4A": "Apel, Kaleng, atau Kotak? Bentuk Benda",
  "4B": "Rak Dapur Nenek: Memilah Benda",
  "4C": "Kue dari Potongan Bentuk",
  "5A": "Kursi Pesta: Hitung, Baca, Tulis sampai Dua Puluh",
  "5B": "Lampion di Tali: Maju dan Mundur",
  "5C": "Dua Laci Gudang: Puluhan dan Satuan",
  "5D": "Lomba Lari: Besar, Kecil, Berurutan",
  "6A": "Timbangan Warung: Lebih, Kurang, Selisih",
  "6B": "Kue Bertambah sampai Dua Puluh",
  "6C": "Kue Berkurang dari Dua Puluh",
  "7A": "Siapa Tali Terpanjang?",
  "7B": "Spanduk Diukur dengan Jengkal",
  "8A": "Menghitung Suara Kampung: Memilah Pilihan",
  "8B": "Lukisan Kesukaan Kampung: Menggambar Data",
};

/* ------------------------------ Benda keseharian (gambar) ------------------------------ */
/** Emoji benda keseharian (semua paling tinggi U+1FA95). Benda diperlakukan sebagai gambar yang bisa digerakkan atau diklik. */
export const BENDA = {
  apel: "\u{1F34E}",
  jeruk: "\u{1F34A}",
  kue: "\u{1F370}",
  roti: "\u{1F35E}",
  telur: "\u{1F95A}",
  bunga: "\u{1F33C}",
  lampion: "\u{1F3EE}",
  balon: "\u{1F388}",
  pohon: "\u{1F333}",
} as const;

/** Satu benda keseharian (emoji) berpusat di (x, y). `sorot` menandai benda yang sedang disebut. */
export const benda = (id: string, x: number, y: number, emoji: string, u = 20, sorot = false): Obj => emo(id, x, y, emoji, u, sorot ? { sorot: true } : {});

/**
 * Deret `n` benda (emoji) mulai di (x, y), `m` per baris, jarak `j`. Benda ke-i berid `${id}${i}`.
 * Pola dua baris lima membantu anak mengenali banyaknya tanpa menghitung ulang.
 */
export function kumpulBenda(id: string, n: number, x: number, y: number, emoji: string, m = 5, j = 22, u = 20): Obj[] {
  return Array.from({ length: n }, (_, i) => benda(`${id}${i + 1}`, x + (i % m) * j, y + Math.floor(i / m) * (j + 2), emoji, u));
}
export const idKumpul = (id: string, dari: number, sampai: number): string[] => Array.from({ length: Math.max(0, sampai - dari + 1) }, (_, i) => `${id}${dari + i}`);

/** Keranjang anyaman terbuka: badan dan bibir atas. Id `${id}-bd` dan `${id}-tp`. Pojok kiri-atas (x, y), lebar w, tinggi h. */
export function keranjang(id: string, x: number, y: number, w = 90, h = 44): Obj[] {
  return [
    kotak(`${id}-bd`, x, y + 6, w, h - 6, "#E9C98B", W.coklat, { rx: 10, tebal: 1.8 }),
    kotak(`${id}-tp`, x - 4, y, w + 8, 10, "#D9A441", W.coklat, { rx: 5, tebal: 1.6 }),
  ];
}
export const idKeranjang = (id: string): string[] => [`${id}-bd`, `${id}-tp`];

/** Alas rumput di dasar kanvas. Id `rumput`. */
export const rumput = (y = 150): Obj => kotak("rumput", 0, y, 300, 208 - y, "#BBF7D0", undefined, { rx: 0, tebal: 0 });

/** Pohon sederhana: batang dan tajuk. Id `${id}-bt` dan `${id}-tj`. Batang berpangkal di (x, y). */
export function pohon(id: string, x: number, y: number, s = 1): Obj[] {
  return [
    kotak(`${id}-bt`, x - 7 * s, y - 40 * s, 14 * s, 40 * s, "#A16207", W.coklat, { rx: 3, tebal: 1.4 }),
    bulat(`${id}-tj`, x, y - 54 * s, 28 * s, "#86EFAC", W.hijau, { tebal: 1.6 }),
  ];
}
export const idPohon = (id: string): string[] => [`${id}-bt`, `${id}-tj`];

/** Jalan setapak putus-putus; ujung garis RELATIF terhadap (10, y). */
export const jalanSetapak = (id: string, y = 178): Obj => garis(id, 10, y, 270, 0, W.coklat, 1.4, { putus: true });

/** Lambang bilangan besar yang muncul sebentar saat disebut. Id `${id}-k` dan `${id}-t`. */
export function lambang(id: string, x: number, y: number, angka: string, w = 40, h = 40, u = 26): Obj[] {
  return [kotak(`${id}-k`, x, y, w, h, W.krem, W.biru, { rx: 8, tebal: 1.8 }), teks(`${id}-t`, x + w / 2, y + h / 2 + u * 0.35, angka, u, W.merah)];
}
export const idLambang = (id: string): string[] => [`${id}-k`, `${id}-t`];
