/**
 * Data Mind-map dan Infografis Kelas 4 Bab 5 Sub-Bab A "Etalase Keramik Bu Dewi" (pola label kosong, komponen bersama peta-label/PetaLabel.tsx dan peta-label/InfoKartu.tsx).
 * Mind-map: gambar rak etalase dengan empat label kosong; anak mengetuk, judul langkah muncul dan dibacakan Guru. Isi = langkah rangkuman semua metode Sub-Bab A.
 * Infografis: dua kartu. Kartu 1 = tabel DATA keramik dari cerita (gambar bangun, nama, banyak sisi, pasang sisi sejajar; judul kolom tampil, isi sel kosong sampai diketuk);
 * data bersambung dan menjadi bahan Sub-Bab B (persegi, jajargenjang, trapesium, segienam beraturan). Kartu 2 = kartu acuan ciri segiempat dan segitiga. Tabel kartu 1 juga memuat segitiga sama sisi (3 sisi, 0 pasang sejajar). Digital saja.
 * Angka tabel SELALU dihitung dari koordinat bangun (logika-bangun.ts). Suara tanpa digit. Diuji: scripts/uji-etalase-k4b5a.mjs.
 */
import { ejaK4B5 } from "../eja-k4b5";
import { banyakSejajar, banyakSisi, bangun } from "./logika-bangun";

export type LangkahPeta = { judul: string; arti: string; ikon: string };

/** Lima langkah Mind-map: mengenali segi banyak, memilah menurut sisi, menggolongkan segitiga, memeriksa sisi dan sudut, dan pohon keluarga bentuk. Arti dibacakan Guru (tanpa digit). */
export const LANGKAH_ETALASE: LangkahPeta[] = [
  {
    judul: "Kenali bangun tertutup",
    arti: "Langkah satu. Kenali bangun yang tepinya berupa ruas garis lurus dan tertutup rapat. Bangun itu disebut segi banyak, dan paling sedikit punya tiga sisi. Kalau semua sisi dan sudutnya sama, namanya beraturan.",
    ikon: "\u{1F537}",
  },
  {
    judul: "Pilah menurut sisinya",
    arti: "Langkah dua. Pilah keramik menurut banyak sisinya: bersisi tiga disebut segitiga, bersisi empat segiempat, dan bersisi lima segilima. Setiap keramik masuk ke satu golongan saja.",
    ikon: "\u{1F9F1}",
  },
  {
    judul: "Golongkan segitiga",
    arti: "Langkah tiga. Golongkan segitiga menurut sisinya: sama sisi, sama kaki, atau sembarang. Golongkan juga menurut sudutnya: siku-siku, lancip, atau tumpul.",
    ikon: "\u{1F53A}",
  },
  {
    judul: "Periksa sisi dan sudut",
    arti: "Langkah empat. Periksa sisi yang sama panjang, sisi yang sejajar, dan sudut siku-siku dengan penggaris dan penyiku. Ciri-ciri itulah yang menentukan nama segiempatnya.",
    ikon: "\u{1F4D0}",
  },
  {
    judul: "Telusuri pohon keluarga",
    arti: "Langkah lima. Telusuri pohon keluarga bentuk, dari segiempat sampai bangun yang lebih khusus. Bangun yang lebih khusus punya semua ciri bangun di atasnya, ditambah satu ciri baru.",
    ikon: "\u{1F333}",
  },
];
export const JUDUL_PETA_ETALASE = "Rak Etalase Bu Dewi";
export const IKON_JUDUL_PETA_ETALASE = "\u{1F3FA}";
export const PETUNJUK_PETA_ETALASE = "Rak etalase Bu Dewi. Ketuk tanda tanya di tiap rak untuk melihat langkahnya.";
export const SELESAI_PETA_ETALASE = "Rak etalase penuh! Lima langkah sudah kamu buka.";

/** Tabel keramik etalase: kontrak data Sub-Bab A dan B (persegi 4 sisi 2 pasang sejajar, jajargenjang 4 sisi 2 pasang, trapesium 4 sisi 1 pasang, segienam beraturan 6 sisi 3 pasang). */
export type KeramikInfo = { kunci: string; nama: string; bangun: string };
export const KERAMIK_INFO: KeramikInfo[] = [
  { kunci: "persegi", nama: "Persegi", bangun: "persegi" },
  { kunci: "jajargenjang", nama: "Jajargenjang", bangun: "jajargenjang" },
  { kunci: "trapesium", nama: "Trapesium", bangun: "trapesium" },
  { kunci: "segienam", nama: "Segienam beraturan", bangun: "segienam-beraturan" },
  { kunci: "segitiga", nama: "Segitiga sama sisi", bangun: "segitiga-sama-sisi" },
];
/** Banyak sisi dan banyak pasang sisi sejajar, dihitung dari koordinat bangun. */
export const sisiInfo = (k: KeramikInfo): number => banyakSisi(bangun(k.bangun).titik);
export const sejajarInfo = (k: KeramikInfo): number => banyakSejajar(bangun(k.bangun).titik);
export const KOLOM_INFO_ETALASE = ["Keramik", "Nama", "Sisi", "Sisi sejajar"];

/** Suara satu sel tabel (tanpa digit): angka dieja. */
export function suaraSel(k: KeramikInfo, kol: 0 | 1 | 2 | 3): string {
  const nama = k.nama.toLowerCase();
  const p = sejajarInfo(k);
  return kol === 0
    ? `Inilah bentuk keramik ${nama}.`
    : kol === 1
      ? `Namanya ${nama}.`
      : kol === 2
        ? ejaK4B5(`Sisinya ada ${sisiInfo(k)}.`)
        : p === 0
          ? "Tidak ada sisi yang sejajar."
          : p === 1
          ? "Ada sepasang sisi yang sejajar."
          : ejaK4B5(`Ada ${p} pasang sisi yang sejajar.`);
}

export const PETUNJUK1_INFO_ETALASE = "Tabel keramik etalase. Ketuk tanda tanya di tiap kotak untuk melihat isinya.";
export const PETUNJUK2_INFO_ETALASE = "Kartu acuan. Ketuk kalimat hijau untuk mendengar ciri segiempat dan segitiga.";
export const SELESAI1_INFO_ETALASE = "Tabel lengkap! Banyak sisi dan sisi sejajar menjadi ciri tiap keramik.";
export const PESAN2_INFO_ETALASE = "Ketuk kalimat hijau untuk mendengarnya.";
export const ACUAN_ETALASE = {
  contoh: "persegi",
  kalimat: [
    { teks: "Persegi: 4 sisi sama panjang, 4 sudut siku-siku", suara: ejaK4B5("Persegi punya 4 sisi sama panjang dan 4 sudut siku-siku.") },
    { teks: "Jajargenjang: sudutnya tidak siku-siku", suara: "Jajargenjang punya dua pasang sisi sejajar, tetapi sudutnya tidak siku-siku." },
    { teks: "Belah ketupat: 4 sisi sama panjang", suara: ejaK4B5("Belah ketupat punya 4 sisi sama panjang, tetapi sudutnya tidak siku-siku.") },
    { teks: "Segitiga sama sisi: 3 sisi sama panjang", suara: ejaK4B5("Segitiga sama sisi punya 3 sisi sama panjang.") },
    { teks: "Segitiga siku-siku: 1 sudut siku-siku", suara: ejaK4B5("Segitiga siku-siku punya 1 sudut siku-siku.") },
  ],
};
