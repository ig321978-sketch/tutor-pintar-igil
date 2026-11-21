/**
 * Data Mind-map dan Infografis Kelas 4 Bab 4 Sub-Bab A "Lantai Ubin Bu Sinta" (pola label kosong, komponen bersama peta-label/PetaLabel.tsx dan peta-label/InfoKartu.tsx).
 * Mind-map: gambar tangga satuan di tepi kolam dengan empat label kosong; anak mengetuk, judul langkah muncul dan dibacakan Guru. Isi = langkah rangkuman semua metode Sub-Bab A.
 * Infografis: dua kartu. Kartu 1 = tabel DATA luas lantai dari cerita (gambar, kata, angka, dan satuan; judul kolom tampil, isi sel kosong sampai diketuk); data bersambung dan menjadi bahan Sub-Bab B.
 * Kartu 2 = kartu acuan (baris kali kolom dan satu meter persegi sama dengan sepuluh ribu sentimeter persegi). Digital saja.
 * Suara tanpa digit: satuan dieja lewat eja-k4b4.ts. Diuji: scripts/uji-ubin-k4b4a.mjs.
 */
import { ejaK4B4 } from "../eja-k4b4";

export type LangkahPeta = { judul: string; arti: string; ikon: string };

/** Empat langkah Mind-map: Cover the Floor, Rows and Columns, satuan baku, dan Unit Square Ladder. Arti dibacakan Guru (tanpa digit). */
export const LANGKAH_UBIN: LangkahPeta[] = [
  {
    judul: "Tutup lantai dengan ubin",
    arti: "Langkah satu. Tutup lantai dengan ubin sama besar, tanpa celah dan tanpa tumpang tindih. Banyak ubin itulah luasnya.",
    ikon: "\u{1F9F1}",
  },
  {
    judul: "Hitung baris kali kolom",
    arti: "Langkah dua. Hitung banyak baris dan banyak kolom, lalu kalikan. Hasilnya sama dengan menghitung ubin satu per satu.",
    ikon: "\u{1F4CA}",
  },
  {
    judul: "Tulis satuan luasnya",
    arti: "Langkah tiga. Tulis satuan di belakang bilangan, yaitu sentimeter persegi atau meter persegi. Satuan baku memberi hasil yang sama untuk semua orang.",
    ikon: "\u{1F4CF}",
  },
  {
    judul: "Naik turun tangga satuan",
    arti: "Langkah empat. Satu meter persegi sama dengan sepuluh ribu sentimeter persegi. Turun tangga, bilangannya makin banyak. Naik tangga, bilangannya makin sedikit.",
    ikon: "\u{2B07}\u{FE0F}",
  },
];
export const JUDUL_PETA_UBIN = "Tangga Luas Kolam";
export const IKON_JUDUL_PETA_UBIN = "\u{1F3CA}";
export const PETUNJUK_PETA_UBIN = "Tangga ubin di tepi kolam. Ketuk tanda tanya di tiap anak tangga untuk melihat langkahnya.";
export const SELESAI_PETA_UBIN = "Sampai di atas! Empat langkah sudah kamu buka.";

/** Tabel luas lantai kolam: tiap ubin satu meter persegi. Kontrak data Sub-Bab A dan B (tepi kolam anak 3 baris 4 kolom, ruang ganti 2 baris 5 kolom, pojok pelampung 4 baris 4 kolom). */
export type TempatInfo = { kunci: string; nama: string; ikon: string; b: number; k: number };
export const SATUAN_INFO = "m²";
export const TEMPAT_UBIN: TempatInfo[] = [
  { kunci: "tepi", nama: "Tepi kolam anak", ikon: "\u{1F3CA}", b: 3, k: 4 },
  { kunci: "ruang", nama: "Ruang ganti", ikon: "\u{1F6AA}", b: 2, k: 5 },
  { kunci: "pojok", nama: "Pojok pelampung", ikon: "\u{2B55}", b: 4, k: 4 },
];
export const luasTempat = (t: TempatInfo): number => t.b * t.k;
export const KOLOM_INFO_UBIN = ["Tempat", "Ubin", "Baris × Kolom", "Luas"];

/** Suara satu sel tabel (tanpa digit): angka dan satuan dieja. */
export function suaraSel(t: TempatInfo, kol: 0 | 1 | 2 | 3): string {
  const luas = luasTempat(t);
  return kol === 0
    ? `Tempat ini adalah ${t.nama.toLowerCase()}.`
    : kol === 1
      ? ejaK4B4(`Lantainya ditutup ${t.b} baris ubin, dan tiap baris berisi ${t.k} ubin.`)
      : kol === 2
        ? ejaK4B4(`${t.b} baris kali ${t.k} kolom.`)
        : ejaK4B4(`Luasnya ${luas} ${SATUAN_INFO}.`);
}

export const PETUNJUK1_INFO_UBIN = "Tabel luas lantai kolam. Ketuk tanda tanya di tiap kotak untuk melihat isinya.";
export const PETUNJUK2_INFO_UBIN = "Kartu acuan. Luas sama dengan baris kali kolom, dan satu meter persegi sama dengan sepuluh ribu sentimeter persegi. Ketuk kalimatnya untuk mendengar.";
export const SELESAI1_INFO_UBIN = "Tabel lengkap! Luas lantai dihitung dari baris kali kolom.";
export const PESAN2_INFO_UBIN = "Ketuk kalimat hijau untuk mendengarnya.";
export const ACUAN_UBIN = {
  contoh: { b: 3, k: 4, u: "m²" as const },
  kalimat: [
    { teks: "Luas = banyak baris × banyak kolom", suara: "Luas sama dengan banyak baris kali banyak kolom." },
    { teks: "3 × 4 = 12 m²", suara: ejaK4B4("3 × 4 = 12 m²") },
    { teks: "1 m² = 10.000 cm²", suara: ejaK4B4("1 m² = 10.000 cm²") },
  ],
};
