/**
 * Data Infografis (label kosong, papan congklak dan kotak bingkisan) Kelas 5 Bab 2 Sub-Bab D "Kotak Bingkisan Pak Joko": DUA kartu, tiap kartu satu layar tanpa gulir.
 * Data bersambung dari Sub-Bab A sampai C (klepon dan onde-onde Bu Wati; faktor 12 dan 18 dari Sub-Bab C): Pak Joko membawa 24 klepon dan 18 onde-onde.
 * Kartu 1 = papan congklak faktor 24 dan 18 (lubang 1 sampai 24; biji merah di faktor 24, biji putih di faktor 18, lubang berisi dua biji adalah faktor persekutuan 1, 2, 3, 6, dan FPB 6).
 * Kartu 2 = enam kotak bingkisan (24 : 6 = 4 klepon dan 18 : 6 = 3 onde-onde) dan tabel FPB: 8 dan 20 (faktor persekutuan 1, 2, 4; FPB 4), 12 dan 18 (1, 2, 3, 6; FPB 6),
 * serta tiga bilangan 12, 18, dan 24 (FPB 6), dan catatan bahwa FPB bukan faktor persekutuan pertama setelah satu.
 * Semua isi dan hitungan dari logika-data.ts. Digital saja: suara dan kanvas hanya di CPA. Diuji: scripts/uji-kotak-k5b2d.mjs.
 */
import { ucapkan } from "./logika-cpa";
import { bagiSamaRata, daftarTeks, faktorDari, fpb, fpbPertamaSetelahSatu, papanCongklak, persekutuan, type Lubang } from "./logika-data";

/** Ucapan tanpa digit yang diawali huruf kapital. */
const ucap = (t: string): string => {
  const u = ucapkan(t);
  return u.charAt(0).toUpperCase() + u.slice(1);
};

/** Data bersambung (kontrak data bab): kue Pak Joko. */
export const KLEPON = 24;
export const ONDE = 18;
export const FAKTOR_KLEPON = faktorDari(KLEPON);
export const FAKTOR_ONDE = faktorDari(ONDE);
export const SAMA_KOTAK = persekutuan([KLEPON, ONDE]);
export const FPB_KOTAK = fpb([KLEPON, ONDE]);
/** Papan congklak 24 lubang: biji merah di faktor 24, biji putih di faktor 18. */
export const PAPAN: Lubang[] = papanCongklak(KLEPON, ONDE, 24);
export const BAGI_KOTAK = bagiSamaRata([KLEPON, ONDE], FPB_KOTAK);
export const ISI_KLEPON = BAGI_KOTAK.isi[0];
export const ISI_ONDE = BAGI_KOTAK.isi[1];

/** Kartu 1: empat sel kosong (faktor 24, faktor 18, lubang dua biji, FPB). */
export const SUARA_FAKTOR_KLEPON = ucap(`Faktor ${KLEPON} adalah ${daftarTeks(FAKTOR_KLEPON).replace(/, (\d+)$/, ", dan $1")}. Biji merah diletakkan di lubang bernomor faktor itu.`);
export const SUARA_FAKTOR_ONDE = ucap(`Faktor ${ONDE} adalah ${daftarTeks(FAKTOR_ONDE).replace(/, (\d+)$/, ", dan $1")}. Biji putih diletakkan di lubang bernomor faktor itu.`);
export const SUARA_DUA_BIJI = ucap(`Lubang yang berisi dua biji adalah ${daftarTeks(SAMA_KOTAK).replace(/, (\d+)$/, ", dan $1")}. Itulah faktor persekutuan ${KLEPON} dan ${ONDE}.`);
export const SUARA_FPB_KOTAK = ucap(`Dari ${daftarTeks(SAMA_KOTAK).replace(/, (\d+)$/, ", dan $1")}, yang paling besar adalah ${FPB_KOTAK}, jadi FPB ${KLEPON} dan ${ONDE} adalah ${FPB_KOTAK}.`);

/** Kartu 2: satu sel kotak bingkisan, tiga baris tabel FPB (dua sel tiap baris), dan satu catatan. */
export type BarisFpb = { bil: number[]; sama: number[]; fpb: number; teks: string; suaraSama: string; suaraFpb: string };
const sebutBil = (bil: number[]): string => (bil.length === 2 ? `${bil[0]} dan ${bil[1]}` : `${bil.slice(0, -1).join(", ")}, dan ${bil[bil.length - 1]}`);
const sebutDaftar = (xs: number[]): string => (xs.length === 2 ? `${xs[0]} dan ${xs[1]}` : `${xs.slice(0, -1).join(", ")}, dan ${xs[xs.length - 1]}`);
const buatBaris = (bil: number[]): BarisFpb => {
  const sama = persekutuan(bil);
  const f = fpb(bil);
  return {
    bil,
    sama,
    fpb: f,
    teks: bil.join(", "),
    suaraSama: ucap(`Faktor persekutuan ${sebutBil(bil)} adalah ${sebutDaftar(sama)}.`),
    suaraFpb: ucap(`FPB ${sebutBil(bil)} adalah ${f}, yang terbesar dari faktor persekutuannya.`),
  };
};
export const BARIS_FPB: BarisFpb[] = [buatBaris([8, 20]), buatBaris([12, 18]), buatBaris([12, 18, 24])];
export const SUARA_KOTAK = ucap(`FPB ${KLEPON} dan ${ONDE} adalah ${FPB_KOTAK}, jadi ada ${FPB_KOTAK} kotak. ${KLEPON} : ${FPB_KOTAK} = ${ISI_KLEPON} klepon dan ${ONDE} : ${FPB_KOTAK} = ${ISI_ONDE} onde-onde di tiap kotak.`);
export const PERTAMA_12_18 = fpbPertamaSetelahSatu([12, 18]);
export const SUARA_CATATAN = ucap(`Pada 12 dan 18, faktor persekutuan pertama setelah satu adalah ${PERTAMA_12_18}, tetapi FPB-nya ${fpb([12, 18])}, karena FPB adalah yang paling besar.`);

export const JUDUL_INFO_1 = "Papan Congklak Faktor";
export const JUDUL_INFO_2 = "Kotak Bingkisan dan FPB";
export const PETUNJUK_INFO_1 = "Papan congklak Pak Joko. Ketuk tanda tanya untuk melihat biji merah, biji putih, lubang berisi dua biji, dan FPB.";
export const PETUNJUK_INFO_2 = "Kotak bingkisan dan tabel FPB. Ketuk tanda tanya untuk melihat isi kotak, faktor persekutuan, dan FPB.";
export const SELESAI_INFO_1 = "Papan lengkap! Lubang dua biji adalah faktor persekutuan.";
export const SELESAI_INFO_2 = "Kartu lengkap! FPB adalah faktor persekutuan yang terbesar.";
