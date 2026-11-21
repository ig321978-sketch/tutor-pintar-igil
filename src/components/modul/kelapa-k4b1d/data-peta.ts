/**
 * Data Mind-map dan Infografis Kelas 4 Bab 1 Sub-Bab D "Kios Kelapa Pak Darwis" (dirancang ulang per Sub-Bab, tanpa komponen kartu bersama).
 * Mind-map: gambar KIOS KELAPA (atap rumbia, papan panen 5.270, empat keranjang berisi 5, 2, 7, 0, pohon kelapa, bagan bagian utuh) dengan enam label kosong yang menempel pada bagian gambarnya
 * lewat tanda panah; diketuk, judul langkah muncul dan dibacakan Guru. Isi = LANGKAH rangkuman semua metode Sub-Bab D (Pecah Bilangan, Susun Bilangan, Bagan Bagian Utuh) dan isi materi (komposisi, dekomposisi, nol).
 * Infografis: dua kartu dari benda dan angka Story. Kartu 1 = papan keranjang (angka dan harga tiap tempat dari 5.270, cara lain 4.000 + 1.270, uraian keliru Satria 5.000 + 200 + 7).
 * Kartu 2 = kartu acuan lima aturan (menguraikan, menyusun, bagan, memeriksa, uang 7.300 dengan lembar dan keping). Digital saja. Suara tanpa digit lewat ejaK4B1. Diuji: scripts/uji-visual-k4b1def.mjs.
 */
import { ejaK4B1 } from "../eja-k4b1";

/** Pecah judul menjadi baris pendek (paling banyak maks huruf per baris) agar muat di label gambar. */
export function bungkusJudul(judul: string, maks: number): string[] {
  const baris: string[] = [];
  let b = "";
  for (const k of judul.split(" ")) {
    if (b && `${b} ${k}`.length > maks) {
      baris.push(b);
      b = k;
    } else b = b ? `${b} ${k}` : k;
  }
  if (b) baris.push(b);
  return baris;
}
export const rb = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export type LangkahPeta = { judul: string; arti: string };
/** Enam langkah Mind-map (urutan sama dengan PIN_KELAPA). Arti dibacakan Guru (diejakan, tanpa digit). */
export const LANGKAH_KELAPA: LangkahPeta[] = [
  { judul: "Pecah per tempat", arti: "Langkah satu. Menguraikan bilangan berarti memecahnya per tempat angka, menjadi ribuan, ratusan, puluhan, dan satuan." },
  { judul: "Harga angka ikut tempatnya", arti: "Langkah dua. Angka tujuh di tempat puluhan berarti tujuh puluh, bukan tujuh. Harga satu angka mengikuti tempatnya." },
  { judul: "Tempat kosong diisi nol", arti: "Langkah tiga. Tempat tanpa bagian diisi nol saat menyusun. Saat menguraikan, bagian nol tidak perlu ditulis." },
  { judul: "Susun: gabung semua bagian", arti: "Langkah empat. Menyusun bilangan berarti menggabungkan semua bagian, dari ribuan sampai satuan, menjadi satu bilangan utuh." },
  { judul: "Bagan: banyak cara", arti: "Langkah lima. Di bagan bagian utuh, bilangan utuh ada di kotak besar dan dua bagian di kotak kecil. Bagian yang hilang dicari dengan mengurangkan, dan satu bilangan boleh diuraikan dengan banyak cara. Uang pun boleh diuraikan dengan lembar dan keping, juga dengan banyak cara." },
  { judul: "Periksa: jumlahkan lagi", arti: "Langkah enam. Jumlahkan kembali semua bagian. Hasilnya harus sama dengan bilangan semula." },
];

/** Letak label di gambar (viewBox 300 x 452): kotak label, ujung panah ke bagian gambar, dan arah panah. */
export type PinGambar = { x: number; y: number; w: number; h: number; tip: [number, number]; arah: "atas" | "kanan" };
export const LEBAR_GAMBAR_KELAPA = 300;
export const TINGGI_GAMBAR_KELAPA = 452;
export const UKURAN_FONT_LABEL_KELAPA = 12;
export const MAKS_HURUF_BARIS_KELAPA = 14;
export const PIN_KELAPA: PinGambar[] = [
  { x: 56, y: 122, w: 130, h: 34, tip: [118, 110], arah: "atas" },
  { x: 96, y: 236, w: 130, h: 34, tip: [188, 227], arah: "atas" },
  { x: 168, y: 282, w: 130, h: 34, tip: [260, 227], arah: "atas" },
  { x: 8, y: 326, w: 130, h: 34, tip: [60, 318], arah: "atas" },
  { x: 8, y: 372, w: 130, h: 34, tip: [148, 384], arah: "kanan" },
  { x: 8, y: 414, w: 130, h: 34, tip: [148, 424], arah: "kanan" },
];
export const JUDUL_PETA_KELAPA = "Kios Kelapa Pak Darwis";
export const PETUNJUK_PETA_KELAPA = "Ini kios kelapa Pak Darwis. Ketuk tanda tanya di tiap bagian untuk melihat langkahnya.";
export const SELESAI_PETA_KELAPA = "Kios lengkap! Enam langkah sudah kamu buka.";

/* ------------------------------ Infografis ------------------------------ */
export const BILANGAN_KELAPA = 5270;
export const NAMA_TEMPAT_KELAPA = ["ribuan", "ratusan", "puluhan", "satuan"] as const;
export type TempatKelapa = { nama: string; angka: number; harga: number };
/** Empat tempat angka dari 5.270 (5 ribuan, 2 ratusan, 7 puluhan, 0 satuan). */
export const TEMPAT_KELAPA: TempatKelapa[] = String(BILANGAN_KELAPA)
  .split("")
  .map((d, i) => ({ nama: NAMA_TEMPAT_KELAPA[i], angka: Number(d), harga: Number(d) * 10 ** (3 - i) }));
export const CARA_LAIN_KELAPA = "4.000 + 1.270";
export const URAIAN_SALAH_KELAPA = "5.000 + 200 + 7";

export type SelKelapa = { kunci: string; isi: string; suara: string; aria: string };
export const suaraAngkaKelapa = (t: TempatKelapa): string =>
  t.angka === 0 ? ejaK4B1(`Di tempat ${t.nama} ada angka 0, jadi tempatnya kosong.`) : ejaK4B1(`Di tempat ${t.nama} ada angka ${t.angka}.`);
export const suaraHargaKelapa = (t: TempatKelapa): string =>
  t.harga === 0 ? ejaK4B1(`Tempat ${t.nama} kosong, jadi harganya 0 dan tidak perlu ditulis.`) : ejaK4B1(`Harga angka di ${t.nama} adalah ${rb(t.harga)}.`);
/** Sepuluh kotak kartu 1: empat angka, empat harga, cara lain, uraian keliru. */
export const SEL_KARTU1_KELAPA: SelKelapa[] = [
  ...TEMPAT_KELAPA.map((t, i) => ({ kunci: `a-${i}`, isi: String(t.angka), suara: suaraAngkaKelapa(t), aria: `Angka di ${t.nama}: ${t.angka}` })),
  ...TEMPAT_KELAPA.map((t, i) => ({ kunci: `h-${i}`, isi: rb(t.harga), suara: suaraHargaKelapa(t), aria: `Harga di ${t.nama}: ${rb(t.harga)}` })),
  { kunci: "lain", isi: CARA_LAIN_KELAPA, suara: ejaK4B1(`Cara lain: ${CARA_LAIN_KELAPA} = ${rb(BILANGAN_KELAPA)}. Bilangan yang sama boleh diuraikan dengan banyak cara.`), aria: `Cara lain: ${CARA_LAIN_KELAPA}` },
  { kunci: "salah", isi: URAIAN_SALAH_KELAPA, suara: ejaK4B1(`Uraian ini keliru: ${URAIAN_SALAH_KELAPA}. Angka 7 ada di puluhan, jadi harganya 70, bukan 7.`), aria: `Uraian keliru: ${URAIAN_SALAH_KELAPA}` },
];

export type AturanKelapa = { kunci: string; nama: string; ikon: string; isi: string; suara: string };
/** Kartu 2: lima aturan dari Story: empat dihitung dari 5.270 dan satu dari uang pembayaran 7.300. */
export const ATURAN_KELAPA: AturanKelapa[] = [
  { kunci: "urai", nama: "Menguraikan", ikon: "\u{2702}", isi: "5.270 = 5.000 + 200 + 70", suara: ejaK4B1("Menguraikan: 5.270 = 5.000 + 200 + 70. Bagian nol tidak ditulis.") },
  { kunci: "susun", nama: "Menyusun", ikon: "\u{1F9E9}", isi: "5.000 + 200 + 70 = 5.270", suara: ejaK4B1("Menyusun: 5.000 + 200 + 70 = 5.270. Semua bagian digabung, tempat kosong diisi nol.") },
  { kunci: "bagan", nama: "Bagan bagian utuh", ikon: "\u{1F4CA}", isi: "5.270 − 4.000 = 1.270", suara: ejaK4B1("Bagan bagian utuh: bagian yang hilang dicari dengan mengurangkan. 5.270 − 4.000 = 1.270.") },
  { kunci: "periksa", nama: "Memeriksa", ikon: "\u{2705}", isi: "4.000 + 1.270 = 5.270", suara: ejaK4B1("Memeriksa: jumlahkan kembali. 4.000 + 1.270 = 5.270, sama dengan bilangan semula.") },
  { kunci: "uang", nama: "Uang", ikon: "\u{1F4B0}", isi: "7.300 = 6.000 + 1.000 + 300", suara: ejaK4B1("Uang: 7.300 rupiah bisa 3 lembar 2.000, 1 keping 1.000, dan 3 keping 100. Ada cara lain, 2 lembar 2.000, 3 keping 1.000, dan 3 keping 100, hasilnya sama.") },
];
export const JUDUL_INFO1_KELAPA = "Papan panen Pak Darwis";
export const PETUNJUK1_INFO_KELAPA = "Papan keranjang. Ketuk tanda tanya untuk melihat angka dan harga tiap tempat, cara lain, dan uraian yang keliru.";
export const PETUNJUK2_INFO_KELAPA = "Kartu aturan. Ketuk tanda tanya untuk melihat lima aturan menyusun dan menguraikan bilangan, juga uang.";
export const SELESAI1_INFO_KELAPA = "Papan lengkap! Harga angka mengikuti tempatnya.";
export const SELESAI2_INFO_KELAPA = "Kartu aturan lengkap! Uraikan, susun, cari bagian, lalu periksa.";
