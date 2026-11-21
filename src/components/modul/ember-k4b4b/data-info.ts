/**
 * Data Infografis Kelas 4 Bab 4 Sub-Bab B "Ember Pak Anto": DUA kartu, tiap kartu satu layar tanpa gulir, semuanya dari benda dan angka yang muncul di Story B.
 * Kartu 1 "Deret takaran" = empat bejana (empat gelas takar, botol takar satu liter, ember delapan gelas, balok kubus air) digambar dengan tinggi air atau susunan kubus yang sungguh sesuai data;
 * tiap bejana punya dua angka tertutup (satuan tertulis) yang diketuk. Kartu 2 "Tangga dan kubus" = tangga liter ke mililiter (kali dan bagi seribu), satu cm³ sama dengan satu ml, dan kubus per lapisan.
 * Sambungan dari Sub-Bab A lewat Story (Pak Anto datang dengan ember dan gelas ukur setelah lantai ubin selesai). Digital saja: suara dan kanvas hanya di CPA.
 * Diuji: scripts/uji-ember-k4b4b.mjs.
 */
import { fmt, mlDariL, perLapisan, totalIsi, ucapkan as ucap, volumeBlok } from "./logika-cpa";

/** Ucapan tanpa digit yang diawali huruf kapital. */
const ucapkan = (t: string): string => {
  const u = ucap(t);
  return u.charAt(0).toUpperCase() + u.slice(1);
};

/** Angka Story B: gelas takar 250 ml, ember dua liter diisi delapan gelas, empat gelas sama dengan satu liter, balok kubus 3 x 2 x 2. */
export const TAKAR_GELAS = 250;
export const KUBUS_STORY = { kolom: 3, baris: 2, lapis: 2 } as const;
/** Air tertinggi pada gelas ukur gambar (ml): ember dua liter penuh. */
export const SKALA_ML = 2000;

export type Angka = { teks: string; suara: string };
export type Bejana = { id: string; nama: string; bentuk: "gelas" | "botol" | "ember" | "balok"; ml: number; pecah: number; gelas: number; angka: [Angka, Angka] };

const ml1 = totalIsi(4, TAKAR_GELAS);
const ml2 = totalIsi(8, TAKAR_GELAS);
const vol = volumeBlok(KUBUS_STORY.kolom, KUBUS_STORY.baris, KUBUS_STORY.lapis);

/** Kartu 1: empat bejana. `pecah` = tinggi air dibanding skala (0 sampai 1), dihitung dari ml. Balok kubus tidak memakai tinggi air. */
export const BEJANA: Bejana[] = [
  {
    id: "gelas4",
    nama: "4 gelas",
    bentuk: "gelas",
    ml: ml1,
    pecah: ml1 / SKALA_ML,
    gelas: 4,
    angka: [
      { teks: `${fmt(ml1)} ml`, suara: ucapkan(`4 gelas, tiap gelas ${TAKAR_GELAS} ml, jadi ${fmt(ml1)} ml.`) },
      { teks: `${ml1 / 1000} l`, suara: ucapkan(`${fmt(ml1)} ml sama dengan ${ml1 / 1000} l.`) },
    ],
  },
  {
    id: "botol",
    nama: "botol takar",
    bentuk: "botol",
    ml: mlDariL(1),
    pecah: mlDariL(1) / SKALA_ML,
    gelas: 0,
    angka: [
      { teks: "1 l", suara: ucapkan("Botol takar bertanda 1 l.") },
      { teks: `${fmt(mlDariL(1))} ml`, suara: ucapkan(`1 l dibagi menjadi ${fmt(mlDariL(1))} ml.`) },
    ],
  },
  {
    id: "ember",
    nama: "ember 8 gelas",
    bentuk: "ember",
    ml: ml2,
    pecah: ml2 / SKALA_ML,
    gelas: 8,
    angka: [
      { teks: `${fmt(ml2)} ml`, suara: ucapkan(`8 gelas, tiap gelas ${TAKAR_GELAS} ml, jadi ${fmt(ml2)} ml.`) },
      { teks: `${ml2 / 1000} l`, suara: ucapkan(`${fmt(ml2)} ml sama dengan ${ml2 / 1000} l.`) },
    ],
  },
  {
    id: "balok",
    nama: "balok kubus",
    bentuk: "balok",
    ml: vol,
    pecah: 0,
    gelas: 0,
    angka: [
      { teks: `${vol} cm³`, suara: ucapkan(`Balok 3 × 2 × 2 berisi ${vol} cm³.`) },
      { teks: `${vol} ml`, suara: ucapkan(`1 cm³ sama dengan 1 ml, jadi ${vol} ml.`) },
    ],
  },
];

/** Kartu 2: empat kotak tangga dan kubus. `label` terlihat, `isi` tertutup sampai diketuk. */
export type Kotak2 = { id: string; label: string; isi: string; suara: string };
export const KOTAK_TANGGA: Kotak2[] = [
  { id: "turun", label: "Turun tangga", isi: "× 1.000", suara: ucapkan("Turun tangga dari liter ke mililiter, bilangan dikali 1.000.") },
  { id: "naik", label: "Naik tangga", isi: "÷ 1.000", suara: ucapkan("Naik tangga dari mililiter ke liter, bilangan dibagi 1.000.") },
  { id: "kubik", label: "1 cm³", isi: "= 1 ml", suara: ucapkan("1 cm³ sama dengan 1 ml.") },
  {
    id: "lapis",
    label: "Tiap lapisan",
    isi: `${KUBUS_STORY.kolom} × ${KUBUS_STORY.baris} = ${perLapisan(KUBUS_STORY.kolom, KUBUS_STORY.baris)}`,
    suara: ucapkan(`Tiap lapisan berisi ${KUBUS_STORY.kolom} × ${KUBUS_STORY.baris} = ${perLapisan(KUBUS_STORY.kolom, KUBUS_STORY.baris)} kubus.`),
  },
];

export const PETUNJUK_INFO_1 = "Deret takaran Pak Anto. Ketuk tanda tanya di bawah tiap bejana untuk melihat angkanya.";
export const PETUNJUK_INFO_2 = "Tangga dan kubus. Ketuk tanda tanya untuk melihat aturannya.";
export const SELESAI_INFO_1 = "Semua angka terbuka! Satuan selalu ditulis di belakang bilangan.";
export const SELESAI_INFO_2 = "Aturan lengkap! Siap melanjutkan.";

export const PESAN_INFO_2_SAMA = "Satuan selalu ditulis di belakang bilangan.";
