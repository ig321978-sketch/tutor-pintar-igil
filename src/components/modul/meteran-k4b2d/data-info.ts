/**
 * Data Infografis Kelas 4 Bab 2 Sub-Bab D "Meteran Kain Pak Bagas": DUA kartu, tiap kartu satu layar tanpa gulir, dari potongan kain dan angka Story D.
 * Kartu 1 "Papan kisi" = lima gambar sungguhan (dua pita sepuluh kolom: tujuh dan tiga kolom diwarnai; tiga kisi seratus kotak: tiga puluh lima, dua puluh tujuh, dan sembilan kotak diwarnai),
 * tiap gambar punya dua isian tertutup (pecahan dan desimal). Kartu 2 "Jembatan desimal" = enam jembatan (penyebut sepuluh dan seratus memberi satu dan dua angka, satu per sepuluh, tujuh per seratus,
 * dan dua arah balik: nol koma dua lima dan nol koma nol tiga ke pecahan). Digital saja: suara dan kanvas hanya di CPA. Diuji: scripts/uji-meteran-k4b2d.mjs.
 */
import { desimalDari, ucapkan as ucap, type Penyebut } from "./logika-cpa";

/** Ucapan tanpa digit yang diawali huruf kapital. */
const ucapkan = (t: string): string => {
  const u = ucap(t);
  return u.charAt(0).toUpperCase() + u.slice(1);
};

export type Sel = { t: string; pec?: [number, number]; suara: string };
export type Gambar = { id: string; nama: string; bentuk: "pita" | "kisi"; p: number; den: Penyebut; sel: [Sel, Sel] };

const g = (id: string, nama: string, p: number, den: Penyebut, cerita: string): Gambar => ({
  id,
  nama,
  bentuk: den === 10 ? "pita" : "kisi",
  p,
  den,
  sel: [
    { t: `${p}/${den}`, pec: [p, den], suara: ucapkan(`${cerita} ${p} dari ${den} bagian, ${p}/${den}.`) },
    { t: desimalDari(p, den), suara: ucapkan(`${p}/${den} ditulis ${desimalDari(p, den)}, dengan ${den === 10 ? "satu" : "dua"} angka di belakang koma.`) },
  ],
});

/** Kartu 1: dua pita dan tiga kisi, semuanya dari Story D. */
export const GAMBAR: Gambar[] = [
  g("tujuh", "pita tujuh kolom", 7, 10, "Laras mewarnai"),
  g("tiga", "pita tiga kolom", 3, 10, "Pak Bagas memotong"),
  g("tiga-lima", "kisi tiga puluh lima", 35, 100, "Genta mewarnai"),
  g("dua-tujuh", "kisi dua puluh tujuh", 27, 100, "Pak Bagas memotong"),
  g("sembilan", "kisi sembilan", 9, 100, "Satria mengubah"),
];

/** Kartu 2: satu baris jembatan; `kiri` terlihat, `kanan` tertutup. */
export type Jembatan = { id: string; kiri: { t: string; pec?: [number, number] }; kanan: Sel };
const pecSel = (p: number, den: number, suara: string): Sel => ({ t: `${p}/${den}`, pec: [p, den], suara: ucapkan(suara) });
export const JEMBATAN_INFO: Jembatan[] = [
  { id: "sepuluh", kiri: { t: "Penyebut 10" }, kanan: { t: "1 angka", suara: ucapkan("Penyebut 10 memberi 1 angka di belakang koma, itu persepuluhan.") } },
  { id: "seratus", kiri: { t: "Penyebut 100" }, kanan: { t: "2 angka", suara: ucapkan("Penyebut 100 memberi 2 angka di belakang koma, itu perseratusan.") } },
  { id: "satu", kiri: { t: "1/10", pec: [1, 10] }, kanan: { t: desimalDari(1, 10), suara: ucapkan(`1/10 ditulis ${desimalDari(1, 10)}.`) } },
  { id: "tujuh", kiri: { t: "7/100", pec: [7, 100] }, kanan: { t: desimalDari(7, 100), suara: ucapkan(`7/100 ditulis ${desimalDari(7, 100)}, dengan nol penjaga di depan angka 7.`) } },
  { id: "dua-lima", kiri: { t: "0,25" }, kanan: pecSel(25, 100, "0,25 dibaca 25/100, karena ada 2 angka di belakang koma.") },
  { id: "tiga", kiri: { t: "0,03" }, kanan: pecSel(3, 100, "0,03 artinya 3/100, bukan 3/10.") },
];

export const PETUNJUK_INFO_1 = "Ketuk tanda tanya di bawah tiap gambar.";
export const PETUNJUK_INFO_2 = "Ketuk tanda tanya di ujung tiap jembatan.";
export const SELESAI_INFO_1 = "Semua isian terbuka! Pecahan dan desimal itu sama besar.";
export const SELESAI_INFO_2 = "Semua jembatan terbuka! Siap melanjutkan.";
