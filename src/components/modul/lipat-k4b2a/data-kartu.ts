/**
 * Data Mind-map dan Infografis Kelas 4 Bab 2 Sub-Bab A "Kain Lipat Bu Wulan" (dirancang sendiri, tanpa komponen kartu bersama).
 * Mind-map "Tali Jemuran Bu Wulan": tiga kain putih di tali jemuran (lipat dua, empat, delapan, satu bagian diarsir ungu) dan garis pecahan di bawahnya.
 * Lima label kosong menempel pada bagian gambar yang cocok; diketuk, judul langkah muncul dan dibacakan Guru.
 * Infografis dua kartu dari Story: kartu 1 = tumpukan pita (tiga pita dari kain lipat dua, empat, delapan dan dua kotak banding), kartu 2 = kartu aturan Bu Wulan (pembilang, penyebut, penyebut besar bagian kecil, garis pecahan, tanda banding).
 * Suara tanpa digit: bilangan dan pecahan dieja lewat eja-k4b2.ts. Diuji: scripts/uji-visual-k4b2ab.mjs.
 */
import { ejaK4B2 } from "../eja-k4b2";

export type LangkahPeta = { judul: string; arti: string };

/** Lima langkah Mind-map: Fold the Paper, pembilang dan penyebut, banding (Unit Fraction Strip), Fraction Number Line, mengurutkan. Arti dibacakan Guru. */
export const LANGKAH_LIPAT: LangkahPeta[] = [
  { judul: "Lipat sama besar", arti: "Langkah satu. Lipat kain menjadi bagian yang sama besar. Lalu arsir satu bagian." },
  { judul: "Pembilang dan penyebut", arti: "Langkah dua. Tulis satu bagian itu sebagai pecahan. Angka atas, pembilang, adalah bagian yang diarsir. Angka bawah, penyebut, adalah seluruh bagian." },
  { judul: "Makin banyak, makin kecil", arti: "Langkah tiga. Bandingkan lewat pita. Penyebut lebih besar berarti bagian lebih banyak, jadi tiap bagian lebih kecil." },
  { judul: "Taruh di garis", arti: "Langkah empat. Taruh tiap pecahan pada garis dari nol sampai satu. Makin ke kiri, makin kecil pecahannya." },
  { judul: "Urutkan dari kecil", arti: "Langkah lima. Susun pecahan dari yang terkecil di kiri sampai yang terbesar di kanan." },
];

/** Kain di tali jemuran: banyak bagian sama besar (Story: lipat dua, empat, delapan); satu bagian diarsir. */
export const KAIN_LIPAT: readonly number[] = [2, 4, 8];
/** Letak jepitan pada garis pecahan (pembilang satu, penyebut dari Story) dari kiri ke kanan. */
export const JEPIT_GARIS: readonly number[] = [8, 4, 2];

export const JUDUL_PETA_LIPAT = "Tali Jemuran Bu Wulan";
export const IKON_JUDUL_PETA_LIPAT = "\u{1F9F5}";
export const PETUNJUK_PETA_LIPAT = "Ketuk tanda tanya di kain dan garis untuk melihat langkahnya.";
export const SELESAI_PETA_LIPAT = "Kain sudah terjemur rapi! Lima langkah sudah kamu buka.";

/* ------------------------------ Infografis kartu 1: tumpukan pita ------------------------------ */
/** Pita dari kain yang dilipat jadi n bagian sama besar (Story), satu bagian diarsir: pecahan satu per n. */
export const PITA_LIPAT: readonly number[] = [2, 4, 8];
export const suaraPita = (n: number): string => ejaK4B2(`Kain dilipat menjadi ${n} bagian sama besar. Satu bagian diarsir, ditulis 1/${n}.`);
/** Dua kotak banding antar pita bertetangga: 1/2 dengan 1/4, lalu 1/4 dengan 1/8 (yang kedua persis salah Satria di Story). */
export const BANDING_PITA: readonly { besar: number; kecil: number; teks: string; suara: string }[] = [
  { besar: 2, kecil: 4, teks: "1/2 > 1/4", suara: ejaK4B2("1/2 > 1/4. Pita satu per dua lebih panjang daripada satu per empat.") },
  { besar: 4, kecil: 8, teks: "1/4 > 1/8", suara: ejaK4B2("1/4 > 1/8. Delapan bagian lebih banyak, tapi tiap bagian lebih kecil, jadi satu per delapan lebih pendek.") },
];
export const JUDUL_INFO_PITA = "Tumpukan Pita Bu Wulan";
export const PETUNJUK1_INFO_LIPAT = "Ketuk tanda tanya untuk melihat pecahan dan banding pita.";
export const SELESAI1_INFO_LIPAT = "Pita lengkap! Penyebut makin besar, pita makin pendek.";

/* ------------------------------ Infografis kartu 2: kartu aturan ------------------------------ */
export type AturanLipat = { kunci: string; sebut: string; isi: string; suara: string };
export const ATURAN_LIPAT: readonly AturanLipat[] = [
  { kunci: "pembilang", sebut: "angka atas", isi: "Pembilang: bagian yang diarsir", suara: "Angka atas disebut pembilang. Pembilang adalah banyak bagian yang diarsir." },
  { kunci: "penyebut", sebut: "angka bawah", isi: "Penyebut: seluruh bagian", suara: "Angka bawah disebut penyebut. Penyebut adalah banyak seluruh bagian sama besar." },
  { kunci: "kecil", sebut: "penyebut besar", isi: "Bagian makin kecil", suara: "Penyebut lebih besar berarti bagian lebih banyak, jadi tiap bagian makin kecil." },
  { kunci: "garis", sebut: "garis pecahan", isi: "Ke kiri makin kecil", suara: "Pada garis pecahan, makin ke kiri makin kecil pecahannya." },
  { kunci: "tanda", sebut: "tanda banding", isi: "Sisi terbuka ke yang besar", suara: "Sisi tanda banding yang terbuka selalu menghadap pecahan yang lebih besar, ujung runcingnya ke yang lebih kecil." },
];
export const JUDUL_INFO_ATURAN = "Kartu Aturan Bu Wulan";
export const PETUNJUK2_INFO_LIPAT = "Ketuk tanda tanya untuk melihat aturan Bu Wulan.";
export const SELESAI2_INFO_LIPAT = "Kartu lengkap! Kamu sudah mengenal pembilang, penyebut, dan cara membandingkan.";
