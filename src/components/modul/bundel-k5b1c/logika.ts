/**
 * Logika murni Simulasi Tukar Bundel Kelas 5 Bab 1 Sub-Bab C "Bundel Tiket Bu Lestari", gudang tiket Stadion Kota.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-bundel-k5b1c.mjs. Eksplorasi bebas tanpa skor.
 * Empat alat: Uraikan (atur banyak bundel tiap kolom sampai sama dengan bilangan), Tukar (tukar sepuluh bundel kecil dengan satu bundel besar atau sebaliknya sampai sama dengan
 * susunan sasaran; alat menolak penukaran yang bundelnya tidak cukup), Susun (isi tiap kolom dengan satu angka, termasuk nol; alat menolak kolom yang belum diisi),
 * dan Samakan (pilih semua susunan yang jumlahnya sama dengan bilangan). Data di data-sim.ts; jawaban dihitung dari data.
 */
import { TARGET_SAMA, TARGET_SUSUN, TARGET_TUKAR, TARGET_URAI, sasaranTukarS, type SasaranSama, type SasaranTukar } from "./data-sim";
import { BANYAK_KOLOM, KOLOM, samaSusunan, susunanDari, totalSusunan, tukarNaik, tukarTurun, type Susunan } from "./logika-data";
import { kataK5B1 } from "../eja-k5b1";

export type ModeBundel = "urai" | "tukar" | "susun" | "sama";

export type KeadaanBundel = {
  alat: "bundel";
  mode: ModeBundel;
  /** Uraikan: sasaran ke berapa, banyak bundel tiap kolom (0 sampai 9), sasaran yang sudah benar. */
  uraiKe: number;
  uraiIsi: number[];
  uraiBenar: number[];
  /** Tukar: sasaran ke berapa, susunan sekarang, sasaran yang sudah benar. */
  tukarKe: number;
  tukarS: Susunan;
  tukarBenar: number[];
  /** Susun: sasaran ke berapa, angka tiap kolom (-1 bila belum diisi), sasaran yang sudah benar. */
  susunKe: number;
  susunIsi: number[];
  susunBenar: number[];
  /** Samakan: sasaran ke berapa, susunan yang dipilih, sasaran yang sudah benar. */
  samaKe: number;
  samaPilih: boolean[];
  samaBenar: number[];
  /** Alat Tukar sudah pernah menolak penukaran yang bundelnya tidak cukup. */
  tolak: boolean;
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

const ke = <T,>(daftar: readonly T[], n: number): T => daftar[n % daftar.length];
export const nol = (n: number): number[] => Array.from({ length: n }, () => 0);
export const kosongKolom = (): number[] => Array.from({ length: BANYAK_KOLOM }, () => -1);

/* ------------------------------ Sasaran ------------------------------ */
export const bilanganUrai = (k: KeadaanBundel): number => ke(TARGET_URAI, k.uraiKe);
export const sasaranTukar = (k: KeadaanBundel): SasaranTukar => ke(TARGET_TUKAR, k.tukarKe);
export const susunanAwalTukar = (k: KeadaanBundel): Susunan => [...sasaranTukar(k).s];
export const susunanSasaranTukar = (k: KeadaanBundel): Susunan => sasaranTukarS(sasaranTukar(k));
export const bilanganSusun = (k: KeadaanBundel): number => ke(TARGET_SUSUN, k.susunKe);
export const sasaranSama = (k: KeadaanBundel): SasaranSama => ke(TARGET_SAMA, k.samaKe);
/** Indeks susunan yang jumlahnya sama dengan bilangan sasaran Samakan. */
export const susunanSama = (x: SasaranSama): number[] => x.opsi.map((s, i) => (totalSusunan(s) === x.n ? i : -1)).filter((i) => i >= 0);

export const awalBundel = (): KeadaanBundel => ({
  alat: "bundel",
  mode: "urai",
  uraiKe: 0,
  uraiIsi: nol(BANYAK_KOLOM),
  uraiBenar: [],
  tukarKe: 0,
  tukarS: [...TARGET_TUKAR[0].s],
  tukarBenar: [],
  susunKe: 0,
  susunIsi: kosongKolom(),
  susunBenar: [],
  samaKe: 0,
  samaPilih: TARGET_SAMA[0].opsi.map(() => false),
  samaBenar: [],
  tolak: false,
  salah: 0,
});
export const mulaiLagiBundel = (): KeadaanBundel => awalBundel();
export const pilihModeBundel = (k: KeadaanBundel, mode: ModeBundel): KeadaanBundel => ({ ...k, mode });

/* ------------------------------ Kata ------------------------------ */
/** Nama bilangan dalam kata (tanpa digit). */
export const kata = (n: number): string => kataK5B1(n);
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
export { besar as hurufBesar };

/* ------------------------------ Uraikan ------------------------------ */
export function ubahUrai(k: KeadaanBundel, j: number, delta: 1 | -1): KeadaanBundel {
  if (j < 0 || j >= BANYAK_KOLOM) return k;
  const baru = Math.max(0, Math.min(9, k.uraiIsi[j] + delta));
  return { ...k, uraiIsi: k.uraiIsi.map((c, i) => (i === j ? baru : c)) };
}
/** Jumlah seluruh tiket pada bundel yang sudah diatur. */
export const totalUrai = (k: KeadaanBundel): number => totalSusunan(k.uraiIsi);
export function periksaUrai(k: KeadaanBundel): { k: KeadaanBundel; ok: boolean } {
  if (k.uraiIsi.every((c) => c === 0)) return { k, ok: false };
  const n = bilanganUrai(k);
  if (samaSusunan(k.uraiIsi, susunanDari(n))) {
    const baru = k.uraiKe + 1;
    return { k: { ...k, uraiBenar: k.uraiBenar.includes(k.uraiKe) ? k.uraiBenar : [...k.uraiBenar, k.uraiKe], uraiKe: baru, uraiIsi: nol(BANYAK_KOLOM) }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukUrai(k: KeadaanBundel): string {
  if (k.uraiIsi.every((c) => c === 0)) return "Alat menolak. Belum ada bundel yang dipilih. Atur bundel tiap kolom dulu, lalu tekan Periksa.";
  return "Bundelnya belum sama dengan bilangan di papan. Cocokkan tiap kolom dengan angkanya, dan jaga kolom yang berisi nol.";
}
export function kalimatUrai(k: KeadaanBundel): string {
  if (k.uraiBenar.length > 0 && k.uraiIsi.every((c) => c === 0) && k.uraiKe === k.uraiBenar.length) return "Betul! Ada bilangan berikutnya.";
  return k.uraiIsi.every((c) => c === 0) ? "Atur banyak bundel tiap kolom sampai sama dengan bilangan di papan." : "Bandingkan jumlah tiketmu dengan bilangan di papan, lalu tekan Periksa.";
}

/* ------------------------------ Tukar ------------------------------ */
export type ArahTukar = "turun" | "naik";
export function tukarSatu(k: KeadaanBundel, arah: ArahTukar): { k: KeadaanBundel; ok: boolean } {
  const i = sasaranTukar(k).i;
  const baru = arah === "turun" ? tukarTurun(k.tukarS, i) : tukarNaik(k.tukarS, i);
  if (!baru) return { k: { ...k, tolak: true }, ok: false };
  return { k: { ...k, tukarS: baru }, ok: true };
}
export function petunjukTukar(k: KeadaanBundel, arah: ArahTukar): string {
  const i = sasaranTukar(k).i;
  const bundelKe = (j: number) => KOLOM[j].bundel;
  if (arah === "turun") return k.tukarS[i] < 1 ? `Alat menolak. Tidak ada ${bundelKe(i)} yang bisa ditukar. Tukar dulu dengan arah lain.` : "Penukaran berhasil.";
  return k.tukarS[i + 1] < 10 ? `Alat menolak. ${besar(bundelKe(i + 1))} belum sampai sepuluh, jadi belum bisa ditukar dengan satu ${bundelKe(i)}.` : "Penukaran berhasil.";
}
export function periksaTukar(k: KeadaanBundel): { k: KeadaanBundel; ok: boolean } {
  if (samaSusunan(k.tukarS, susunanAwalTukar(k))) return { k, ok: false };
  if (samaSusunan(k.tukarS, susunanSasaranTukar(k))) {
    const baru = k.tukarKe + 1;
    return { k: { ...k, tukarBenar: k.tukarBenar.includes(k.tukarKe) ? k.tukarBenar : [...k.tukarBenar, k.tukarKe], tukarKe: baru, tukarS: [...ke(TARGET_TUKAR, baru).s] }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukPeriksaTukar(k: KeadaanBundel): string {
  if (samaSusunan(k.tukarS, susunanAwalTukar(k))) return "Alat menolak. Susunan belum ditukar. Tukar bundel dulu, lalu tekan Periksa.";
  return "Susunannya belum sama dengan sasaran. Periksa lagi arah penukaran dan banyak bundel tiap kolom.";
}
export function kalimatTukar(k: KeadaanBundel): string {
  if (k.tukarBenar.length > 0 && k.tukarKe === k.tukarBenar.length && samaSusunan(k.tukarS, susunanAwalTukar(k))) return "Betul! Ada susunan berikutnya.";
  return samaSusunan(k.tukarS, susunanAwalTukar(k)) ? "Tukar bundel sampai sama dengan susunan sasaran. Jumlah tiketnya tidak berubah." : "Bandingkan susunanmu dengan susunan sasaran, lalu tekan Periksa.";
}

/* ------------------------------ Susun ------------------------------ */
/** Ketuk satu kolom: kosong, lalu nol sampai sembilan, lalu kembali ke nol. */
export function ketukSusun(k: KeadaanBundel, j: number): KeadaanBundel {
  if (j < 0 || j >= BANYAK_KOLOM) return k;
  const baru = k.susunIsi[j] < 0 ? 0 : (k.susunIsi[j] + 1) % 10;
  return { ...k, susunIsi: k.susunIsi.map((c, i) => (i === j ? baru : c)) };
}
export function periksaSusun(k: KeadaanBundel): { k: KeadaanBundel; ok: boolean } {
  if (k.susunIsi.some((c) => c < 0)) return { k, ok: false };
  if (samaSusunan(k.susunIsi, susunanDari(bilanganSusun(k)))) {
    const baru = k.susunKe + 1;
    return { k: { ...k, susunBenar: k.susunBenar.includes(k.susunKe) ? k.susunBenar : [...k.susunBenar, k.susunKe], susunKe: baru, susunIsi: kosongKolom() }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukSusun(k: KeadaanBundel): string {
  if (k.susunIsi.some((c) => c < 0)) return "Alat menolak. Masih ada kolom yang belum diisi. Kolom yang kosong harus diisi nol.";
  return "Bilangannya belum tepat. Taruh tiap bagian uraian ke kolomnya, dan jaga angka nol.";
}
export function kalimatSusun(k: KeadaanBundel): string {
  if (k.susunBenar.length > 0 && k.susunIsi.every((c) => c < 0) && k.susunKe === k.susunBenar.length) return "Betul! Ada uraian berikutnya.";
  return k.susunIsi.every((c) => c < 0) ? "Ketuk tiap kolom untuk mengisi angkanya. Kolom yang kosong diisi nol." : "Isi semua kolom, lalu tekan Periksa.";
}

/* ------------------------------ Samakan ------------------------------ */
export function ubahSama(k: KeadaanBundel, i: number): KeadaanBundel {
  if (i < 0 || i >= k.samaPilih.length) return k;
  return { ...k, samaPilih: k.samaPilih.map((p, j) => (j === i ? !p : p)) };
}
export function periksaSama(k: KeadaanBundel): { k: KeadaanBundel; ok: boolean } {
  if (k.samaPilih.every((p) => !p)) return { k, ok: false };
  const benar = susunanSama(sasaranSama(k));
  const dipilih = k.samaPilih.map((p, i) => (p ? i : -1)).filter((i) => i >= 0);
  if (dipilih.length === benar.length && dipilih.every((i, j) => i === benar[j])) {
    const baru = k.samaKe + 1;
    return { k: { ...k, samaBenar: k.samaBenar.includes(k.samaKe) ? k.samaBenar : [...k.samaBenar, k.samaKe], samaKe: baru, samaPilih: ke(TARGET_SAMA, baru).opsi.map(() => false) }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukSama(k: KeadaanBundel): string {
  if (k.samaPilih.every((p) => !p)) return "Alat menolak. Belum ada susunan yang dipilih. Pilih dulu, lalu tekan Periksa.";
  return "Pilihannya belum tepat. Jumlahkan tiket pada tiap susunan, lalu bandingkan dengan bilangan di papan.";
}
export function kalimatSama(k: KeadaanBundel): string {
  if (k.samaBenar.length > 0 && k.samaPilih.every((p) => !p) && k.samaKe === k.samaBenar.length) return "Betul! Ada bilangan berikutnya.";
  return k.samaPilih.every((p) => !p) ? "Ketuk semua susunan yang jumlahnya sama dengan bilangan di papan." : "Sudah dipilih. Tekan Periksa bila sudah yakin.";
}
