/**
 * Data Mind-map Kelas 4 Bab 2 Sub-Bab D "Meteran Kain Pak Bagas": gulungan kain bermeteran Pak Bagas dengan lima gambar sungguhan
 * (satu meter dibagi sepuluh dengan tiga bagian diwarnai, kisi seratus kotak dengan dua puluh tujuh kotak diwarnai, dua jembatan pecahan ke desimal, tiga kotak seratus dengan nol penjaga).
 * Tiap gambar punya label kosong yang diketuk; judul langkah muncul dan dibacakan guru. Isi = LANGKAH rangkuman semua metode Story D
 * (Kisi Persepuluhan, satu angka di belakang koma, Kisi Perseratusan, Jembatan Desimal, nol penjaga). Angka gambar dari Story: tiga per sepuluh (nol koma tiga),
 * dua puluh tujuh per seratus (nol koma dua tujuh), salah Satria nol koma nol tiga. Diuji: scripts/uji-meteran-k4b2d.mjs.
 */
import { desimalDari, type Penyebut } from "./logika-cpa";

export type LangkahPeta = { id: "sepuluh" | "satuangka" | "seratus" | "jembatan" | "nol"; judul: string; arti: string };

/** Satu meter kain dibagi sepuluh bagian sama besar, tiga bagian diambil (Story: tiga per sepuluh meter). */
export const PITA = { n: 10, k: 3 } as const;
/** Kisi seratus kotak, dua puluh tujuh kotak diwarnai (Story: dua puluh tujuh per seratus). */
export const KISI = { n: 100, k: 27 } as const;
/** Dua jembatan Story: tiga per sepuluh ke desimal, dua puluh tujuh per seratus ke desimal. */
export const JEMBATAN: { p: number; den: Penyebut; des: string }[] = [
  { p: 3, den: 10, des: desimalDari(3, 10) },
  { p: 27, den: 100, des: desimalDari(27, 100) },
];
/** Nol penjaga: tiga kotak dari seratus ditulis nol koma nol tiga (di Story, Satria keliru menulis nol koma nol tiga untuk tiga per sepuluh). */
export const NOL = { p: 3, den: 100 as Penyebut, des: desimalDari(3, 100) };

export const LANGKAH_METERAN: LangkahPeta[] = [
  { id: "sepuluh", judul: "Bagi sepuluh sama besar", arti: "Langkah satu. Kisi Persepuluhan: bagi satu meter menjadi sepuluh bagian sama besar, lalu hitung bagian yang diambil." },
  { id: "satuangka", judul: "Satu angka di belakang koma", arti: "Langkah dua. Persepuluhan ditulis dengan satu angka di belakang koma. Tiga per sepuluh ditulis nol koma tiga." },
  { id: "seratus", judul: "Bagi seratus sama besar", arti: "Langkah tiga. Kisi Perseratusan: seratus kotak kecil sama besar. Hitung kotak yang diwarnai, ditulis dengan dua angka di belakang koma." },
  { id: "jembatan", judul: "Jembatan Desimal", arti: "Langkah empat. Jembatan Desimal: pecahan di satu sisi dan desimal di sisi lain. Penyebut sepuluh memberi satu angka, penyebut seratus memberi dua angka." },
  { id: "nol", judul: "Jaga nol di depan", arti: "Langkah lima. Kalau tempatnya kurang, tulis nol penjaga. Tiga per seratus ditulis nol koma nol tiga, bukan nol koma tiga." },
];

export const JUDUL_PETA = "Meteran Kain Pak Bagas";
export const IKON_JUDUL_PETA = "\u{1F4CF}";
export const PETUNJUK_PETA = "Ketuk tanda tanya di tiap gambar untuk melihat langkahnya.";
export const SELESAI_PETA = "Meteran kain lengkap! Lima langkah sudah kamu buka.";
