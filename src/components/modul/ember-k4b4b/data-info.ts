/**
 * Data Infografis (pola label kosong) Kelas 4 Bab 4 Sub-Bab B "Ember Pak Anto": DUA kartu, tiap kartu satu layar tanpa gulir.
 * Kartu 1 = tabel DATA bersambung dari Sub-Bab A: lantai Tepi kolam anak (3 x 4 = 12 m²), Ruang ganti (2 x 5 = 10 m²), dan Pojok pelampung (4 x 4 = 16 m²)
 * menjadi alas bak berisi kubus satuan (baris kali kolom kubus tiap lapisan) dengan tinggi dua lapisan: volume = kubus tiap lapisan x dua lapisan, dan 1 cm³ = 1 ml.
 * Kartu 2 = kartu acuan takaran (gelas takar, ember, 1 l = 1.000 ml, 1 cm³ = 1 ml). Digital saja: suara dan kanvas hanya di CPA.
 * Diuji: scripts/uji-ember-k4b4b.mjs.
 */
import { fmt, perLapisan, ucapkan as ucap, volumeBlok } from "./logika-cpa";

/** Ucapan tanpa digit yang diawali huruf kapital. */
const ucapkan = (t: string): string => {
  const u = ucap(t);
  return u.charAt(0).toUpperCase() + u.slice(1);
};

/** Lantai dari Infografis Sub-Bab A (luas = baris x kolom); dipakai lagi sebagai alas bak di Sub-Bab B. */
export type AlasBak = { nama: string; ikon: string; baris: number; kolom: number };
export const ALAS_BAK: AlasBak[] = [
  { nama: "Tepi kolam anak", ikon: "\u{1F3CA}", baris: 3, kolom: 4 },
  { nama: "Ruang ganti", ikon: "\u{1F455}", baris: 2, kolom: 5 },
  { nama: "Pojok pelampung", ikon: "\u{2B55}", baris: 4, kolom: 4 },
];
/** Tinggi tiap bak: banyak lapisan kubus satuan. */
export const LAPIS_BAK = 2;

export const KOLOM_INFO = ["Bak", "Alas", "Volume", "Isi air"];
export const GRID_INFO = "grid-cols-[4.6rem_1fr_1fr_1fr]";

export type BarisData = {
  nama: string;
  ikon: string;
  alas: string;
  perLapis: number;
  lapisan: string;
  volume: number;
  volumeTeks: string;
  isiTeks: string;
  suaraNama: string;
  suaraAlas: string;
  suaraVolume: string;
  suaraIsi: string;
};

/** Baris tabel: semua angka dihitung dari alas (baris x kolom) dan tinggi (lapisan). */
export const BARIS_DATA: BarisData[] = ALAS_BAK.map((b) => {
  const per = perLapisan(b.kolom, b.baris);
  const vol = volumeBlok(b.kolom, b.baris, LAPIS_BAK);
  return {
    nama: b.nama,
    ikon: b.ikon,
    alas: `${b.baris} × ${b.kolom}`,
    perLapis: per,
    lapisan: `${per} kubus`,
    volume: vol,
    volumeTeks: `${fmt(vol)} cm³`,
    isiTeks: `${fmt(vol)} ml`,
    suaraNama: `${b.nama}.`,
    suaraAlas: ucapkan(`Alasnya ${b.baris} × ${b.kolom}, ${per} kubus satuan tiap lapisan.`),
    suaraVolume: ucapkan(`${LAPIS_BAK} lapisan, jadi volumenya ${per} × ${LAPIS_BAK} = ${fmt(vol)} cm³.`),
    suaraIsi: ucapkan(`Satu cm³ sama dengan satu ml, jadi isinya ${fmt(vol)} ml.`),
  };
});

/** Kartu 2: kartu acuan takaran. Tiap baris: gambar, tulisan (dengan satuan), dan ucapan (tanpa digit). */
export type BarisAcuan = { ikon: string; teks: string; suara: string };
export const KARTU_ACUAN: BarisAcuan[] = [
  { ikon: "\u{1F95B}", teks: "1 gelas = 250 ml", suara: ucapkan("Satu gelas takar sama dengan 250 ml.") },
  { ikon: "\u{1F37C}", teks: "8 gelas = 2.000 ml = 2 l", suara: ucapkan("Delapan gelas sama dengan 2.000 ml, dan itu sama dengan 2 l.") },
  { ikon: "\u{1F522}", teks: "1 l = 1.000 ml", suara: ucapkan("Satu liter sama dengan 1.000 ml.") },
  { ikon: "\u{1F3B2}", teks: "1 cm³ = 1 ml", suara: ucapkan("Satu sentimeter kubik sama dengan satu mililiter.") },
];

export const PETUNJUK_INFO_1 = "Tabel bak Pak Anto. Alasnya dari lantai Sub-Bab sebelumnya. Ketuk tanda tanya di tiap kotak untuk melihat isinya.";
export const PETUNJUK_INFO_2 = "Kartu takaran. Ketuk tiap baris untuk mendengarnya.";
export const SELESAI_INFO_1 = "Tabel lengkap! Volume sama dengan kubus tiap lapisan kali banyak lapisan.";
export const PESAN_INFO_2 = "Satuan selalu ditulis di belakang bilangan.";
