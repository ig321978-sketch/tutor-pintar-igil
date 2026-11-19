/**
 * Logika murni Simulasi Lapangan Sudut Kelas 3 Bab 4 Sub-Bab B "Sudut Kak Anton" (sudut pada bidang datar), tengah cerita Festival Layang-layang Kampung.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-sudut-k3b4b.mjs. Eksplorasi bebas tanpa skor.
 * Empat alat: Putar (putar kaki sudut dan bandingkan dengan pojok kertas sampai sudut dari jenis sasaran ditemukan), Busur (pasang titik tengah dan garis nol dulu,
 * alat menolak membaca sebelum dipasang benar, lalu baca derajat dari skala yang dimulai dari nol), Jenis (pilih jenis sudut), dan Pasang (pasangan sudut refleks sampai satu putaran penuh).
 * Data ada di data-sim.ts.
 */
import { jenisDari, MAKS_PUTAR, MIN_PUTAR, TARGET_BUSUR, TARGET_JENIS, TARGET_PASANG, TARGET_PUTAR, URUT_JENIS, type JenisSudut } from "./data-sim";

export type ModeSudut = "putar" | "busur" | "jenis" | "pasang";

export type KeadaanSudut = {
  alat: "sudut";
  mode: ModeSudut;
  /** Putar: sasaran ke berapa, besar sudut sekarang (derajat), sasaran yang sudah benar. */
  putarKe: number;
  deg: number;
  putarBenar: number[];
  /** Busur: sasaran ke berapa, titik tengah sudah di titik sudut, garis nol sudah di kaki pertama, alat pernah menolak membaca, sudah membaca, pilihan (-1 bila belum), sasaran yang sudah benar. */
  busurKe: number;
  tengah: boolean;
  nol: boolean;
  tolak: boolean;
  sudahBaca: boolean;
  bacaPilih: number;
  busurBenar: number[];
  /** Jenis: sasaran ke berapa, pilihan (-1 bila belum), sasaran yang sudah benar. */
  jenisKe: number;
  jenisPilih: number;
  jenisBenar: number[];
  /** Pasang: sasaran ke berapa, pilihan (-1 bila belum), sasaran yang sudah benar. */
  pasangKe: number;
  pasangPilih: number;
  pasangBenar: number[];
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

export const awalSudut = (): KeadaanSudut => ({
  alat: "sudut",
  mode: "putar",
  putarKe: 0,
  deg: TARGET_PUTAR[0].awal,
  putarBenar: [],
  busurKe: 0,
  tengah: false,
  nol: false,
  tolak: false,
  sudahBaca: false,
  bacaPilih: -1,
  busurBenar: [],
  jenisKe: 0,
  jenisPilih: -1,
  jenisBenar: [],
  pasangKe: 0,
  pasangPilih: -1,
  pasangBenar: [],
  salah: 0,
});
export const mulaiLagiSudut = (): KeadaanSudut => awalSudut();

/* ------------------------------ Kata (tanpa digit) ------------------------------ */
const SAT = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"] as const;
/** Nama bilangan 0 sampai 399 dalam kata. */
export function kata(n: number): string {
  if (n < 10) return SAT[n] ?? String(n);
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${SAT[n - 10]} belas`;
  if (n < 100) {
    const p = Math.floor(n / 10);
    const s = n % 10;
    return s === 0 ? `${SAT[p]} puluh` : `${SAT[p]} puluh ${SAT[s]}`;
  }
  const r = Math.floor(n / 100);
  const sisa = n % 100;
  const ratus = r === 1 ? "seratus" : `${SAT[r]} ratus`;
  return sisa === 0 ? ratus : `${ratus} ${kata(sisa)}`;
}
export const kataDerajat = (n: number): string => `${kata(n)} derajat`;
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
export { besar as hurufBesar };
export const pilihModeSudut = (k: KeadaanSudut, mode: ModeSudut): KeadaanSudut => ({ ...k, mode });

/** Sisipkan jawaban benar di tempat yang bukan pertama (deterministik). */
function sisip<T>(benar: T, lain: T[], geser: number): T[] {
  const p = 1 + (geser % lain.length);
  return [...lain.slice(0, p), benar, ...lain.slice(p)];
}

/* ------------------------------ Putar kaki sudut ------------------------------ */
export const targetPutar = (k: KeadaanSudut) => TARGET_PUTAR[k.putarKe % TARGET_PUTAR.length];
/** Perbandingan sudut dengan pojok kertas lipat (sembilan puluh derajat) dan sudut lurus. */
export function bandingPojok(deg: number): string {
  if (deg < 90) return "lebih kecil daripada pojok kertas";
  if (deg === 90) return "pas dengan pojok kertas";
  if (deg < 180) return "lebih besar daripada pojok kertas, tetapi belum lurus";
  if (deg === 180) return "lurus, sama dengan dua pojok kertas";
  return "lebih besar daripada sudut lurus";
}
export type HasilPutar = { k: KeadaanSudut; ok: boolean };
/** Putar kaki sudut sebesar delta (kelipatan sepuluh derajat); tidak boleh kurang dari sepuluh atau lebih dari tiga ratus lima puluh derajat. */
export function putarSudut(k: KeadaanSudut, delta: number): HasilPutar {
  const baru = k.deg + delta;
  if (baru < MIN_PUTAR || baru > MAKS_PUTAR) return { k, ok: false };
  return { k: { ...k, deg: baru }, ok: true };
}
export const kalimatBesarSudut = (k: KeadaanSudut): string => `Sudut sekarang ${kataDerajat(k.deg)}, ${bandingPojok(k.deg)}.`;
export function periksaPutar(k: KeadaanSudut): { k: KeadaanSudut; ok: boolean } {
  const t = targetPutar(k);
  if (jenisDari(k.deg) === t.jenis) {
    const ke = k.putarKe + 1;
    return { k: { ...k, putarBenar: k.putarBenar.includes(k.putarKe) ? k.putarBenar : [...k.putarBenar, k.putarKe], putarKe: ke, deg: TARGET_PUTAR[ke % TARGET_PUTAR.length].awal }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukPutar(k: KeadaanSudut): string {
  const t = targetPutar(k);
  if (k.deg === t.awal) return `Putar kaki sudut dulu dengan tombol panah sampai sudutnya ${t.jenis}, baru tekan Periksa.`;
  const d = k.deg;
  const bagian = d < 90 ? "masih lebih kecil daripada pojok kertas" : d === 90 ? "tepat sama dengan pojok kertas" : d < 180 ? "sudah lebih besar daripada pojok kertas, tetapi belum lurus" : d === 180 ? "tepat lurus" : "sudah lebih besar daripada sudut lurus";
  return `Sudut ini ${bagian}. Cari sudut ${t.jenis}: ${PETUNJUK_JENIS[t.jenis]}`;
}
export const PETUNJUK_JENIS: Record<JenisSudut, string> = {
  lancip: "lebih kecil daripada pojok kertas.",
  "siku-siku": "tepat sama dengan pojok kertas.",
  tumpul: "lebih besar daripada pojok kertas, tetapi belum lurus.",
  lurus: "tepat satu garis lurus, sama dengan dua pojok kertas.",
  refleks: "lebih besar daripada sudut lurus.",
};
export function kalimatPutar(k: KeadaanSudut): string {
  const t = targetPutar(k);
  return k.putarBenar.length > 0 && k.deg === t.awal ? `Betul! Sekarang cari sudut ${t.jenis}.` : `Putar kaki sudut sampai sudutnya ${t.jenis}, lalu tekan Periksa.`;
}

/* ------------------------------ Busur derajat ------------------------------ */
export const targetBusur = (k: KeadaanSudut) => TARGET_BUSUR[k.busurKe % TARGET_BUSUR.length];
export const terpasang = (k: KeadaanSudut): boolean => k.tengah && k.nol;
/** Pasang satu bagian busur: titik tengah di titik sudut, atau garis nol di kaki pertama. Memasang ulang membatalkan bacaan. */
export function pasangBusur(k: KeadaanSudut, bagian: "tengah" | "nol"): KeadaanSudut {
  return { ...k, [bagian]: true, sudahBaca: false, bacaPilih: -1 };
}
/** Lepas busur dari sudut (kedua bagian). */
export const lepasBusur = (k: KeadaanSudut): KeadaanSudut => ({ ...k, tengah: false, nol: false, sudahBaca: false, bacaPilih: -1 });
/** Minta alat membaca sudut. Ditolak (bukan percobaan keliru) bila titik tengah atau garis nol belum dipasang benar. */
export function bacaBusur(k: KeadaanSudut): { k: KeadaanSudut; ok: boolean } {
  if (!terpasang(k)) return { k: { ...k, tolak: true }, ok: false };
  return { k: { ...k, sudahBaca: true }, ok: true };
}
/** Tiga pilihan bacaan: yang benar, bacaan dari skala yang salah (seratus delapan puluh dikurangi sudut), dan sepuluh derajat lebih besar atau lebih kecil. Yang benar tidak di tempat pertama. */
export function pilihanBusur(k: KeadaanSudut): number[] {
  const t = targetBusur(k);
  const calon = [180 - t.deg, t.deg + 10, t.deg - 10, t.deg + 20].filter((x, i, a) => x >= 10 && x <= 170 && x !== t.deg && a.indexOf(x) === i);
  return sisip(t.deg, calon.slice(0, 2), t.deg / 10);
}
export function pilihBacaBusur(k: KeadaanSudut, i: number): KeadaanSudut {
  return i < 0 || i >= 3 || !k.sudahBaca ? k : { ...k, bacaPilih: i };
}
export function periksaBusur(k: KeadaanSudut): { k: KeadaanSudut; ok: boolean } {
  const t = targetBusur(k);
  const pil = pilihanBusur(k);
  if (terpasang(k) && k.sudahBaca && k.bacaPilih >= 0 && pil[k.bacaPilih] === t.deg) {
    return { k: { ...k, busurBenar: k.busurBenar.includes(k.busurKe) ? k.busurBenar : [...k.busurBenar, k.busurKe], busurKe: k.busurKe + 1, tengah: false, nol: false, sudahBaca: false, bacaPilih: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukBusur(k: KeadaanSudut): string {
  if (!k.tengah) return "Titik tengah busur belum di titik sudut. Pasang titik tengah dulu.";
  if (!k.nol) return "Garis nol busur belum di kaki pertama. Pasang garis nol dulu.";
  if (!k.sudahBaca) return "Busur sudah terpasang. Tekan Baca dulu supaya alat membaca sudut.";
  if (k.bacaPilih < 0) return "Pilih satu bacaan dulu.";
  return "Baca dari skala yang dimulai dari garis nol di kaki pertama. Skala yang lain memberi bacaan yang salah.";
}
export function kalimatBusur(k: KeadaanSudut): string {
  if (k.busurBenar.length > 0 && !k.tengah && !k.nol) return "Betul! Ada sudut berikutnya.";
  if (!k.tengah) return "Pasang titik tengah busur di titik sudut.";
  if (!k.nol) return "Pasang garis nol busur di kaki pertama.";
  return k.sudahBaca ? "Pilih bacaan yang dimulai dari garis nol, lalu tekan Periksa." : "Busur sudah terpasang. Tekan Baca.";
}

/* ------------------------------ Jenis sudut ------------------------------ */
export const targetJenis = (k: KeadaanSudut) => TARGET_JENIS[k.jenisKe % TARGET_JENIS.length];
/** Tiga pilihan jenis: yang benar dan dua yang lain; yang benar tidak di tempat pertama. */
export function pilihanJenis(k: KeadaanSudut): JenisSudut[] {
  const benar = jenisDari(targetJenis(k).deg);
  const i = URUT_JENIS.indexOf(benar);
  const lain = [URUT_JENIS[(i + 1) % 5], URUT_JENIS[(i + 3) % 5]];
  return sisip(benar, lain, k.jenisKe);
}
export function pilihJenisSudut(k: KeadaanSudut, i: number): KeadaanSudut {
  return i < 0 || i >= 3 ? k : { ...k, jenisPilih: i };
}
export function periksaJenis(k: KeadaanSudut): { k: KeadaanSudut; ok: boolean } {
  const benar = jenisDari(targetJenis(k).deg);
  if (k.jenisPilih >= 0 && pilihanJenis(k)[k.jenisPilih] === benar) return { k: { ...k, jenisBenar: k.jenisBenar.includes(k.jenisKe) ? k.jenisBenar : [...k.jenisBenar, k.jenisKe], jenisKe: k.jenisKe + 1, jenisPilih: -1 }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukJenis(k: KeadaanSudut): string {
  if (k.jenisPilih < 0) return "Pilih satu jenis dulu.";
  return "Bandingkan sudut dengan pojok kertas dan sudut lurus. Lebih kecil daripada pojok kertas berarti lancip, pas dengan pojok berarti siku-siku, lebih besar tetapi belum lurus berarti tumpul, tepat satu garis lurus berarti lurus, dan lebih besar daripada lurus berarti refleks.";
}
export function kalimatJenis(k: KeadaanSudut): string {
  return k.jenisBenar.length > 0 && k.jenisPilih < 0 ? "Betul! Ada sudut berikutnya." : "Bandingkan sudut dengan pojok kertas, pilih jenisnya, lalu tekan Periksa.";
}

/* ------------------------------ Pasangan satu putaran ------------------------------ */
export const targetPasang = (k: KeadaanSudut) => TARGET_PASANG[k.pasangKe % TARGET_PASANG.length];
export const pasanganDari = (refleks: number): number => 360 - refleks;
/** Tiga pilihan pasangan: yang benar, seratus delapan puluh dikurangi pasangan, dan sepuluh lebih besar. Yang benar tidak di tempat pertama. */
export function pilihanPasang(k: KeadaanSudut): number[] {
  const n = pasanganDari(targetPasang(k).refleks);
  const calon = [180 - n, n + 10, n - 10].filter((x, i, a) => x >= 10 && x <= 170 && x !== n && a.indexOf(x) === i);
  return sisip(n, calon.slice(0, 2), n / 10);
}
export function pilihPasangan(k: KeadaanSudut, i: number): KeadaanSudut {
  return i < 0 || i >= 3 ? k : { ...k, pasangPilih: i };
}
export function periksaPasang(k: KeadaanSudut): { k: KeadaanSudut; ok: boolean } {
  const n = pasanganDari(targetPasang(k).refleks);
  if (k.pasangPilih >= 0 && pilihanPasang(k)[k.pasangPilih] === n) return { k: { ...k, pasangBenar: k.pasangBenar.includes(k.pasangKe) ? k.pasangBenar : [...k.pasangBenar, k.pasangKe], pasangKe: k.pasangKe + 1, pasangPilih: -1 }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukPasang(k: KeadaanSudut): string {
  if (k.pasangPilih < 0) return "Pilih satu bilangan dulu.";
  return "Satu putaran penuh adalah tiga ratus enam puluh derajat. Pasangan didapat dengan mengurangkan sudut refleks dari tiga ratus enam puluh.";
}
export function kalimatPasang(k: KeadaanSudut): string {
  return k.pasangBenar.length > 0 && k.pasangPilih < 0 ? "Betul! Ada sudut refleks berikutnya." : "Jumlah dua sudut yang berpasangan sama dengan satu putaran penuh. Cari pasangannya, lalu tekan Periksa.";
}
