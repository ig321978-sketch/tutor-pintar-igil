import type { Aksi, Obj } from "../logika-story";
import { W, bulat, garis, kotak, teks, type Tokoh } from "./dasar";

/**
 * Dunia cerita Kelas 1 (Opsi 2): Pulau Lentera. Acuan: naskah/kitab-dunia-k1.md (disetujui pemilik).
 * Semua nama tokoh dan judul dibaca dari berkas ini; mengganti nama cukup di sini.
 */

export const LINTANG: Tokoh = { slug: "lintang", nama: "Lintang", warna: "#FDE68A" };
export const NIKO: Tokoh = { slug: "niko", nama: "Niko", warna: "#FDBA74" };
export const TALA: Tokoh = { slug: "tala", nama: "Tala", warna: "#C4B5FD" };
export const IGIL: Tokoh = { slug: "igil", nama: "Igil", warna: "#FBCFE8", ikon: "\u{1F989}" };

/** Semua tokoh Kelas 1. Paling banyak empat, termasuk Igil (maskot tetap semua kelas). */
export const TOKOH_K1: readonly Tokoh[] = [LINTANG, NIKO, TALA, IGIL];

export const KATA_KHAS_K1 = { mulai: "Ayo nyalakan!", igil: "Cahaya satu per satu!", hampir: "Hampir terang!" } as const;

/** Judul baru (tampil) per bab dan sub-bab Kelas 1, dari Kitab bagian 5 dan 6. Penanda topik kurikulum tidak disimpan di sini. */
export const JUDUL_BAB_K1: Record<number, string> = {
  1: "Lentera Pertama: Menyalakan Sepuluh Cahaya",
  2: "Jembatan Gabung: Menambah Cahaya",
  3: "Lembah Redup: Cahaya yang Berkurang",
  4: "Bengkel Kaca: Menjelajah Bentuk",
  5: "Menara Dua Puluh: Naik ke Puncak",
  6: "Pasar Cahaya: Tambah dan Kurang yang Lebih Besar",
  7: "Sungai Cahaya: Panjang dan Pendek",
  8: "Menara Agung: Peta Cahaya Penutup",
};
export const JUDUL_SUB_K1: Record<string, string> = {
  "1A": "Gerbang Lentera: Hitung, Baca, Tulis Cahaya",
  "1B": "Dua Menara: Lebih Banyak atau Lebih Sedikit?",
  "1C": "Tangga Cahaya: Naik dan Turun",
  "1D": "Kunci Sepasang: Bilangan Berpasangan",
  "2A": "Lentera Datang Berdua",
  "2B": "Tiga Jalan Menuju Jumlah",
  "2C": "Surat dari Kabut: Cerita Menambah",
  "3A": "Lentera Padam Satu-Satu",
  "3B": "Jalan Mundur Menuju Sisa",
  "3C": "Cermin Tambah-Kurang",
  "3D": "Teka-Teki Kabut: Cerita Mengurangi",
  "4A": "Siapa Berbentuk Apa?",
  "4B": "Rak Pilah Si Penjaga",
  "4C": "Menara dari Kepingan",
  "5A": "Lantai Atas Menyala: Hitung, Baca, Tulis sampai Dua Puluh",
  "5B": "Lift Cahaya: Maju dan Mundur",
  "5C": "Dua Laci Cahaya: Puluhan dan Satuan",
  "5D": "Lomba Naik Menara: Lebih Besar, Lebih Kecil, Berurutan",
  "6A": "Timbangan Lentera: Lebih, Kurang, Selisih",
  "6B": "Lentera Berlipat: Menjumlah sampai Dua Puluh",
  "6C": "Lentera Surut: Mengurang dari Dua Puluh",
  "7A": "Siapa yang Terpanjang?",
  "7B": "Pita Cahaya: Mengukur Panjang",
  "8A": "Kunang-Kunang Berkelompok",
  "8B": "Lukisan Data di Menara Agung",
};

/* ------------------------------ Lentera ------------------------------ */
const WARNA_NYALA = { badan: "#FEF08A", api: W.emas };
const WARNA_PADAM = { badan: W.abu, api: W.abuTua };

/**
 * Satu lentera: tali, badan, dan api. Berpusat di (x, y) pada ujung tali atas. Id `${id}-tl`, `${id}-bd`, `${id}-ap`.
 * Lentera menyala bila `menyala`; `s` = skala (1 = badan 14 x 16).
 */
export function lentera(id: string, x: number, y: number, menyala = false, s = 1): Obj[] {
  const w = 14 * s;
  const h = 16 * s;
  const c = menyala ? WARNA_NYALA : WARNA_PADAM;
  return [
    garis(`${id}-tl`, x, y, x, y + 5 * s, W.coklat, 1.4),
    kotak(`${id}-bd`, x - w / 2, y + 5 * s, w, h, c.badan, W.biru, { rx: 4 * s, tebal: 1.4, sorot: menyala }),
    bulat(`${id}-ap`, x, y + 5 * s + h / 2, 3.6 * s, c.api, undefined, { tebal: 0 }),
  ];
}
export const idLentera = (id: string): string[] => [`${id}-tl`, `${id}-bd`, `${id}-ap`];

/** Menyalakan lentera yang sudah ada (ubah warna dan sorot). */
export const nyalakan = (at: string | number | undefined, ...ids: string[]): Aksi => ({
  at,
  ubah: ids.flatMap((id) => [
    { id: `${id}-bd`, warna: WARNA_NYALA.badan, sorot: true },
    { id: `${id}-ap`, warna: WARNA_NYALA.api },
  ]),
});
/** Memadamkan lentera yang sudah ada. */
export const padamkan = (at: string | number | undefined, ...ids: string[]): Aksi => ({
  at,
  ubah: ids.flatMap((id) => [
    { id: `${id}-bd`, warna: WARNA_PADAM.badan, sorot: false },
    { id: `${id}-ap`, warna: WARNA_PADAM.api },
  ]),
});

/**
 * Papan Lentera: `n` tempat lentera dalam dua baris (paling banyak lima per baris), bernomor lambang 1 sampai n di bawahnya.
 * Lentera ke-i berid `${id}${i}`; nomor berid `${id}${i}-no`. `menyala` = banyaknya lentera pertama yang sudah menyala.
 */
export function papanLentera(id: string, n = 10, menyala = 0, x0 = 40, y0 = 62, jarak = 55): Obj[] {
  const hasil: Obj[] = [];
  for (let i = 1; i <= n; i += 1) {
    const kol = (i - 1) % 5;
    const bar = Math.floor((i - 1) / 5);
    const x = x0 + kol * jarak;
    const y = y0 + bar * 62;
    hasil.push(...lentera(`${id}${i}`, x, y, i <= menyala, 1.15), teks(`${id}${i}-no`, x, y + 42, String(i), 10, W.biru));
  }
  return hasil;
}
export const idPapan = (id: string, n = 10): string[] => Array.from({ length: n }, (_, i) => [...idLentera(`${id}${i + 1}`), `${id}${i + 1}-no`]).flat();
