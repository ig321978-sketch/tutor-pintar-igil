/**
 * Data Mind-map dan Infografis Kelas 4 Bab 1 Sub-Bab I "Papan Jadwal Kak Yoga" (dirancang ulang, tanpa komponen kartu bersama).
 * Mind-map: "Peta Pantai", lima petak gambar di pasir (dua baris payung, empat pasangan faktor, payung sisa, jam perahu, enam gugus empat payung);
 * tiap petak punya label kosong berupa bendera yang tertancap di atasnya, diketuk: judul langkah muncul dan dibacakan Guru.
 * Infografis: dua kartu dari angka Story. Kartu 1 = papan payung (24 payung ditata 1 x 24, 2 x 12, 3 x 8, 4 x 6; faktor 24 = 1, 2, 3, 4, 6, 8, 12, 24);
 * kartu 2 = jadwal perahu tiap empat jam (4, 8, 12, 16, 20, 24 = kelipatan 4) dan aturannya (tambah berulang, kali, habis dibagi, 5 bukan faktor 24). Digital saja.
 * Suara tanpa digit (eja lewat eja-k4b1.ts). Diuji: scripts/uji-visual-k4b1ghi.mjs.
 */
import { kataBilK4B1 } from "../eja-k4b1";

export type LangkahPeta = { judul: string; arti: string };

/** Lima langkah Mind-map: faktor, pasangan faktor, bukan faktor (ada sisa), kelipatan (tambah berulang), kelipatan habis dibagi. Arti dibacakan Guru (tanpa digit). */
export const LANGKAH_JADWAL: LangkahPeta[] = [
  {
    judul: "Faktor bagi habis",
    arti: "Langkah satu. Faktor adalah bilangan yang membagi habis bilangan itu, tanpa sisa. Dua puluh empat payung ditata dua baris, masing-masing dua belas. Jadi dua dan dua belas adalah faktor dua puluh empat.",
  },
  {
    judul: "Pasangan faktor",
    arti: "Langkah dua. Cari pasangan faktor mulai dari satu. Satu kali dua puluh empat, dua kali dua belas, tiga kali delapan, empat kali enam. Faktornya satu, dua, tiga, empat, enam, delapan, dua belas, dan dua puluh empat.",
  },
  {
    judul: "Ada sisa, bukan faktor",
    arti: "Langkah tiga. Kalau pembagiannya bersisa, bilangan itu bukan faktor. Dua puluh empat dibagi lima sama dengan empat sisa empat, jadi lima bukan faktor dua puluh empat.",
  },
  {
    judul: "Kelipatan empat",
    arti: "Langkah empat. Kelipatan didapat dengan menambah bilangan yang sama berulang kali. Perahu berangkat tiap empat jam, yaitu jam empat, delapan, dua belas, enam belas, dua puluh, dan dua puluh empat.",
  },
  {
    judul: "Kelipatan habis dibagi",
    arti: "Langkah lima. Setiap kelipatan empat habis dibagi empat, tanpa sisa. Dua puluh empat dibagi empat sama dengan enam.",
  },
];
export const JUDUL_PETA_JADWAL = "Peta Pantai Kak Yoga";
export const IKON_JUDUL_PETA_JADWAL = "\u{26F1}\u{FE0F}";
export const PETUNJUK_PETA_JADWAL = "Ketuk bendera di atas tiap petak pasir untuk membuka langkah.";
export const SELESAI_PETA_JADWAL = "Semua bendera sudah berkibar! Lima langkah sudah kamu buka.";

/* ------------------------------ Infografis kartu 1: papan payung ------------------------------ */
export type SelInfo = { isi: string; suara: string };
const kata = kataBilK4B1;
export const TOTAL_PAYUNG_JADWAL = 24;
export type PasanganPayung = { kunci: string; baris: number; kolom: number; sel: SelInfo };
const pasang = (baris: number, kolom: number): PasanganPayung => ({
  kunci: `${baris}x${kolom}`,
  baris,
  kolom,
  sel: {
    isi: `${baris} × ${kolom}`,
    suara: `Pasangan faktor. ${kata(baris)} baris, tiap baris ${kata(kolom)} payung, ditulis ${kata(baris)} kali ${kata(kolom)} sama dengan ${kata(baris * kolom)}.`,
  },
});
/** Empat penataan dua puluh empat payung dari Story (semuanya habis, tanpa sisa). */
export const PASANGAN_JADWAL: PasanganPayung[] = [pasang(1, 24), pasang(2, 12), pasang(3, 8), pasang(4, 6)];
export const DAFTAR_FAKTOR_JADWAL: SelInfo = {
  isi: "1, 2, 3, 4, 6, 8, 12, 24",
  suara: "Semua faktor dua puluh empat: satu, dua, tiga, empat, enam, delapan, dua belas, dan dua puluh empat.",
};
export const JUDUL_PAPAN_JADWAL = "Papan payung";
export const PETUNJUK1_INFO_JADWAL = "Ketuk tanda tanya untuk melihat pasangan faktor tiap susunan payung.";
export const SELESAI1_INFO_JADWAL = "Papan payung lengkap! Semua faktor dua puluh empat sudah kamu temukan.";

/* ------------------------------ Infografis kartu 2: jadwal perahu ------------------------------ */
export const JAM_PERAHU_JADWAL = [4, 8, 12, 16, 20, 24] as const;
export const JAM_INFO_JADWAL: (SelInfo & { jam: number })[] = JAM_PERAHU_JADWAL.map((jam, i) => ({
  jam,
  isi: `${jam}`,
  suara: `Perahu berangkat jam ${kata(jam)}, yaitu empat dikali ${kata(i + 1)}.`,
}));
export type AturanJadwal = { kunci: string; caption: string; isi: string; suara: string };
export const ATURAN_JADWAL: AturanJadwal[] = [
  { kunci: "tambah", caption: "Kelipatan 4 didapat dengan", isi: "menambah 4 berulang kali", suara: "Kelipatan empat didapat dengan menambah empat berulang kali." },
  { kunci: "kali", caption: "Atau dengan mengalikan", isi: "4 × 1, 4 × 2, 4 × 3, ...", suara: "Atau dengan mengalikan empat dengan satu, dua, tiga, dan seterusnya." },
  { kunci: "habis", caption: "Kelipatan 4 dibagi 4", isi: "habis, 24 : 4 = 6", suara: "Kelipatan empat dibagi empat habis tanpa sisa. Dua puluh empat dibagi empat sama dengan enam." },
  { kunci: "lima", caption: "24 : 5 hasilnya", isi: "4 sisa 4, bukan faktor", suara: "Dua puluh empat dibagi lima hasilnya empat sisa empat, jadi lima bukan faktor dua puluh empat." },
];
export const JUDUL_JAM_JADWAL = "Jam berangkat perahu";
export const PETUNJUK2_INFO_JADWAL = "Ketuk tanda tanya di bawah tiap perahu dan di kotak aturan.";
export const SELESAI2_INFO_JADWAL = "Jadwal perahu lengkap! Kelipatan empat habis dibagi empat.";
