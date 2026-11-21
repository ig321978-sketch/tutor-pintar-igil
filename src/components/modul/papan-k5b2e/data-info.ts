/**
 * Data Infografis (label kosong, papan bilangan dan kartu pengelola) Kelas 5 Bab 2 Sub-Bab E "Papan Bilangan Kak Lintang": DUA kartu, tiap kartu satu layar tanpa gulir.
 * Data bersambung dari Sub-Bab A sampai D (12 dan 18; lonceng, klepon, dan kotak bingkisan) dan Story E:
 * Kartu 1 = saringan bilangan prima sampai 30 (hapus satu, ambil 2, 3, 5, sisanya 10 prima) dan pohon faktor 12 (2 x 2 x 3), 18 (2 x 3 x 3), dan 24 (2 x 2 x 2 x 3).
 * Kartu 2 = KPK 36 dan FPB 6 dari faktorisasi 12 dan 18 (prima berpasangan), tiga bilangan 12, 18, 24 (KPK 72, FPB 6), tanpa pasangan 12 dan 25 (FPB 1, KPK 300),
 * dan pembagian berulang 12 dan 18 (pembagi 2, 2, 3, 3).
 * Semua isi dan hitungan dari logika-data.ts. Digital saja: suara dan kanvas hanya di CPA. Diuji: scripts/uji-papan-k5b2e.mjs.
 */
import { ucapkan } from "./logika-cpa";
import { faktorisasi, fmt, fpbFaktorisasi, kpkFaktorisasi, pasangkan, pembagianBerulang, pohonTata, saringan, tulisKali } from "./logika-data";

/** Ucapan tanpa digit yang diawali huruf kapital. */
const ucap = (t: string): string => {
  const u = ucapkan(t);
  return u.charAt(0).toUpperCase() + u.slice(1);
};

/* ------------------------------ Kartu 1: saringan dan pohon faktor ------------------------------ */
export const BATAS_INFO = 30;
export const SARING_INFO = saringan(BATAS_INFO);
export const PRIMA_INFO = SARING_INFO.sisa;
/** Satu langkah saringan yang diketuk: hapus satu, lalu ambil tiap prima yang p x p tidak lebih dari 30. */
export type LangkahInfo = { id: string; label: string; coret: number[]; suara: string };
export const LANGKAH_SARING: LangkahInfo[] = [
  { id: "satu", label: "Hapus 1", coret: [1], suara: ucap("Hapus satu dulu, karena satu bukan bilangan prima.") },
  ...SARING_INFO.langkah.map((l): LangkahInfo => ({ id: `p${l.p}`, label: `Ambil ${l.p}`, coret: l.semua, suara: ucap(`Ambil ${l.p}, lalu hapus semua kelipatannya: ${l.semua.join(", ")}.`) })),
];
export const SUARA_SISA = ucap(`Yang tersisa adalah bilangan prima sampai ${BATAS_INFO}: ${PRIMA_INFO.join(", ")}. Ada ${PRIMA_INFO.length} bilangan prima.`);

export type PohonInfo = { n: number; faktor: number[]; teks: string; tata: ReturnType<typeof pohonTata>; suara: string };
/** Tiga pohon faktor: 12, 18, dan 24 (bersambung dari Story dan metode global). */
export const POHON_INFO: PohonInfo[] = [12, 18, 24].map((n) => {
  const faktor = faktorisasi(n);
  return { n, faktor, teks: tulisKali(faktor), tata: pohonTata(n), suara: ucap(`${n} dipecah sampai semua ujungnya prima, jadi ${n} sama dengan ${tulisKali(faktor)}.`) };
});

/* ------------------------------ Kartu 2: KPK dan FPB, pembagian berulang ------------------------------ */
export const BIL_A = 12;
export const BIL_B = 18;
export const FA = faktorisasi(BIL_A);
export const FB = faktorisasi(BIL_B);
export const PASANGAN = pasangkan(FA, FB);
export const KPK_INFO = kpkFaktorisasi([FA, FB]);
export const FPB_INFO = fpbFaktorisasi([FA, FB]);
/** Tiga bilangan: 12, 18, dan 24. */
export const BIL_TIGA = [12, 18, 24];
export const KPK_TIGA = kpkFaktorisasi(BIL_TIGA.map(faktorisasi));
export const FPB_TIGA = fpbFaktorisasi(BIL_TIGA.map(faktorisasi));
/** Tanpa pasangan prima: 12 dan 25 (FPB 1). */
export const BIL_TANPA = [12, 25];
export const KPK_TANPA = kpkFaktorisasi(BIL_TANPA.map(faktorisasi));
export const FPB_TANPA = fpbFaktorisasi(BIL_TANPA.map(faktorisasi));
export const BAGI_INFO = pembagianBerulang([BIL_A, BIL_B]);
/** Pembagi yang membagi semua bilangan pada barisnya. */
export const PEMBAGI_SEMUA = BAGI_INFO.baris.filter((b) => b.semua).map((b) => b.p);

export const SUARA_KPK = ucap(`KPK ${BIL_A} dan ${BIL_B}: prima yang berpasangan ditulis sekali, jadi ${tulisKali(KPK_INFO.faktor)} = ${fmt(KPK_INFO.hasil)}.`);
export const SUARA_FPB = ucap(`FPB hanya hasil kali prima yang berpasangan: ${tulisKali(FPB_INFO.faktor)} = ${fmt(FPB_INFO.hasil)}.`);
export const SUARA_TIGA = ucap(`Untuk tiga bilangan ${BIL_TIGA[0]}, ${BIL_TIGA[1]}, dan ${BIL_TIGA[2]}, KPK-nya ${fmt(KPK_TIGA.hasil)} dan FPB-nya ${fmt(FPB_TIGA.hasil)}.`);
export const SUARA_TANPA = ucap(`${BIL_TANPA[0]} dan ${BIL_TANPA[1]} tidak punya prima yang berpasangan, jadi FPB-nya ${fmt(FPB_TANPA.hasil)} dan KPK-nya ${fmt(KPK_TANPA.hasil)}.`);
export const SUARA_BARIS_BAGI = BAGI_INFO.baris.map((b) => ucap(`Dibagi dengan ${b.p}: ${b.sebelum.join(" dan ")} menjadi ${b.sesudah.join(" dan ")}.`));
export const SUARA_KPK_BAGI = ucap(`Hasil kali semua pembagi: ${tulisKali(BAGI_INFO.pembagi)} = ${fmt(BAGI_INFO.kpk)}, itulah KPK.`);
export const SUARA_FPB_BAGI = ucap(`Pembagi yang membagi ${BIL_A} dan ${BIL_B} sekaligus: ${PEMBAGI_SEMUA.join(" dan ")}, hasil kalinya ${fmt(BAGI_INFO.fpb)}, itulah FPB.`);

export const JUDUL_INFO_1 = "Saring dan Pohon";
export const JUDUL_INFO_2 = "KPK dan FPB";
export const PETUNJUK_INFO_1 = "Papan bilangan Kak Lintang. Ketuk tanda tanya untuk melihat saringan dan pohon faktornya.";
export const PETUNJUK_INFO_2 = "Kartu KPK dan FPB. Ketuk tanda tanya untuk melihat pasangan prima dan pembagian berulang.";
export const SELESAI_INFO_1 = "Papan lengkap! Bilangan prima dan pohon faktor sudah terbuka.";
export const SELESAI_INFO_2 = "Kartu lengkap! KPK dan FPB sudah terbuka.";
