/**
 * Logika murni Simulasi Isi Kotak Kelas 5 Bab 2 Sub-Bab D "Kotak Bingkisan Pak Joko" (Pasar Kuliner Malam).
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-kotak-k5b2d.mjs. Eksplorasi bebas tanpa skor.
 * Empat alat: Congklak (ketuk lubang yang berisi dua biji; alat menolak lubang berisi satu biji atau kosong), Kotak (atur banyak kotak untuk dua jenis kue; alat menolak Periksa bila ada kue bersisa),
 * Tiga (sama, untuk tiga jenis kue; penolakan yang sama), dan Terbesar (pilih FPB dari daftar faktor persekutuan). Data ada di data-sim.ts.
 * Tipe KeadaanKotak (alat: "kotak") dipakai misi-k5bab2.ts dan harus tetap diekspor.
 */
import { BESAR_SIM, CONGKLAK_SIM, KOTAK_SIM, TIGA_SIM } from "./data-sim";
import { bagiSamaRata, fpb, lubangDuaBiji, papanCongklak, persekutuan, type BagiRata, type Lubang } from "./logika-data";

export type ModeKotak = "congklak" | "kotak" | "tiga" | "besar";

export type KeadaanKotak = {
  alat: "kotak";
  mode: ModeKotak;
  /** Congklak: sasaran ke berapa, lubang yang ditandai, pernah ditolak (lubang berisi satu biji atau kosong), sasaran yang sudah benar. */
  congKe: number;
  pilihLubang: number[];
  tolakLubang: boolean;
  congBenar: number[];
  /** Kotak dua jenis: sasaran ke berapa, banyak kotak yang diatur, pernah ditolak (ada kue bersisa; dipakai juga alat Tiga), sasaran yang sudah benar. */
  kotakKe: number;
  banyakK: number;
  tolakKotak: boolean;
  kotakBenar: number[];
  /** Kotak tiga jenis: sasaran ke berapa, banyak kotak yang diatur, sasaran yang sudah benar. */
  tigaKe: number;
  banyakT: number;
  tigaBenar: number[];
  /** Terbesar: sasaran ke berapa, indeks faktor yang dipilih (-1 belum), sasaran yang sudah benar. */
  besarKe: number;
  pilihBesar: number;
  besarBenar: number[];
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, tidak dihitung). */
  salah: number;
};

const tanpaKembar = (xs: number[]): number[] => xs.filter((x, i) => xs.indexOf(x) === i);
export const awalKotak = (): KeadaanKotak => ({
  alat: "kotak",
  mode: "congklak",
  congKe: 0,
  pilihLubang: [],
  tolakLubang: false,
  congBenar: [],
  kotakKe: 0,
  banyakK: 1,
  tolakKotak: false,
  kotakBenar: [],
  tigaKe: 0,
  banyakT: 1,
  tigaBenar: [],
  besarKe: 0,
  pilihBesar: -1,
  besarBenar: [],
  salah: 0,
});
export const mulaiLagiKotak = (): KeadaanKotak => awalKotak();
export const pilihModeKotak = (k: KeadaanKotak, mode: ModeKotak): KeadaanKotak => ({ ...k, mode });

/* ------------------------------ Congklak: lubang berisi dua biji ------------------------------ */
export const targetCong = (k: KeadaanKotak) => CONGKLAK_SIM[k.congKe % CONGKLAK_SIM.length];
export const papanCong = (k: KeadaanKotak): Lubang[] => papanCongklak(targetCong(k).bil[0], targetCong(k).bil[1]);
/** Ketuk satu lubang. Hanya lubang berisi dua biji yang boleh ditandai (ketuk lagi untuk melepas); lubang berisi satu biji atau kosong ditolak (mencatat `tolakLubang`). */
export function ketukLubang(k: KeadaanKotak, nomor: number): { k: KeadaanKotak; ok: boolean } {
  const l = papanCong(k).find((x) => x.nomor === nomor);
  if (!l) return { k, ok: false };
  if (l.biji < 2) return { k: { ...k, tolakLubang: true }, ok: false };
  const pilih = k.pilihLubang.includes(nomor) ? k.pilihLubang.filter((x) => x !== nomor) : [...k.pilihLubang, nomor].sort((p, q) => p - q);
  return { k: { ...k, pilihLubang: pilih }, ok: true };
}
/** Periksa tanda lubang: benar bila semua lubang berisi dua biji ditandai, tidak kurang dan tidak lebih. */
export function periksaCong(k: KeadaanKotak): { k: KeadaanKotak; ok: boolean } {
  const benar = lubangDuaBiji(targetCong(k).bil[0], targetCong(k).bil[1]);
  const sama = benar.length === k.pilihLubang.length && benar.every((n) => k.pilihLubang.includes(n));
  if (!sama) return { k: { ...k, salah: k.salah + 1 }, ok: false };
  return { k: { ...k, congBenar: tanpaKembar([...k.congBenar, k.congKe % CONGKLAK_SIM.length]), congKe: k.congKe + 1, pilihLubang: [] }, ok: true };
}
export const petunjukCong = (k: KeadaanKotak): string =>
  k.pilihLubang.length === 0 ? "Belum ada lubang yang ditandai. Cari lubang yang berisi biji merah dan biji putih sekaligus." : "Tandanya belum cocok. Periksa lagi semua lubang yang berisi dua biji, jangan ada yang terlewat atau berlebih.";
export const kalimatCong = (k: KeadaanKotak): string =>
  k.congBenar.length > 0 && k.pilihLubang.length === 0 ? "Betul! Ada papan congklak berikutnya untuk dimainkan." : "Ketuk lubang yang berisi dua biji, lalu tekan Periksa.";

/* ------------------------------ Kotak: dua atau tiga jenis kue ------------------------------ */
export const targetKotak = (k: KeadaanKotak) => KOTAK_SIM[k.kotakKe % KOTAK_SIM.length];
export const targetTiga = (k: KeadaanKotak) => TIGA_SIM[k.tigaKe % TIGA_SIM.length];
/** Batas atas banyak kotak: sebanyak bilangan terkecil (lebih banyak dari itu ada kotak kosong). */
export const batasKotak = (bil: number[]): number => Math.min(...bil);
export const bagiKotak = (k: KeadaanKotak): BagiRata => bagiSamaRata(targetKotak(k).bil, k.banyakK);
export const bagiTiga = (k: KeadaanKotak): BagiRata => bagiSamaRata(targetTiga(k).bil, k.banyakT);
/** FPB sasaran, dihitung dari faktor persekutuan. */
export const fpbKotak = (k: KeadaanKotak): number => fpb(targetKotak(k).bil);
export const fpbTiga = (k: KeadaanKotak): number => fpb(targetTiga(k).bil);
export function ubahKotak(k: KeadaanKotak, arah: 1 | -1): KeadaanKotak {
  const n = k.banyakK + arah;
  return n < 1 || n > batasKotak(targetKotak(k).bil) ? k : { ...k, banyakK: n };
}
export function ubahTiga(k: KeadaanKotak, arah: 1 | -1): KeadaanKotak {
  const n = k.banyakT + arah;
  return n < 1 || n > batasKotak(targetTiga(k).bil) ? k : { ...k, banyakT: n };
}
/** Periksa kotak. Ditolak (mencatat `tolakKotak`, bukan percobaan keliru) bila ada kue bersisa; keliru bila semua habis tetapi kotak belum sebanyak-banyaknya. */
export function periksaKotak(k: KeadaanKotak): { k: KeadaanKotak; ok: boolean; ditolak?: boolean } {
  const r = bagiKotak(k);
  if (!r.habis) return { k: { ...k, tolakKotak: true }, ok: false, ditolak: true };
  if (k.banyakK !== fpbKotak(k)) return { k: { ...k, salah: k.salah + 1 }, ok: false };
  return { k: { ...k, kotakBenar: tanpaKembar([...k.kotakBenar, k.kotakKe % KOTAK_SIM.length]), kotakKe: k.kotakKe + 1, banyakK: 1 }, ok: true };
}
export function periksaTiga(k: KeadaanKotak): { k: KeadaanKotak; ok: boolean; ditolak?: boolean } {
  const r = bagiTiga(k);
  if (!r.habis) return { k: { ...k, tolakKotak: true }, ok: false, ditolak: true };
  if (k.banyakT !== fpbTiga(k)) return { k: { ...k, salah: k.salah + 1 }, ok: false };
  return { k: { ...k, tigaBenar: tanpaKembar([...k.tigaBenar, k.tigaKe % TIGA_SIM.length]), tigaKe: k.tigaKe + 1, banyakT: 1 }, ok: true };
}
export const petunjukKotak = (): string => "Semua kue sudah habis, tetapi pesan Pak Joko meminta kotak sebanyak-banyaknya dengan isi tiap jenis yang sama. Coba atur lagi banyak kotaknya.";
export const kalimatKotak = (k: KeadaanKotak): string =>
  k.kotakBenar.length > 0 && k.banyakK === 1 ? "Betul! Ada bingkisan berikutnya untuk diisi." : "Atur banyak kotak sampai semua kue habis terbagi, lalu tekan Periksa.";
export const kalimatTiga = (k: KeadaanKotak): string =>
  k.tigaBenar.length > 0 && k.banyakT === 1 ? "Betul! Ada bingkisan tiga jenis berikutnya." : "Atur banyak kotak sampai ketiga jenis kue habis terbagi, lalu tekan Periksa.";

/* ------------------------------ Terbesar: pilih FPB ------------------------------ */
export const targetBesar = (k: KeadaanKotak) => BESAR_SIM[k.besarKe % BESAR_SIM.length];
/** Daftar faktor persekutuan sasaran (urut kecil ke besar) yang ditampilkan untuk dipilih. */
export const daftarBesar = (k: KeadaanKotak): number[] => persekutuan(targetBesar(k).bil);
export function pilihBesar(k: KeadaanKotak, i: number): KeadaanKotak {
  return i < 0 || i >= daftarBesar(k).length ? k : { ...k, pilihBesar: i };
}
/** Periksa pilihan FPB. Ditolak (tanpa dihitung keliru) bila belum memilih. */
export function periksaBesar(k: KeadaanKotak): { k: KeadaanKotak; ok: boolean; ditolak?: boolean } {
  if (k.pilihBesar < 0) return { k, ok: false, ditolak: true };
  const daftar = daftarBesar(k);
  if (daftar[k.pilihBesar] !== fpb(targetBesar(k).bil)) return { k: { ...k, salah: k.salah + 1 }, ok: false };
  return { k: { ...k, besarBenar: tanpaKembar([...k.besarBenar, k.besarKe % BESAR_SIM.length]), besarKe: k.besarKe + 1, pilihBesar: -1 }, ok: true };
}
export const petunjukBesar = (): string => "Pilihan itu bukan yang terbesar. FPB adalah faktor persekutuan yang paling besar, bukan yang pertama kali kamu temukan.";
export const kalimatBesar = (k: KeadaanKotak): string =>
  k.besarBenar.length > 0 && k.pilihBesar < 0 ? "Betul! Ada pasangan bilangan berikutnya." : "Pilih faktor persekutuan yang paling besar, lalu tekan Periksa.";
